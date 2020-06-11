import {BuilderProps} from "../types";
import {FormActions} from "./types";

const updateFieldActionName = (storeName) => `${storeName}/form/updateField`;
const setLoadingActionName = (storeName) => `${storeName}/form/setLoading`;
const resetActionName = (storeName) => `${storeName}/form/reset`;
const setDataActionName = (storeName) => `${storeName}/form/setData`;
const setErrorsActionName = (storeName) => `${storeName}/form/setErrors`;
const clearErrorsActionName = (storeName) => `${storeName}/form/clearErrorsActionName`;
const clearFormActionName = (storeName) => `${storeName}/form/clearForm`;

export const updateField = storeName => (name, value) => ({
    type: updateFieldActionName(storeName),
    name,
    value
});


const setLoading = storeName => (loading) => ({
    type: setLoadingActionName(storeName),
    loading
});

const reset = storeName => () => ({
    type: resetActionName(storeName),
});

const setData = storeName => (data) => ({
    type: setDataActionName(storeName),
    data
});

const setErrors = storeName => ({error, validation}) => ({
    type: setErrorsActionName(storeName),
    error,
    validation,

});

const clearErrors = storeName => () => ({
    type: clearErrorsActionName(storeName)
});

const clearForm = storeName => () => ({
    type: clearFormActionName(storeName)
});

/**
 * Generates action names for the form to be used with reducer
 * @param storeName
 * @returns {{setLoading: string, setData: string, clearErrors: string, reset: string, setErrors: string, updateField: string}}
 */
export const generateFormActionNames = (storeName) => ({
    updateField: updateFieldActionName(storeName),
    setLoading: setLoadingActionName(storeName),
    reset: resetActionName(storeName),
    setData: setDataActionName(storeName),
    setErrors: setErrorsActionName(storeName),
    clearErrors: clearErrorsActionName(storeName),
    clearForm: clearFormActionName(storeName)
});

/**
 * Generates actual actions for the form
 * @param props
 */
export const generateFormActions = (props: BuilderProps) : FormActions => {
    const {storeName} = props;

    return {
        updateField: updateField(storeName),
        setLoading: setLoading(storeName),
        reset: reset(storeName),
        setData: setData(storeName),
        setErrors: setErrors(storeName),
        clearErrors: clearErrors(storeName),
        clearForm: clearForm(storeName)
    }

};
