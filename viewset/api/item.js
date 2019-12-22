import {API_ACTION_GET_ITEM, API_ACTION_UPDATE_ITEM} from "./constants";

export const buildApiGetItem = ({name, actions, options={}}) => (id) => dispatch => {

    const {agent, baseUrl, onError} = options;

    dispatch(actions.setItemLoading({loading: true} ));

    return agent.get(`${baseUrl}/${name}/${id}/`).then(resp => {
        const {body} = resp;
        return dispatch(actions.setItem({data: body}))

    }).catch(onError(name, actions, API_ACTION_GET_ITEM)).finally(
        ()=>dispatch(actions.setItemLoading({loading: false} ))
    );


};




export const buildApiUpdateItem = ({name, actions, options={}}) => (id, data) => dispatch => {

    const {agent, baseUrl, onError} = options;

    dispatch(actions.setItemLoading({loading: true} ));

    return agent.patch(`${baseUrl}/${name}/${id}/`, data).then(resp => {
        const {body} = resp;
        return dispatch(actions.setItem({data: body}))

    }).catch(onError(name, actions, API_ACTION_UPDATE_ITEM)).finally(
        ()=>dispatch(actions.setItemLoading({loading: false} ))
    );

};
