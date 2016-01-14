/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from 'react-schema-form/lib/ComposedComponent';
import Select, {Option} from 'rc-select';

class RcSelect extends React.Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onDeselect = this.onDeselect.bind(this);
        this.state = {
            currentValue: []
        };
    }

    onSelect(value, option) {
        console.log('RcSelect onSelect is called', value, option);
        let v = this.state.currentValue;
        v.push(value)
        this.setState({
            currentValue: v
        });
        this.props.onChangeValidate(v);
    }

    onDeselect(value, option) {
        console.log('RcSelect onDeselect is called', value, option);
        let v = this.state.currentValue;
        let index = v.indexOf(value);
        if(index > -1) {
            v.splice(index, 1);
        }
        this.setState({
            currentValue: v
        });
        this.props.onChangeValidate(v);
    }

    render() {
        const options = this.props.form.items.map((item, idx) => (
            <Option key={idx} value={item.value}>{item.label}</Option>
        ));
        console.log('render', this.props.form);
        return (
            <Select
                className={this.props.form.className}
                dropdownClassName={this.props.form.dropdownClassName}
                dropdownStyle={this.props.form.dropdownStyle}
                dropdownMenuStyle={this.props.form.dropdownMenuStyle}
                allowClear={this.props.form.allowClear}
                tags={this.props.form.tags}
                maxTagTextLength={this.props.form.maxTagTextLength}
                multiple={this.props.form.multiple}
                combobox={this.props.form.combobox}
                disabled={this.props.form.disabled}
                value={this.state.currentValue}
                onSelect={this.onSelect}
                onDeselect={this.onDeselect}
                style={this.props.form.style || {width: "100%"}}>
                {options}
            </Select>
        );
    }
}

export default ComposedComponent(RcSelect);
