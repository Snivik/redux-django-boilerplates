import {buildFormActions} from "./actions";
import {buildFormReducer} from "./reducer";
import {buildFormApi} from "./api";


export const buildFormReducerWithActions = (name, options = {}) => {


    const o = {
        reducer: {},
        actions: {},
        api: {},
        ...options
    };

    return {
        actions: buildFormActions(name, o.actions),
        reducer: buildFormReducer(name, o.reducer),
        api: buildFormApi(name, o.api),
    }

};