import {
    LoadingAction,
    SetDataWithResponseAction,
    ViewSetAction,
    ViewSetReducerWithActionsAndApi,
    ViewSetState
} from "./types";
import {BuilderProps} from "../types";
import {generateViewSetActionNames, generateViewSetActions} from "./actions";
import {generateViewSetApi} from "./api";

const initialState = () : ViewSetState => ({

    results: null,
    offset: 0,
    limit: 10,
    ordering: null,
    filters: {},
    error: null,
    loading: false,
});

export const getInitialState = initialState;



const onSetLoading = (state: ViewSetState, action: LoadingAction) : ViewSetState => ({...state, loading: action.loading})
const onSetDataWithResponse = (state: ViewSetState, action: SetDataWithResponseAction) : ViewSetState => {
    const {response} = action;
    return {...state, ...response};
};
const generateViewSetReducer = (props: BuilderProps) => (state: ViewSetState, action: ViewSetAction) => {

    const actions = generateViewSetActionNames(props.storeName);

    switch(action.type){

        case actions.setLoading:
            return onSetLoading(state, action as LoadingAction);

        case actions.setDataWithResponse:
            return onSetDataWithResponse(state, action as SetDataWithResponseAction);
        default:
            return state || initialState();
    }
};


export const generateViewSetReducerWithActionsAndApi = (props: BuilderProps) : ViewSetReducerWithActionsAndApi => {

    const actions = generateViewSetActions(props);
    const reducer = generateViewSetReducer(props);
    const api = generateViewSetApi(props);

    return {
        actions,
        reducer,
        api,
    }
};
