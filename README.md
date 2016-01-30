# react-schema-form-rc-select
An add-on of react-schema-form that support multiple select and a demo for extending react-schema-form with new components.

# Features
1. Single select or multiple select
2. Static dropdown values defined in schema or form
3. Dynamic dropdown values load from server by get or post request
4. Tagging which means you can add new entries even they are not in the dropdown.
5. Dynamic dropdown values enriched on the server when schema/form is loaded.(This only works with [light framework](https://github.com/networknt/light.git)

# [Live demo](http://networknt.github.io/react-schema-form-rc-select/)

# To run the example locally
Clone the project and run

```
git clone https://github.com/networknt/react-schema-form-rc-select.git
cd react-schema-form-rc-select
npm install
npm start
```
Then open localhost:8001 in a browser.

# Installation

```
npm install react-schema-form-rc-select
```
This module is an extension of [react-schema-form](https://github.com/networknt/react-schema-form.git) and it must be called from react-schema-form to handle rc-select form type.
It shows how to customize react-schema-form to add a new field and map a new form type to it. Please see ExamplePage.js for the details.

```js
require('rc-select/assets/index.css');
import RcSelect from 'react-schema-form-rc-select/lib/RcSelect';

...

        var schemaForm = '';
        if (this.state.form.length > 0) {
            schemaForm = (
                <SchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model} onModelChange={this.onModelChange} mapper={{"rc-select": RcSelect}} />
            );
        }


```

# Contributing

See our [CONTRIBUTING.md](https://github.com/networknt/react-schema-form/CONTRIBUTING.md) for information on how to contribute.


# License

MIT Licensed. Copyright (c) Network New Technologies Inc. 2016.
