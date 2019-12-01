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
    value: any,
    error: any,
    onChangeValidate: any
};

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
            currentValue: value || emptyValue,
            items
        };
    }

    componentDidMount() {
        // load items if needed.
        const {
            form: {
                action
            }
        } = this.props;
        const { get, post } = action || {};
        if (action) {
            if (get) {
                fetch(get.url)
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
            } else if (post) {
                fetch(post.url, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(post.parameter)
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res;
                    })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
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
                <Option key={item.value} value={item.value}>
                    {item.label}
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
