import {
    viewSetActionNameGenerator_setListLoading,
    viewSetActionNameGenerator_setResults,
    viewSetActionNameGenerator_setFilters,
    viewSetActionNameGenerator_setOrder,
    viewSetActionNameGenerator_editInline,
    viewSetActionNameGenerator_cancelInlineEdit,
    viewSetActionNameGenerator_updateInlineField,
    viewSetActionNameGenerator_clearInlineForm
} from "../../constant-generators/list";

import {buildViewSetAction} from "./index";


const setInlineEdit = (name) => id => ({

    type: viewSetActionNameGenerator_editInline(name),
    id,

});

const cancelInline = name => id => ({

    type: viewSetActionNameGenerator_cancelInlineEdit(name),
    id,

});

const _updateInlineField = name => (id, field, value) => ({

    type: viewSetActionNameGenerator_updateInlineField(name),
    id, field, value

});

const _clearInlineForm = name => (id) => ({
   type: viewSetActionNameGenerator_clearInlineForm(name),
   id,
});

export const buildViewSetListActions = (name) => {

    return {

        // List utils
        setListLoading: buildViewSetAction(viewSetActionNameGenerator_setListLoading, name),
        setResults: buildViewSetAction(viewSetActionNameGenerator_setResults, name),

        setOrder: buildViewSetAction(viewSetActionNameGenerator_setOrder, name),
        setFilters: buildViewSetAction(viewSetActionNameGenerator_setFilters, name),

        editInline: setInlineEdit(name),
        updateInlineField: _updateInlineField(name),
        cancelInlineEdit: cancelInline(name),
        clearInlineForm: _clearInlineForm(name)

    }
};
