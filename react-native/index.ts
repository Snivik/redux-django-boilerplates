import {BuilderProps, ReactNativeState, RNReducersActionsAndAPI} from "./types";
import {generateViewSetReducerWithActionsAndApi} from "./viewset/reducer";
import {generateFormReducerWithActionsAndApi} from "./form";
import {ViewSetAction} from "./viewset/types";
import {FormAction} from "./form/types";


export function buildRNReducersActionsAndAPI(props: BuilderProps) : RNReducersActionsAndAPI {


    const {
        actions: listActions,
        reducer: listReducer,
        api: listApi,
    } = generateViewSetReducerWithActionsAndApi(props);

    const {
        actions: formActions,
        reducer: formReducer
    } = generateFormReducerWithActionsAndApi(props);


    const reducers = (state: ReactNativeState, action: ViewSetAction | FormAction) : ReactNativeState => {

        return {
            list: listReducer(state && state.list, action),
            form: formReducer(state && state.form, action),
        }

    };

    return {
        api: {list: listApi},
        actions: {list: listActions, form: formActions},
        reducers
    }
}
