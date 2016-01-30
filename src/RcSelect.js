/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from 'react-schema-form/lib/ComposedComponent';
import Select, {Option} from 'rc-select';
import $ from 'jquery';

class RcSelect extends React.Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onDeselect = this.onDeselect.bind(this);
        this.state = {
            currentValue: this.props.value,
            items: this.props.form.items
        };
    }

    componentWillMount() {
        // load items if needed.
        if(this.props.form.action) {
            if(this.props.form.action.get) {
                $.ajax({
                    type: 'GET',
                    url: this.props.form.action.get.url
                }).done(function(data) {
                    this.setState({items: data});
                }.bind(this)).fail(function(error) {
                    console.error('error', error);
                });
            } else if(this.props.form.action.post) {
                $.ajax({
                    type: 'POST',
                    url: this.props.form.action.post.url,
                    data: JSON.stringify(this.props.form.action.post.parameter),
                    contentType: 'application/json',
                    dataType: 'json'
                }).done(function(data) {
                    this.setState({items: data});
                }.bind(this)).fail(function(error) {
                    console.error('error', error);
                });
            }
        }
    }

    onSelect(value, option) {
        //console.log('RcSelect onSelect is called', value, option);
        if(this.props.form.schema.type === 'array') {
            // multiple select type array
            let v = this.state.currentValue;
            v.push(value);
            this.setState({
                currentValue: v
            });
            this.props.onChangeValidate(v);
        } else {
            // single select type string fake an event here.
            this.setState({currentValue: value});
            this.props.onChangeValidate({target: {value: value}});
        }
    }

    onDeselect(value, option) {
        //console.log('RcSelect onDeselect is called', value, option);
        if (this.props.form.schema.type === 'array') {
            let v = this.state.currentValue;
            let index = v.indexOf(value);
            if (index > -1) {
                v.splice(index, 1);
            }
            this.setState({
                currentValue: v
            });
            this.props.onChangeValidate(v);
        }
    }

    render() {
        //console.log("render", this.props, this.state);
        let options = [];
        if(this.state.items && this.state.items.length > 0) {
            options = this.state.items.map((item, idx) => (
                <Option key={idx} value={item.value}>{item.label}</Option>
            ));
        }
        let error = '';
        if(this.props.error) {
            error = <div style={{color: 'red'}}>{this.props.error}</div>
        }
        return (
            <div>
                <div>{this.props.form.title}</div>
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
                {error}
            </div>
        );
    }
}

export default ComposedComponent(RcSelect);
