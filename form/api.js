/**
 * Does nothing but wrap a service call in form loading
 * @param formActions Actions of the form
 * @param service A service to wrap. It will be called as service(dispatch)
 * @returns {Function}
 */
import {buildFormActions} from "./actions";
import {requests} from "../common/http";
import {getResponseValidationErrors} from "../common/helpers";



export const buildFormApiAction = (formActions, service, options={}) => dispatch => {

    dispatch(formActions.setLoading(true));

    const _onError = (errorResp) => {

        // That's a global error
        if (errorResp.status && errorResp.status === 403){

            dispatch(formActions.setErrors({error: errorResp.response.text}));

        }

    };



    const onError = options.onError || _onError;



    return service(dispatch).catch(onError).finally(()=>dispatch(formActions.setLoading(false)));

};


const defaultBuildCreate = (name, {baseUrl='/api', viewset = name, formActions, ...options}) => data => {

    const defaultOnSuccess = (r, dispatch) => {
        return dispatch(formActions.setFormData(r.body))
    };

    const defaultOnFail = (r, dispatch) => {

        const validation = getResponseValidationErrors(r);

        if (validation){
            return dispatch(formActions.setErrors({validation}));
        } else {
            return dispatch(formActions.setErrors({error: r.response.text}));
        }

    };

    const {
        onSuccess = defaultOnSuccess,
        onFail = defaultOnFail,
    } = options;

    const service = (dispatch) => requests.post(`${baseUrl}/${viewset}/`, data)
        .then(resp=>onSuccess(resp, dispatch))
        .catch(resp=>onFail(resp, dispatch));

    return buildFormApiAction(formActions, service, {...options})
};


export const buildFormApi = (name, options) => {

    const {
        actionsOptions={},
        createOptions={},
        buildCreate=defaultBuildCreate,
        ...otherOptions} = options;

    const formActions = buildFormActions(name, {...actionsOptions, ...otherOptions});

    const create = buildCreate(name, {formActions, ...createOptions, ...otherOptions});


    return {create}
};