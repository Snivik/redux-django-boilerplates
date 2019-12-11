import {requests} from "../common/http";


const onCatchBuilder = () =>  response => { console.error(response)};

// Default passthrough
const onThenBuilder = response => response;


/**
 * Use that to build any kind of form actions
 */
export const buildFormApiAction = (name, options={}) => (data) => dispatch => {


    const o = {
        onThenBuilder: onThenBuilder(name, options),
        onCatchBuilder: onCatchBuilder(name, options),
        ...options,
    };

    const {actions, service} = o;

    dispatch(actions.setLoading(true));

    return service(data).then(o.onThenBuilder(name, options)).catch(o.onCatchBuilder(name, options)).finally(()=>{
        return dispatch(actions.setLoading(false))
    })


};



const buildCreateAction = (name, options={}) => {


    const {
        apiUrl = '/api',
        viewsetName = name,
    } = options;

    const onThen = () => (resp) => {

    };


    return buildFormApiAction(name, {

        onThenBuilder: onThen,
        service: (data) => requests.post(`${apiUrl}/${viewsetName}/`, data),

        ...options,
    })

};


const buildFormApiActions = (name, options={}) => {

    const o = {
        buildCreateAction: buildCreateAction,
        ...options
    };

    return {
        create: o.buildCreateAction(name, options),
    }

};