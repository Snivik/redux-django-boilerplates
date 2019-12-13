import {
    viewSetActionNameGenerator_clearItemChanges,
    viewSetActionNameGenerator_setItem,
    viewSetActionNameGenerator_setItemErrors,
    viewSetActionNameGenerator_setItemLoading
} from "../../constant-generators/item";


export const getDefaultState = () => ({

    loading: true, // By default store has no items


    data: {},
    updatedData: {},

    validationErrors: null,
    error: null,

});

export const buildViewSetItemReducer = (name,options={}) => (state=(options.getDefaultState ||getDefaultState)(), action) => {

    const {type, ...data} = action;

    switch (type){

        case viewSetActionNameGenerator_setItem(name):
            return {...state, ...data, error: null, validationErrors: null};

        case viewSetActionNameGenerator_setItemLoading(name):
            return {...state, ...data};

        case viewSetActionNameGenerator_setItemErrors(name):
            return {...state, error: action.error, validationErrors: action.validationErrors};

        case viewSetActionNameGenerator_clearItemChanges(name):
            return {...state, updatedData: {}, error: null, validationErrors: null};

        default:
            return state;
    }


};