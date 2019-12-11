
import {buildViewSetActions} from "./actions";
import {buildApi} from "./api";
import {buildReducers} from "./reducers";


export const buildViewSetReducerAndActions = (name,
                                              apiOptions={},
                                              reducerOptions={},
                                              actionOptions={}
                                              ) => {

        return {
            api: buildApi(name, apiOptions),
            reducers: buildReducers(name, reducerOptions),
            actions: buildViewSetActions(name, actionOptions)
        }


};