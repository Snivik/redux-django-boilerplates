import {viewSetActionNameGenerator_setResults, viewSetActionNameGenerator_setListLoading} from "../../constants";


export const getDefaultState = () => ({

    loading: true, // By default store has no items


    error: null,

    // That's a list
    results: [],
    next: null,
    previous: null,
    count: undefined,


});

export const buildViewSetListReducer = (name) => (state=getDefaultState(), action) => {

    const {type, ...data} = action;

   switch (type){

       case viewSetActionNameGenerator_setListLoading(name):
           return {...state, loading: action.loading, error: null};

       case viewSetActionNameGenerator_setResults(name):
           return {...state, ...data};
       default:
           return state;
   }


};