
const basicIndexGetter = item => item && item.id;

const basicProcessor = (map, getter) => (item, position) => {

    const id = getter(item);

    item._position = position;
    map[id] = item;
};




export const mapFromArray = (array, indexGetter=basicIndexGetter, processor=basicProcessor, map = {}) => {

    const proc = processor(map, indexGetter);

    (array || []).forEach(proc);

    return map;
};


/**
 * Returns query array from store that represents ordering + filters
 * @param store
 */
export const getQueryFromListStore = store => {

    const {filters={}, limit, offset, ordering} = store;

    const query = {...filters};

    if (limit !== undefined) query.limit = limit;
    if (offset !== undefined) query.offset = offset;
    if (ordering !== undefined) query.ordering = ordering;


    return query;


};



export const getResponseValidationErrors = (response) => {


    if (response.status !== 400) return null;


    try {
        const validationErrors = JSON.parse(response.response.text);

        if (typeof validationErrors === 'object' && Object.keys(validationErrors).length){
            return validationErrors;
        }
    } catch(e){
        // Do nothing really
        console.warn(`400 request checked for validation errors and has no parseable JSON`);
        console.warn(response.response.text);
        console.dir(response);
        console.warn(e);
    }
    return null;

};
