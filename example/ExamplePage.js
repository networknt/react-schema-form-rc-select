/**
 * Created by steve on 12/09/15.
 */
'use strict';

var React = require('react');
require('rc-select/assets/index.css');
var RcSelect = require('../src/RcSelect');

var ExamplePage = React.createClass({
    displayName: 'ExamplePage',

    getInitialState: function() {
        return {
            model: {},
            form :   {
                "key": [
                    "accessLevel"
                ],
                "type": "rc-select",
                "multiple": true,
                "title": "Access Level",
                "required": true,
                "schema": {
                    "title": "Access Level",
                    "type": "array",
                    "items": [
                        {
                            "value": "A",
                            "label": "Authorized to anyone"
                        },
                        {
                            "value": "N",
                            "label": "Not Accessible"
                        },
                        {
                            "value": "C",
                            "label": "Client Based"
                        },
                        {
                            "value": "R",
                            "label": "Role Based"
                        },
                        {
                            "value": "U",
                            "label": "User Based"
                        },
                        {
                            "value": "CR",
                            "label": "Client and Role Based"
                        },
                        {
                            "value": "CU",
                            "label": "Client and User Based"
                        },
                        {
                            "value": "RU",
                            "label": "Role and User Based"
                        },
                        {
                            "value": "CRU",
                            "label": "Client, Role and User Based"
                        }
                    ]
                },
                "ngModelOptions": {},
                "items": [
                    {
                        "value": "A",
                        "label": "Authorized to anyone"
                    },
                    {
                        "value": "N",
                        "label": "Not Accessible"
                    },
                    {
                        "value": "C",
                        "label": "Client Based"
                    },
                    {
                        "value": "R",
                        "label": "Role Based"
                    },
                    {
                        "value": "U",
                        "label": "User Based"
                    },
                    {
                        "value": "CR",
                        "label": "Client and Role Based"
                    },
                    {
                        "value": "CU",
                        "label": "Client and User Based"
                    },
                    {
                        "value": "RU",
                        "label": "Role and User Based"
                    },
                    {
                        "value": "CRU",
                        "label": "Client, Role and User Based"
                    }
                ]
            }
        };
    },

    onChange: function () {

    },

    render: function render() {
        return (
            <RcSelect model={this.state.model} form={this.state.form} onChange={this.onChange} />
        );
    }
});

module.exports = ExamplePage;
