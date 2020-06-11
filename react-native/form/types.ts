import {ReduxAction} from "../common/types";

export interface FormState {
    data:  Object | null;
    updatedData: Object,
    validation: Object,
    error: Object,
    loading: boolean,
}

export interface FormAction extends ReduxAction {
}

export interface UpdateAction extends FormAction  {
    name: string,
    value: any,
}

export interface LoadingAction extends FormAction  {
    loading: boolean,
}

export interface SetDataAction extends FormAction {
    data: Object,
}

export interface SetErrorsAction extends FormAction {
    validation?: Object,
    error?: string
}

export interface ErrorActionData {
    validation?: Object,
    error?: string
}

export interface FormActions {
    updateField: (field: string, value: any) => UpdateAction ,
    setLoading: (loading: boolean) => LoadingAction,
    reset: () => FormAction,
    setData: (data: Object) => SetDataAction,
    setErrors: (data: ErrorActionData) =>SetErrorsAction,
    clearErrors: () => FormAction,
    clearForm: () => FormAction,
}


export interface FormReducerWithActionsAndApi  {
    reducer: (state: FormState | null, action: FormAction) => FormState,
    actions: FormActions,
}
