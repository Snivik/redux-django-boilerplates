import {
    viewSetActionNameGenerator_clearItemChanges,
    viewSetActionNameGenerator_setItem,
    viewSetActionNameGenerator_setItemErrors,
    viewSetActionNameGenerator_setItemLoading,
    viewSetActionNameGenerator_updateData
} from "../../constant-generators/item";
import {buildViewSetAction} from "./index";



export const buildSetUpdatedAction = name => (data) => ({
    type: viewSetActionNameGenerator_updateData(name),
    data
});

export const buildViewSetItemActions = (name) => {

    return {

        // Item utils
        setItemLoading: buildViewSetAction(viewSetActionNameGenerator_setItemLoading, name),
        setItemErrors: buildViewSetAction(viewSetActionNameGenerator_setItemErrors, name),
        clearItemChanges: buildViewSetAction(viewSetActionNameGenerator_clearItemChanges, name),
        setItem: buildViewSetAction(viewSetActionNameGenerator_setItem, name),
        updateData: buildSetUpdatedAction(name)
    }
};
