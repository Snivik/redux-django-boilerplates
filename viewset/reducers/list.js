import {
    viewSetActionNameGenerator_setResults,
    viewSetActionNameGenerator_setListLoading,
    viewSetActionNameGenerator_setOrder, viewSetActionNameGenerator_setFilters
} from "../../constant-generators/list";


export const getDefaultState = (name, options={}) => ({

    loading: true, // By default store has no items
    name,

    error: null,

    // That's a list
    results: [],
    next: null,
    previous: null,
    count: undefined,
    offset: null,
    // Use that to determine arguments for list requests
    filters: {},
    order: null,

    // To have an abilitity to oveerride state
    ...(options.getDefaultState && options.getDefaultState()) || {}

});

export const buildViewSetListReducer = (name, options) => (state=getDefaultState(name, options), action) => {

    const {type, ...data} = action;

   switch (type){

       case viewSetActionNameGenerator_setListLoading(name):
           return {...state, loading: action.loading, error: null};

       case viewSetActionNameGenerator_setResults(name):
           return {...state, ...data};

       case viewSetActionNameGenerator_setOrder(name):
           return {...state, order: action.order};

       case viewSetActionNameGenerator_setFilters(name):
           return {...state, filters: action.filters};

       default:
           return state;
   }


};
