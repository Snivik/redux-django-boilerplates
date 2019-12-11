import Cookies from "js-cookie";
import superagent from 'superagent'

export const makeRequests = () => {

    const csrf = Cookies.get('csrftoken');

    return {

        post: (url, data) => {
            return superagent.post(url, data).set('X-CSRFToken', csrf);
        }

    };





};

export const requests = makeRequests();