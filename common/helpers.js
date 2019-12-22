
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
 * Returns query array from store that represents order + filters
 * @param store
 */
export const getQueryFromListStore = store => {

    const {filters={}, order} = store;

    if (order){
        return {...filters, order};
    } else {
        return {...filters};
    }


};
