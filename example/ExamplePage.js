/**
 * Created by steve on 12/09/15.
 */
'use strict';

var React = require('react');
import utils from 'react-schema-form/lib/utils';
import SchemaForm from 'react-schema-form/lib/SchemaForm';
require('react-select/less/select.less');
var Select = require('react-select');
var Ace = require('react-ace');
require('brace/mode/json');
require('brace/theme/github');
require('rc-select/assets/index.css');
import RcSelect from '../src/RcSelect';
import RaisedButton from 'material-ui/lib/raised-button';
import $ from 'jquery';

const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');

var ExamplePage = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        };
    },

    getInitialState: function() {
        return {
            tests: [
                { label: "RC Select", value: 'data/rcselect.json' }            ],
            validationResult: {},
            schema: {},
            form: [],
            model: {},
            schemaJson: '',
            formJson: '',
            selected: '',
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },

    onSelectChange: function(val) {
        $.ajax({
            type: 'GET',
            url: val
        }).done(function(data) {
            this.setState({
                schemaJson: JSON.stringify(data.schema, undefined, 2),
                formJson: JSON.stringify(data.form, undefined, 2),
                selected : val,
                schema: data.schema,
                model: {},
                form: data.form
            })
        }.bind(this));
    },

    onModelChange: function(key, val) {
        console.log('ExamplePage.onModelChange:', key, val);
        var newModel = this.state.model;
        utils.selectOrSet(key, newModel, val);
        this.setState({ model: newModel });
    },

    onValidate: function() {
        console.log('ExamplePage.onValidate is called');
        let result = utils.validateBySchema(this.state.schema, this.state.model);
        this.setState({ validationResult: result });
    },

    onFormChange: function(val) {
        //console.log("onFormChange:" + val);
        try {
            let f = JSON.parse(val);
            this.setState({formJson: val, form: f});
        } catch (e) {
            this.setState({formJson: val})
        }
    },

    onSchemaChange: function(val) {
        //console.log("onSchemaChange:" + val);
        try {
            let s = JSON.parse(val);
            this.setState({schemaJson: val, schema: s});
        } catch (e) {
            this.setState({schemaJson: val})
        }
    },

    render: function() {
        var mapper = {
            "rc-select": RcSelect
        };

        var schemaForm = '';
        var validate = '';
        if (this.state.form.length > 0) {
            schemaForm = (
                <SchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model} onModelChange={this.onModelChange} mapper={mapper} />
            );
            validate = (
                <div>
                    <RaisedButton primary={true} label="Validate" onTouchTap={this.onValidate} />
                    <pre>{JSON.stringify(this.state.validationResult,undefined,2,2)}</pre>
                </div>
            );
        }

        return (
            <div className="col-md-12">
                <h1>Schema Form Example</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <h3 style={{display:'inline-block'}}>The Generated Form</h3>
                        {schemaForm}
                        <h3>Model</h3>
                        <pre>{JSON.stringify(this.state.model,undefined,2,2)}</pre>
                        {validate}
                    </div>
                    <div className="col-sm-8">
                        <h3>Select Example</h3>
                        <div className="form-group">
                            <Select
                                name="selectTest"
                                value={this.state.selected}
                                options={this.state.tests}
                                onChange={this.onSelectChange}>
                            </Select>
                        </div>
                        <h3>Form</h3>
                        <Ace mode="json" theme="github" height="300px" width="800px" onChange={this.onFormChange} name="aceForm" value={this.state.formJson} editorProps={{$blockScrolling: true}}/>
                        <h3>Schema</h3>
                        <Ace mode="json" theme="github" height="300px" width="800px" onChange={this.onSchemaChange} name="aceSchema" value={this.state.schemaJson} editorProps={{$blockScrolling: true}}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ExamplePage;
