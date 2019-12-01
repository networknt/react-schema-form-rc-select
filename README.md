# react-schema-form-rc-select

[![Join the chat at https://gitter.im/networknt/react-schema-form](https://badges.gitter.im/networknt/react-schema-form.svg)](https://gitter.im/networknt/react-schema-form?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![CircleCI](https://circleci.com/gh/networknt/react-schema-form-rc-select.svg?style=svg)](https://circleci.com/gh/networknt/react-schema-form-rc-select)
[![npm package](https://img.shields.io/npm/v/react-schema-form-rc-select.svg?style=flat-square)](https://www.npmjs.org/package/react-schema-form-rc-select)

The RcSelect is an add-on of react-schema-form, and it supports both single and multiple select with async retrieval data from the Internet APIs. It is a demo for extending react-schema-form with new components externally.

It is a react-schema-form field component that wraps around [rc-select](https://www.npmjs.com/package/rc-select)

### Features
1. Single select or multiple select with an option to add new items
2. Static dropdown values defined in schema or form
3. Dynamic dropdown values in JSON format load from the same server or Internet by `get` or `post` request
4. Dynamic dropdown values enriched on the API server when schema/form is loaded. 

### [Live demo](http://networknt.github.io/react-schema-form-rc-select/)

### To run the example locally

Clone the project and run

```
git clone https://github.com/networknt/react-schema-form-rc-select.git
cd react-schema-form-rc-select/example
npm install
npm start
```

A browser tab will be automatically opened with http://localhost:3000.

### Installation

```
npm install react-schema-form-rc-select
```

This module is an extension of [react-schema-form](https://github.com/networknt/react-schema-form.git), and it must be called from react-schema-form to handle rc-select form type. It shows how to customize the react-schema-form to add a new field and map a new form type to it. Please see App.js in the example folder for the details.

```js
import { RcSelect } from "react-schema-form-rc-select";
...

        var schemaForm = '';
        if (this.state.form.length > 0) {
            schemaForm = (
                <SchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model} onModelChange={this.onModelChange} mapper={{"rc-select": RcSelect}} />
            );
        }


```

### Contributing

See our [CONTRIBUTING.md](https://github.com/networknt/react-schema-form/CONTRIBUTING.md) for information on how to contribute.


### License

MIT Licensed. Copyright (c) Network New Technologies Inc. 2016-2019.
