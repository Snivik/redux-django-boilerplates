import {
    viewSetActionNameGenerator_setResults,
    viewSetActionNameGenerator_setListLoading,
    viewSetActionNameGenerator_setOrder,
    viewSetActionNameGenerator_setFilters,
    viewSetActionNameGenerator_editInline,
    viewSetActionNameGenerator_cancelInlineEdit,
    viewSetActionNameGenerator_updateInlineField,
    viewSetActionNameGenerator_clearInlineForm, viewSetActionNameGenerator_setResultItem
} from "../../constant-generators/list";


export const getDefaultState = (name, options={}) => ({

    loading: true, // By default store has no items
    name,

    error: null,

    // That's a viewset
    results: [],
    edited: [],

    updates: {},

    next: null,
    limit: null,
    previous: null,
    count: undefined,
    offset: null,
    // Use that to determine arguments for viewset requests
    filters: {},
    ordering: null,

    // To have an abilitity to oveerride state
    ...(options.getDefaultState && options.getDefaultState()) || {}

});


const cancelInlineEdit = (state, action) => {

    const {id} = action;
    const edited = [...state.edited].filter(i=> Number(i) !== Number(id));

    const updates = {...state.updates};

    if (id in updates){
        delete updates[id];
        return {...state, edited, updates};
    } else {
        return {...state, edited};
    }

};

const updateInlineField = (state, action) => {

    const {field, id, value} = action;

    const updateForm = state.updates[id] || {};
    updateForm[field] = value;
    const updates = {...state.updates, [id]: updateForm};

    return {...state, updates};

};


const clearInlineForm = (state, action) => {

    const {id} = action;

    const updates = {...state.updates};
    if (id in updates){
        delete updates[id]
    }

    return {...state, updates};


};

const updateItemInList = (state, action) => {

    const {item} = action;
    const {results} = state;

    // If there are results
    if (results && results.length){

        const copy = [];
        results.forEach(eItem=>{
            if (eItem.id === item.id) copy.push(item);
            else copy.push(eItem);
        });

        return {...state, results: copy};
    }

    return state;

}

export const buildViewSetListReducer = (name, options) => (state=getDefaultState(name, options), action) => {

    const {type,...data} = action;

    //console.log(type);

   switch (type){

       case viewSetActionNameGenerator_editInline(name):
           return {...state, edited: [...state.edited, action.id]};

       case viewSetActionNameGenerator_updateInlineField(name):

           return updateInlineField(state, action);

       case viewSetActionNameGenerator_clearInlineForm(name):
            return clearInlineForm(state, action);

       case viewSetActionNameGenerator_cancelInlineEdit(name):
           return cancelInlineEdit(state, action);

       case viewSetActionNameGenerator_setListLoading(name):
           return {...state, loading: action.loading, error: null};

       case viewSetActionNameGenerator_setResults(name):
           return {...state, ...data};
       case viewSetActionNameGenerator_setResultItem(name):
           return updateItemInList(state, action);

       case viewSetActionNameGenerator_setOrder(name):
           return {...state, ordering: action.ordering};

       case viewSetActionNameGenerator_setFilters(name):
           return {...state, filters: action.filters};

       default:
           return state;
   }


};
