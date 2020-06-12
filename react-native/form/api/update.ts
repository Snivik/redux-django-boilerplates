import {FormActions, UpdateFormApiAction} from "../types";
import {BuilderProps} from "../../types";
import {requests} from "../../fetch/requests";

export const buildUpdateItemAction =
    (actions: FormActions, props: BuilderProps) =>
        (params: UpdateFormApiAction) =>
            (dispatch: Function) : Promise<any> => {


            dispatch(actions.setLoading(true));

            return requests.patch(`${props.url}/${params.id}/`, params.updates).then(resp=>{

                dispatch(actions.setLoading(false));
                return resp.json();

            }).then(data=>{

                if (data && data.id){
                    dispatch(actions.setData(data));
                    dispatch(actions.clearForm());
                } else {
                    throw(data);
                }

                return data;

            }).catch(error=>{

                dispatch(actions.setLoading(false));
                throw(error);
            })


    };
