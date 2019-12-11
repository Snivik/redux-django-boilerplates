import {
    formActionGenerator_clearForm,
    formActionGenerator_setErrors,
    formActionGenerator_setFormData,
    formActionGenerator_setLoading,
    formActionGenerator_updateField, formActionGenerator_updateMultipleFields
} from "../constant-generators/create";


const buildUpdateField = (storeName, options) => ({name, value}) => {
    return {
        type: formActionGenerator_updateField(storeName),
        name,
        value
    }
};

const buildUpdateMultipleFields = (name, options) => (updates) => {
    return {
        type: formActionGenerator_updateMultipleFields(name),
        updates
    }
};

const buildSetFormData= (name, options) => (data) => {
    return {
        type: formActionGenerator_setFormData(name),
        data
    }
};

const buildSetLoading= (name, options) => (loading) => {
    return {
        type: formActionGenerator_setLoading(name),
        loading
    }
};

const buildSetErrors= (name, options) => ({validation, error}) => {
    return {
        type: formActionGenerator_setErrors(name),
        validation,
        error
    }
};

const buildClearForm= (name, options) => () => {
    return {
        type: formActionGenerator_clearForm(name),
    }
};






export const buildFormActions = (name, options={}) => {


    const o = {
        buildUpdateField,
        buildUpdateMultipleFields,
        buildSetFormData,
        buildSetLoading,
        buildSetErrors,
        buildClearForm,
        ...options
    };

    return {
        updateField: o.buildUpdateField(name, o),
        updateMultipleFields: o.buildUpdateMultipleFields(name, o),
        setFormData: o.buildSetFormData(name, o),
        setLoading: o.buildSetLoading(name, o),
        setErrors: o.buildSetErrors(name, o),
        clear: o.buildClearForm(name, o),
    }

};