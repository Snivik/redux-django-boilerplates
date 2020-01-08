import {API_ACTION_DELETE_ITEM, API_ACTION_GET_LIST} from "./constants";

export const buildApiGetList = (builderParams={}) => (args={}) => dispatch => {

    const {name, actions, options={}} = builderParams;
    let {params={}, store} = args;

    const {agent, baseUrl,onError, viewset=name} = options;
    if (store){

        params = {...(store.filters || {}), ...params};

        //
        if (store.ordering && !params.ordering){
            params.ordering = store.ordering;
        }

        // Assign count and offset values
        if (store.offset && !params.offset) params.offset = store.offset;
        if (store.count && !params.count) params.count = store.count;
    }

    dispatch(actions.setListLoading({loading: true}));

    return agent.get(`${baseUrl}/${viewset}/`, params).then(resp => {
        const {body} = resp;

        // Param is a set of ordering + some filters. Set them
        const {ordering: _ordering, count, offset,
                ..._filters} = params;

        // Set the store filters equal to the ones
        if (_ordering) dispatch(actions.setOrder({ordering: _ordering}));
        if (_filters && Object.keys(_filters).length > 0) dispatch(actions.setFilters({filters: _filters}));

        // Do not update the count
        body.lastResultCount = body.count;
        delete body.count;

        return dispatch(actions.setResults(body))

    }).catch(onError(name, actions, API_ACTION_GET_LIST)).finally(
        ()=>dispatch(actions.setListLoading({loading: false} ))
    );

};


/**
 * Makes API call to delete item, then refreshes the list at current state
 * @param builderParams
 * @returns {function(*=): Function}
 */
export const buildApiDeleteListItem = (builderParams={}) => (id, args) => dispatch => {

    const getList = buildApiGetList(builderParams)(args);


    const {name, actions, options={}} = builderParams;
    //let {store} = args;
    const {agent, baseUrl,onError, viewset=name} = options;
    dispatch(actions.setListLoading(true));

    return agent.delete(`${baseUrl}/${viewset}/${id}/`).then(response=>{

        // Coolio, now the deleted item should be reflected in the new slice
        return dispatch(getList);


    }).catch(onError(name, actions, API_ACTION_DELETE_ITEM))


};


export const buildApiSetListFilter = (builderParams) => (params) => dispatch => {




};

export const buildApiSetListOrder = (builderParams) => (ordering, args={}) => dispatch => {

    if (!args.params) args.params = {};
    args.params.ordering = ordering;

    return dispatch(buildApiGetList(builderParams)(args));

};





