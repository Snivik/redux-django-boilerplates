import {generateFormActionNames, generateFormActions} from './actions';
import {
    FormAction,
    FormReducerWithActionsAndApi,
    FormState,
    LoadingAction,
    SetDataAction,
    SetErrorsAction, UpdateAction
} from "./types";
import {BuilderProps} from "../types";


const initialState : ()=> FormState = () => ({

    data: null, // Initial data
    updatedData: {}, // Updates
    validation: {}, // Validation
    error: null,
    loading: false,
});

export const getInitialState = initialState;



const onSetData = (state: FormState, action: SetDataAction) : FormState =>  ({...state, data: {...action.data}});
const onSetErrors = (state: FormState, action: SetErrorsAction) : FormState => {
    const stateWithErrors = {...state};

    if (action.error) stateWithErrors.error = action.error;
    if (action.validation) stateWithErrors.validation = action.validation;

    return stateWithErrors;
};
const onUpdateField = (state: FormState, action: UpdateAction) : FormState =>  ({...state, updatedData: {...state.updatedData, [action.name]: action.value}});
const onSetLoading = (state: FormState, action: LoadingAction) : FormState =>  ({...state, loading: action.loading});

const generateFormReducer = (props: BuilderProps) : (state: FormState, action: FormAction) => FormState => (state, action) : FormState =>  {

    // console.log(action);

    const actions = generateFormActionNames(props.storeName);

    switch(action.type){

        case actions.setData:
            return onSetData(state, action as SetDataAction);

        case actions.setErrors:
            return onSetErrors(state, action as SetErrorsAction);

        case actions.updateField:
            return onUpdateField(state, action as UpdateAction);

        case actions.setLoading:
            return onSetLoading(state, action as LoadingAction);

        case actions.clearErrors:
            return {...state, error: null, validation: {} };

        case actions.reset:
            return initialState();


        default:

            return state || initialState();
    }

};


export const generateFormReducerWithActionsAndApi = (props: BuilderProps) : FormReducerWithActionsAndApi => {

    const actions = generateFormActions(props);
    const reducer = generateFormReducer(props);


    return {
        actions,
        reducer
    }
};
