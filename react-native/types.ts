import {ViewSetAction, ViewSetActions, ViewSetApi, ViewSetState} from "./viewset/types";
import {FormAction, FormActions, FormApi, FormState} from "./form/types";


export interface ReactNativeAPI {
    list: ViewSetApi,
    form: FormApi,
}

export interface ReactNativeActions {
    list: ViewSetActions,
    form: FormActions,
}

export interface ReactNativeState {
    list: ViewSetState,
    form: FormState
}

export interface RNReducersActionsAndAPI {

    api: ReactNativeAPI,
    actions: ReactNativeActions,
    reducers: (state : ReactNativeState, action: ViewSetAction | FormAction)=>ReactNativeState,
}


export interface BuilderProps {

    storeName: string,
    url: string,
}
