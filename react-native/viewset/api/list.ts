import {ViewSetActions, ViewSetListApiAction} from "../types";
import {BuilderProps} from "../../types";
import {requests} from "../../fetch/requests";

export const buildListItemsAction =

    (actions : ViewSetActions, reducerProps : BuilderProps) =>
    (params : ViewSetListApiAction) => (dispatch : Function) : Promise<any> => {

            // Dispatch loading
            dispatch(actions.setLoading(true));

            const existingParams = {};

            // Get existing store params
            if (params && params.state) {
                // Don't bother about current's store state
            }

            // Spread with passed ones
            const queryParams = {
                ...existingParams,
                ...(params && params.queryParams) || {},
            };

            // Do the actual fetching
            return requests.get(`${reducerProps.url}/`, queryParams).then(resp => {

                // Stop loading and set the data
                dispatch(actions.setLoading(false));
                return resp.json();

            }).then(data=>{

                dispatch(actions.setDataWithResponse(data));
                return data;

            }).catch(e => {

                dispatch(actions.setLoading(false));
                throw(e);

            });

        };

