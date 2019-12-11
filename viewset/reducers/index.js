import {buildViewSetListReducer} from "./list";
import {buildViewSetItemReducer} from "./item";

export const buildReducers = (name, options={}) => {


    return {
        list: buildViewSetListReducer(name, options.list),
        item: buildViewSetItemReducer(name, options.item),
    }
};