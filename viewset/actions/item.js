import {
    viewSetActionNameGenerator_clearItemChanges, viewSetActionNameGenerator_setItem,
    viewSetActionNameGenerator_setItemErrors,
    viewSetActionNameGenerator_setItemLoading
} from "../../constant-generators/item";
import {buildViewSetAction} from "./index";

export const buildViewSetItemActions = (name) => {

    return {

        // Item utils
        setItemLoading: buildViewSetAction(viewSetActionNameGenerator_setItemLoading, name),
        setItemErrors: buildViewSetAction(viewSetActionNameGenerator_setItemErrors, name),
        clearItemChanges: buildViewSetAction(viewSetActionNameGenerator_clearItemChanges, name),
        setItem: buildViewSetAction(viewSetActionNameGenerator_setItem, name),
    }
};