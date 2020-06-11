import {BuilderProps} from "../types";
import {ViewSetActions} from "./types";

const setLoadingActionName = (storeName) => `${storeName}/viewSet/setLoading`;
const setDataWithResponseActionName = (storeName) => `${storeName}/viewSet/setDataWithResponse`;



export const setLoading = storeName => (loading) => ({
    type: setLoadingActionName(storeName),
    loading
});

export const setDataWithResponse = storeName => (response) => ({
    type: setDataWithResponseActionName(storeName),
    response
});





/**
 * Generates action names for the form to be used with reducer
 * @param storeName
 * @returns {{setLoading: string, setData: string, clearErrors: string, reset: string, setErrors: string, updateField: string}}
 */
export const generateViewSetActionNames = (storeName) => ({
    setLoading: setLoadingActionName(storeName),
    setDataWithResponse: setDataWithResponseActionName(storeName),

});

export const generateViewSetActions = (props: BuilderProps) : ViewSetActions => {
    const {storeName} = props;

    return {
        setLoading: setLoading(storeName),
        setDataWithResponse: setDataWithResponse(storeName),
    }

};
