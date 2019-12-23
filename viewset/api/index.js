import {buildViewSetActions} from "../actions";
import {buildApiDeleteListItem, buildApiGetList, buildApiSetListOrder} from "./list";
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

    const builderParams = {name, actions, options: builderOptions};

    return {


        list: buildApiGetList(builderParams),
        setListOrder: buildApiSetListOrder(builderParams),
        delete: buildApiDeleteListItem(builderParams),


        get: buildApiGetItem(builderParams),
        update: buildApiUpdateItem(builderParams),

    }

};
