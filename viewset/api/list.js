import {API_ACTION_GET_LIST} from "./constants";

export const buildApiGetList = (name, actions, options) => (params={}) => dispatch => {

    const {agent, baseUrl,onError} = options;

    dispatch(actions.setListLoading({loading: true}));

    return agent.get(`${baseUrl}/${name}/`, params).then(resp => {
        const {body} = resp;
        return dispatch(actions.setResults(body))

    }).catch(onError(name, actions, API_ACTION_GET_LIST)).finally(
        ()=>dispatch(actions.setListLoading({loading: false} ))
    );

};
