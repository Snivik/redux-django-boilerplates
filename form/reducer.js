import {
    formActionGenerator_clearForm,
    formActionGenerator_setErrors,
    formActionGenerator_setFormData,
    formActionGenerator_setLoading,
    formActionGenerator_updateField,
    formActionGenerator_updateMultipleFields
} from "../constant-generators/create";


const buildDefaultState = (name, options) => ({

    error: null,
    validation: null,
    changed: false,
    loading: false,
    data: options.buildDefaultData(name, options)

});

const buildDefaultData = (name, options) => ({});


export const buildFormReducer = (storeName, options={}) =>{

    const o = {
      buildDefaultState,
      buildDefaultData,
      ...options
    };

    const defaultState = o.buildDefaultState(storeName, o);

    return (state=defaultState, action) => {


        switch(action.type){
            case formActionGenerator_updateMultipleFields(storeName):
                return {...state, changed: true, data: {...state.data, ...action.updates}};

            case formActionGenerator_updateField(storeName):
                const {name, value} = action;
                return {...state, changed: true, data: {...state.data, [name]: value}};

            case formActionGenerator_setLoading(storeName):
                return {
                    ...state,
                    loading: action.loading
                };


            case formActionGenerator_setFormData(storeName):
                return {...state, data: action.data};

            case formActionGenerator_setErrors(storeName):
                return {...state,
                    validation: action.validation === undefined ? state.validation : action.validation,
                    error: action.error === undefined ? state.error : action.error
                };

            case formActionGenerator_clearForm(storeName):
                return {...defaultState};

            default:
                return state;

        }



    };

};