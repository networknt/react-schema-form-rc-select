import React from "react";
import { SchemaForm, utils } from "react-schema-form";
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { githubLight } from '@uiw/codemirror-theme-github';

import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import ErrorBoundary from "./ErrorBoundary";
import RcSelect from "react-schema-form-rc-select";

const examples = {
};


class ExamplePage extends React.Component {
    tempModel = {};

    state = {
        tests: [
            { label: "Simple Text", value: 'data/simple.json' },
            { label: "Static Single", value: 'data/static-single.json'},
            { label: "Static Multiple", value: 'data/static-multiple.json'},
            { label: "Relative Ref", value: 'data/relative-ref.json'},
            { label: "Dynamic Single", value: 'data/dynamic-single.json'},
            { label: "Dynamic Multiple", value: 'data/dynamic-multiple.json'},
            { label: "Conditional Query", value: 'data/conditional-query.json'},
            { label: "Tag Model", value: 'data/tag-model.json'},
            { label: "Tag Portal", value: 'data/portal-tag.json'},
            { label: "RC Select", value: 'data/rcselect.json' },
            { label: "Combobox Select", value: 'data/combobox-select.json' },
            { label: "Properties Ref", value: 'data/properties-ref.json' }
        ],
        validationResult: {},
        schema: {},
        form: [],
        model: {},
        schemaJson: "",
        formJson: "",
        selected: "",
        showErrors: false,
        isLoading: false
    };

    componentDidUpdate(prevProps, prevState) {
        // Prevent unnecessary re-renders
        if (prevState.model === this.state.model && 
            prevState.form === this.state.form && 
            prevState.schema === this.state.schema) {
            return;
        }
    }

    setStateDefault = () => this.setState({ model: this.tempModel });

    onSelectChange = async ({ target: { value } }) => {
        // Set loading state
        this.setState({ isLoading: true });

        try {
            if (!value) {
                this.setState({
                    schemaJson: "",
                    formJson: "",
                    selected: "",
                    schema: {},
                    model: {},
                    form: [],
                    showErrors: false,
                    isLoading: false
                });
                return;
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
                    showErrors: false,
                    isLoading: false
                });
            } else {
                const response = await fetch(value);
                const { form, schema, model } = await response.json();
                
                // Update state only if component is still mounted
                if (this._isMounted) {
                    this.setState({
                        schemaJson: JSON.stringify(schema, undefined, 2),
                        formJson: JSON.stringify(form, undefined, 2),
                        selected: value,
                        schema,
                        model: model || {},
                        form,
                        showErrors: false,
                        isLoading: false
                    });
                }
            }
        } catch (error) {
            console.error('Error loading form data:', error);
            this.setState({ 
                isLoading: false,
                error: 'Failed to load form data'
            });
        }
    };

    onModelChange = (key, val, type) => {
        requestAnimationFrame(() => {
            this.setState(prevState => {
                const newModel = JSON.parse(JSON.stringify(prevState.model));
                utils.selectOrSet(key, newModel, val, type);
                return { model: newModel };
            });
        });
    };

    onValidate = () => {
        const { schema, model } = this.state;
        const result = utils.validateBySchema(schema, model);
        this.setState({ validationResult: result, showErrors: true });
    };

    onFormChange = val => {
        try {
            const form = JSON.parse(val);
            requestAnimationFrame(() => {
                this.setState({ formJson: val, form });
            });
        } catch (e) {
            console.debug('Invalid JSON - still typing...');
        }
    };

    onSchemaChange = val => {
        try {
            const schema = JSON.parse(val);
            requestAnimationFrame(() => {
                this.setState({ schemaJson: val, schema });
            });
        } catch (e) {
            console.debug('Invalid JSON - still typing...');
        }
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

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
            showErrors,
            isLoading
        } = this.state;

        if (isLoading) {
            return <div>Loading...</div>;
        }
        const mapper = {
            "rc-select": RcSelect
        };
        return (
            <div className="col-md-12">
                <h1>Schema Form Example</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <h3 style={{ display: "inline-block" }}>
                            The Generated Form
                        </h3>
                        {form.length > 0 && (  
                        <ErrorBoundary>
                            <SchemaForm
                                schema={schema}
                                form={form}
                                onModelChange={this.onModelChange}
                                mapper={mapper}
                                model={model}
                                showErrors={showErrors}
                            />
                        </ErrorBoundary>
                        )}
                        <h3>Model</h3>
                        <pre>{JSON.stringify(model, undefined, 2)}</pre>
                        {form.length > 0 && (
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
                        )}
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
                        <CodeMirror 
                            value={formJson} 
                            height="300px" 
                            width="800px" 
                            theme={githubLight} 
                            extensions={[json()]} 
                            onChange={this.onFormChange}
                        />
                        <h3>Schema</h3>
                        <CodeMirror 
                            value={schemaJson} 
                            height="300px" 
                            width="800px" 
                            theme={githubLight} 
                            extensions={[json()]} 
                            onChange={this.onSchemaChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ExamplePage;
