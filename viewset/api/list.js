import {API_ACTION_DELETE_ITEM, API_ACTION_GET_LIST} from "./constants";

export const buildApiGetList = (builderParams={}) => (args={}) => dispatch => {

    const {name, actions, options={}} = builderParams;
    let {params={}, store} = args;

    const {agent, baseUrl,onError} = options;
    if (store){

        params = {...(store.filters || {}), ...params};

        //
        if (store.order && !params.order){
            params.order = store.order;
        }

        // Assign count and offset values
        if (store.offset && !params.offset) params.offset = store.offset;
        if (store.count && !params.count) params.count = store.count;
    }

    dispatch(actions.setListLoading({loading: true}));

    return agent.get(`${baseUrl}/${name}/`, params).then(resp => {
        const {body} = resp;

        // Param is a set of order + some filters. Set them
        const {order: _order, count, offset,
                ..._filters} = params;

        // Set the store filters equal to the ones
        if (_order) dispatch(actions.setOrder({order: _order}));
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
    const {agent, baseUrl,onError} = options;
    dispatch(actions.setListLoading(true));

    return agent.delete(`${baseUrl}/${name}/${id}/`).then(response=>{

        // Coolio, now the deleted item should be reflected in the new slice
        return dispatch(getList);


    }).catch(onError(name, actions, API_ACTION_DELETE_ITEM))


};


export const buildApiSetListFilter = (builderParams) => (params) => dispatch => {




};

export const buildApiSetListOrder = (builderParams) => (order, args={}) => dispatch => {

    if (!args.params) args.params = {};
    args.params.order = order;

    return dispatch(buildApiGetList(builderParams)(args));

};





