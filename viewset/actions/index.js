import {buildViewSetItemActions} from "./item";
import {buildViewSetListActions} from "./list";

export const buildViewSetAction = (nameBuilder, name) => body => ({
    type: nameBuilder(name),
    ...body
});

export const buildViewSetActions = (name) => {

    return {
        ...buildViewSetItemActions(name),
        ...buildViewSetListActions(name),
    }
};