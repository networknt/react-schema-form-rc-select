// @flow
import React from "react";
import { SchemaForm, utils } from "react-schema-form";
import "ace-builds";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";
import Localizer from "./data/tests/localizer";
import ErrorBoundary from "./ErrorBoundary";
import RcSelect from '../src/RcSelect';
import jsonWorkerUrl from "file-loader!ace-builds/src-noconflict/worker-json";
ace.config.setModuleUrl("ace/mode/json_worker", jsonWorkerUrl);

const examples = {
    localizer: Localizer
};

type State = {
    showErrors: boolean
};

class ExamplePage extends React.Component<void, State> {
    tempModel = {};

    state = {
        tests: [
            { label: "Simple Text", value: 'data/simple.json' },
            { label: "Static Single", value: 'data/static-single.json'},
            { label: "Static Multiple", value: 'data/static-multiple.json'},
            { label: "RC Select", value: 'data/rcselect.json' }
        ],
        validationResult: {},
        schema: {},
        form: [],
        model: {},
        schemaJson: "",
        formJson: "",
        selected: "",
        localization: undefined,
        showErrors: false
    };

    setStateDefault = () => this.setState({ model: this.tempModel });

    onSelectChange = ({ target: { value } }) => {
        if (!value) {
            this.setState({
                schemaJson: "",
                formJson: "",
                selected: "",
                schema: {},
                model: {},
                form: [],
                showErrors: false
            });
        }

        if (!value.endsWith("json")) {
            const elem = examples[value];
            this.setState({
                schemaJson: JSON.stringify(elem.schema, undefined, 2),
                formJson: JSON.stringify(elem.form, undefined, 2),
                selected: value,
                schema: elem.schema,
                model: elem.model || {},
                form: elem.form,
                localization: elem.localization,
                showErrors: false
            });
        } else {
            fetch(value)
                .then(x => x.json())
                .then(({ form, schema, model }) => {
                    this.setState({
                        schemaJson: JSON.stringify(schema, undefined, 2),
                        formJson: JSON.stringify(form, undefined, 2),
                        selected: value,
                        schema,
                        model: model || {},
                        form,
                        showErrors: false
                    });
                });
        }
    };

    onModelChange = (key, val, type) => {
        const { model } = this.state;
        const newModel = model;
        utils.selectOrSet(key, newModel, val, type);
        this.setState({ model: newModel });
    };

    onValidate = () => {
        const { schema, model } = this.state;
        const result = utils.validateBySchema(schema, model);
        this.setState({ validationResult: result, showErrors: true });
    };

    onFormChange = val => {
        try {
            const form = JSON.parse(val);
            this.setState({ formJson: val, form });
        } catch (e) {
            console.error(e);
        }
    };

    onSchemaChange = val => {
        try {
            const schema = JSON.parse(val);
            this.setState({ schemaJson: val, schema });
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        const {
            schema,
            form,
            model,
            validationResult,
            selected,
            tests,
            formJson,
            schemaJson,
            localization,
            showErrors
        } = this.state;
        const mapper = {
            "rc-select": RcSelect
        };

        let schemaForm = "";
        let validate = "";
        if (form.length > 0) {
            schemaForm = (
                <ErrorBoundary>
                    <SchemaForm
                        schema={schema}
                        form={form}
                        onModelChange={this.onModelChange}
                        mapper={mapper}
                        model={model}
                        localization={localization}
                        showErrors={showErrors}
                    />
                </ErrorBoundary>
            );
            validate = (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onValidate}
                    >
                        Validate
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.setStateDefault}
                    >
                        Throw temp model in
                    </Button>
                    <pre>{JSON.stringify(validationResult, undefined, 2)}</pre>
                </div>
            );
        }

        return (
            <div className="col-md-12">
                <h1>Schema Form Example</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <h3 style={{ display: "inline-block" }}>
                            The Generated Form
                        </h3>
                        {schemaForm}
                        <h3>Model</h3>
                        <pre>{JSON.stringify(model, undefined, 2)}</pre>
                        {validate}
                    </div>
                    <div className="col-sm-8">
                        <h3>Select Example</h3>
                        <FormControl
                            classes={{ root: "form-group" }}
                            style={{ minWidth: 150 }}
                        >
                            <InputLabel htmlFor="select-test">
                                select-test
                            </InputLabel>
                            <Select
                                autoWidth
                                name="selectTest"
                                inputProps={{
                                    name: "selectTest",
                                    id: "select-test"
                                }}
                                value={selected}
                                onChange={this.onSelectChange}
                            >
                                {tests.map(({ label, value }) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <h3>Form</h3>
                        <AceEditor
                            mode="json"
                            theme="github"
                            height="300px"
                            width="800px"
                            onChange={this.onFormChange}
                            name="aceForm"
                            value={formJson}
                            editorProps={{ $blockScrolling: true }}
                        />
                        <h3>Schema</h3>
                        <AceEditor
                            mode="json"
                            theme="github"
                            height="300px"
                            width="800px"
                            onChange={this.onSchemaChange}
                            name="aceSchema"
                            value={schemaJson}
                            editorProps={{ $blockScrolling: true }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ExamplePage;
