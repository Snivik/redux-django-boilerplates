import {ReduxAction} from "../common/types";

export interface ViewSetState {
    results: Array<Object>,
    offset: number,
    limit: number,
    ordering: String,

    filters: Object,
    error: Object,
    loading: boolean,
}

export interface ViewSetResults {
    results: Array<Object>,
    previous: Object,
    next: Object,
}

/* Store Actions */
export interface ViewSetAction extends ReduxAction {

}

export interface LoadingAction extends ViewSetAction{
    loading: boolean


}

export interface SetDataWithResponseAction extends ViewSetAction {
    response: ViewSetResults
}


export interface ViewSetActions  {
    setLoading: (boolean) => LoadingAction,
    setDataWithResponse: (viewSetResults) => SetDataWithResponseAction,

}



/* API actions */
export interface ViewSetApiAction {
    state?: ViewSetState,
}

export interface ViewSetListApiAction extends ViewSetApiAction{
    queryParams: Object,
}

export interface ViewSetApi {
    list: (ViewSetListApiAction) => (ViewSetListApiAction) => Promise<any>
}

export type ViewSetReducerWithActionsAndApi = {
    reducer: (state: ViewSetState, action: ViewSetAction) => ViewSetState,
    actions: ViewSetActions,
    api: ViewSetApi
}

