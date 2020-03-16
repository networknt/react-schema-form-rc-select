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

function replacer(tpl, data) {
    const re = /\$\(([^)]+)?\)/g;
    let result = tpl;
    let match = re.exec(result);
    while (match) {
        result = result.replace(match[0], data[match[1]]);
        re.lastIndex = 0;
        match = re.exec(result);
    }
    return result;
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
            url: "",
            currentValue: value || emptyValue,
            items
        };
    }

    componentDidMount() {
        // load items if needed.
        const {
            form: { action },
            model
        } = this.props;
        if (action) {
            const { url } = action;
            const newUrl = replacer(url, model);
            // only fetch from the server if all variables are resolved.
            if (!newUrl.includes("$(")) {
                const { currentValue } = this.state;
                this.fetchFromUrl(newUrl, currentValue);
            }
        }
    }

    componentDidUpdate() {
        const {
            form: {
                action,
                schema: { type }
            },
            model
        } = this.props;
        const emptyValue = type === "array" ? [] : null;
        if (action) {
            const newUrl = replacer(action.url, model);
            const { url } = this.state;
            if (newUrl !== url && !newUrl.includes("$(")) {
                // url is changed and resolved
                this.fetchFromUrl(newUrl, emptyValue);
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

    fetchFromUrl(newUrl, empty) {
        fetch(newUrl)
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res;
            })
            .then(res => res.json())
            .then(res => {
                this.setState({ url: newUrl, currentValue: empty, items: res });
            })
            .catch(error => {
                console.error(error);
            });
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
