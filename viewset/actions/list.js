import {
    viewSetActionNameGenerator_setListLoading,
    viewSetActionNameGenerator_setResults,
    viewSetActionNameGenerator_setFilters,
    viewSetActionNameGenerator_setOrder
} from "../../constant-generators/list";

import {buildViewSetAction} from "./index";

export const buildViewSetListActions = (name) => {

    return {

        // List utils
        setListLoading: buildViewSetAction(viewSetActionNameGenerator_setListLoading, name),
        setResults: buildViewSetAction(viewSetActionNameGenerator_setResults, name),

        setOrder: buildViewSetAction(viewSetActionNameGenerator_setOrder, name),
        setFilters: buildViewSetAction(viewSetActionNameGenerator_setFilters, name),



    }
};
