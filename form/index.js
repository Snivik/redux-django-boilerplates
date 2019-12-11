import {buildFormActions} from "./actions";
import {buildFormReducer} from "./reducer";


export const buildFormReducerWithActions = (name, options = {}) => {


    const o = {
        api: {},
        reducer: {},
        actions: {},
        ...options
    };

    return {
        actions: buildFormActions(name, o.actions),
        reducer: buildFormReducer(name, o.reducer),

    }

};