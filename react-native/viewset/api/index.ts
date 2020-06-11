import {BuilderProps} from "../../types";
import {generateViewSetActions} from "../actions";
import {buildListItemsAction} from "./list";
import {ViewSetApi} from "../types";





export const generateViewSetApi = (props: BuilderProps) : ViewSetApi => {
    const actions = generateViewSetActions(props);

    return {
        list: buildListItemsAction(actions, props)
    }
};
