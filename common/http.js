import Cookies from "js-cookie";
import superagent from 'superagent'


export const cookieCSRFToken = () => Cookies.get('csrftoken');

export const makeRequests = () => {



    return {

        ...superagent,

        post: (url, data) => {
            const csrf  = cookieCSRFToken();
            return superagent.post(url, data).set('X-CSRFToken', csrf);
        },

        patch: (url, data) => {
            const csrf  = cookieCSRFToken();
            return superagent.patch(url, data).set('X-CSRFToken', csrf);
        }



    };





};

export const requests = makeRequests();
