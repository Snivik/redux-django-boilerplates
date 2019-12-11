import {
    viewSetActionNameGenerator_setListLoading,
    viewSetActionNameGenerator_setResults
} from "../../constant-generators/list";

import {buildViewSetAction} from "./index";

export const buildViewSetListActions = (name) => {

    return {

        // List utils
        setListLoading: buildViewSetAction(viewSetActionNameGenerator_setListLoading, name),
        setResults: buildViewSetAction(viewSetActionNameGenerator_setResults, name),


    }
};