import { useAppSelector } from "@application/store";
import { ApiTeddyItemGetGetRequest, TeddyItemApi, ApiTeddyItemUpdatePutRequest, ApiTeddyItemAddPostRequest } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getTeddyItemsQuery = "getTeddyItemsQuery";
const downloadTeddyItemsQuery = "downloadTeddyItemsQuery";
const addTeddyItemQuery = "addTeddyItemQuery";

export const useTeddyItemApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getTeddyItems = (page: ApiTeddyItemGetGetRequest) => new TeddyItemApi(config).apiTeddyItemGetGet(page); // Use the generated client code and adapt it.
    const updateTeddyItems = (form : ApiTeddyItemUpdatePutRequest) => new TeddyItemApi(config).apiTeddyItemUpdatePut(form);
    const addTeddyItem = (form: ApiTeddyItemAddPostRequest) => new TeddyItemApi(config).apiTeddyItemAddPost(form);
    
    return {
        getTeddyItems: { // Return the query object.
            key: getTeddyItemsQuery, // Add the key to identify the query.
            query: getTeddyItems // Add the query callback.
        },
        updateTeddyItem: {
            key: downloadTeddyItemsQuery,
            query: updateTeddyItems
        },
        addTeddyItem: {
            key: addTeddyItemQuery,
            mutation: addTeddyItem
        }
    }
}