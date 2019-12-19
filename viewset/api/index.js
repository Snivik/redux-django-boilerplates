import {buildViewSetActions} from "../actions";
import {buildApiGetList} from "./list";
import {buildApiGetItem, buildApiUpdateItem} from "./item";
import {requests} from "../../common/http";

export const apiDefaultErrorHandler = (name, actions, actionName) => (error) => {

    console.dir(error);
    return error;
};


export const buildViewSetApi = (name, options={}) => {


    const builderOptions = {
        agent: requests,
        baseUrl: '/api',
        onError: apiDefaultErrorHandler,
        ...options
    };

    const actions = buildViewSetActions(name);

    return {
        list: buildApiGetList(name, actions, builderOptions),
        get: buildApiGetItem(name, actions, builderOptions),
        update: buildApiUpdateItem(name, actions, builderOptions)
    }

};
