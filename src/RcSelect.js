// @flow
/**
 * Created by steve on 15/09/15.
 */
import React from "react";
import { ComposedComponent } from "react-schema-form";
import Select, { Option } from "rc-select";
import "rc-select/assets/index.css";

type Props = {
    form: any,
    model: any,
    value: any,
    error: any,
    onChangeValidate: any
};

var replacer = function(tpl, data) {
  var re = /\$\(([^\)]+)?\)/g, match;
  while(match = re.exec(tpl)) {
    tpl = tpl.replace(match[0], data[match[1]])
    re.lastIndex = 0;
  }
  return tpl;
}

class RcSelect extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onDeselect = this.onDeselect.bind(this);
        const {
            value,
            form: {
                schema: { type },
                items
            }
        } = this.props;
        const emptyValue = type === "array" ? [] : null;
        this.state = {
            url: '',
            currentValue: value || emptyValue,
            items
        };
    }
    
    componentDidUpdate(prevProps) {
        const {
            form: { 
                action,
                schema: { type } 
            },
            model
        } = this.props;
        const emptyValue = type === "array" ? [] : null;
        if(action) {
            const { url } = action;
            let newUrl = replacer(url, model);
            if(newUrl != this.state.url && !newUrl.includes('$(')) {
                // url is changed and resolved
                this.setState({url: newUrl, currentValue: emptyValue});
                fetch(newUrl)
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res;
                    })
                    .then(res => res.json())
                    .then(res => {
                        this.setState({ items: res });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    }


    componentDidMount() {
        // load items if needed.
        const {
            form: { action },
            model
        } = this.props;
        
        if (action) {
            const { url } = action;
            let newUrl = replacer(url, model);
            this.setState({url: newUrl});
            // only fetch from the server if all variables are resolved.
            if(!newUrl.includes('$(')) {
                fetch(newUrl)
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res;
                    })
                    .then(res => res.json())
                    .then(res => {
                        this.setState({ items: res });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    }

    onSelect(value) {
        const {
            onChangeValidate,
            form: {
                schema: { type }
            }
        } = this.props;
        if (type === "array") {
            // multiple select type array
            this.setState(
                prevState => ({
                    currentValue: prevState.currentValue.concat(value)
                }),
                () => {
                    const { currentValue } = this.state;
                    onChangeValidate(currentValue);
                }
            );
        } else {
            // single select type string fake an event here.
            this.setState({ currentValue: value });
            onChangeValidate({ target: { value } });
        }
    }

    onDeselect(value) {
        const {
            onChangeValidate,
            form: {
                schema: { type }
            }
        } = this.props;
        if (type === "array") {
            this.setState(
                prevState => ({
                    currentValue: prevState.currentValue.filter(
                        e => e !== value
                    )
                }),
                () => {
                    const { currentValue } = this.state;
                    onChangeValidate(currentValue);
                }
            );
        }
    }

    render() {
        const {
            error,
            form: {
                title,
                className,
                dropdownClassName,
                dropdownStyle,
                dropdownMenuStyle,
                allowClear,
                tags,
                maxTagTextLength,
                multiple,
                combobox,
                disabled,
                style,
                titleMap
            }
        } = this.props;
        const { currentValue } = this.state;
        const { items } = this.state;
        let options = [];
        if (items && items.length > 0) {
            options = items.map(item => (
                <Option key={Object.keys(item)[0]} value={Object.keys(item)[0]}>
                    {item[Object.keys(item)[0]]}
                </Option>
            ));
        } else if (titleMap) {
            options = titleMap.map(item => (
                <Option key={item.value} value={item.value}>
                    {item.name}
                </Option>
            ));
        }
        let err = "";
        if (error) {
            err = <div style={{ color: "red" }}>{error}</div>;
        }
        return (
            <div>
                <div>{title}</div>
                <Select
                    className={className}
                    dropdownClassName={dropdownClassName}
                    dropdownStyle={dropdownStyle}
                    dropdownMenuStyle={dropdownMenuStyle}
                    allowClear={allowClear}
                    tags={tags}
                    maxTagTextLength={maxTagTextLength}
                    multiple={multiple}
                    combobox={combobox}
                    disabled={disabled}
                    value={currentValue}
                    onSelect={this.onSelect}
                    onDeselect={this.onDeselect}
                    style={style || { width: "100%" }}
                >
                    {options}
                </Select>
                {err}
            </div>
        );
    }
}

export default ComposedComponent(RcSelect);
