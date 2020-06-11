
export const getQueryFromParams = (params: Object) : string => {

    const query = Object.keys((params||{})).map((key)=>{
        const value = params[key];
        return  `${key}=${encodeURI(value)}`

    }).join("&");

    return query;
};


export const requests = {

    get: (url, params) => {

        const headers = {};

        const query = getQueryFromParams(params);

        return fetch(`${url}?${query}`,
            {
                headers,
                method: 'GET',
                credentials: 'include',
            }
        );
    },


    post: (url, body) => {
        const headers = {
            'Content-Type': 'application/json'
        };


        return fetch(`${url}`,
            {
                headers,
                method: 'POST',
                body: JSON.stringify(body),
                credentials: 'include',
            }).then(r=>{
            return r;
        });
    },


    patch: (url, body) => {

        const headers = {
            'Content-Type': 'application/json'
        };

        return fetch(`${url}`,
            {
                headers,
                method: 'PATCH',
                body: JSON.stringify(body)
            });


    }


};
