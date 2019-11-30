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
        let emptyValue = this.props.form.schema.type === 'array'? [] : null;
        this.state = {
            currentValue: this.props.value || emptyValue,
            items: this.props.form.items
        };
    }

    componentDidMount() {
        // load items if needed.
        if(this.props.form.action) {
            if(this.props.form.action.get) {
                fetch(this.props.form.action.get.url)
                    .then(res => {
                        if(!res.ok) throw Error(res.statusText);
                    })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        this.setState({items: res});
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else if(this.props.form.action.post) {
                fetch(this.props.form.action.post.url, {
                    method: "POST",
                    headers: {
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(this.props.form.action.post.parameter)
                })
                .then(res => {
                    if(!res.ok) throw Error(res.statusText);
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    this.setState({items: res});
                })
                .catch(error => {
                    console.error(error);
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
        console.log("render", this.props, this.state);
        let options = [];
        if(this.state.items && this.state.items.length > 0) {
            options = this.state.items.map((item, idx) => (
                <Option key={idx} value={item.value}>{item.label}</Option>
            ));
        } else if(this.props.form.titleMap) {
            console.log("titleMap", this.props.form.titleMap);
            for(let i = 0; i < this.props.form.titleMap.length; i++) {
                options.push(
                    <Option key={this.props.form.titleMap[i].value}>
                        {this.props.form.titleMap[i].name}
                    </Option>
                )
            }
            /*
            options = this.props.form.titleMap.map((item, idx) => (
                <Option key={idx} value={item.value}>{item.name}</Option>
            ));
            */
        }
        let error = '';
        if(this.props.error) {
            error = <div style={{color: 'red'}}>{this.props.error}</div>
        }
        console.log("option1", options[0]);
        /*
        return (
            <div style={this.props.form.style || {width: '100%'}}>
                <div>{this.props.form.title}</div>
                <Select>
                    <Option value="jack">jack</Option>
                </Select>
            </div>

        );
        */
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
                    >
                    {options}
                </Select>
                {error}
            </div>
        );
    }
}

export default ComposedComponent(RcSelect);
