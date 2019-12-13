
import {buildViewSetActions} from "./actions";
import {buildViewSetApi} from "./api";
import {buildViewSetReducers} from "./reducers";


export const buildViewSetReducerAndActions = (name,
                                              options={}
                                              ) => {


        const o = {
            api: {},
            reducers: {},
            actions: {},
            ...options,
        };

        return {
            api: buildViewSetApi(name, o.api),
            reducers: buildViewSetReducers(name, o.reducers),
            actions: buildViewSetActions(name, o.actions)
        }


};