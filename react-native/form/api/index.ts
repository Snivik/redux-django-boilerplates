import {BuilderProps} from "../../types";
import {FormApi} from "../types";
import {generateFormActions} from "../actions";
import {buildUpdateItemAction} from "./update";

export const generateFormApi = (props: BuilderProps) : FormApi => {

    const actions = generateFormActions(props);

    return {
        update: buildUpdateItemAction(actions, props)
    }
};
