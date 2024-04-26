import { useAppSelector } from "@application/store";
import { ApiTeddyItemGetGetRequest, TeddyItemApi, ApiTeddyItemUpdatePutRequest, ApiTeddyItemAddPostRequest, TeddyItemUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getTeddyItemsQuery = "getTeddyItemsQuery";
const downloadTeddyItemsQuery = "downloadTeddyItemsQuery";
const addTeddyItemMutationKey = "addTeddyItemMutation";
const deleteTeddyItemMutationKey = "deleteTeddyItemMutation";
const updateTeddyItemMutationKey = "updateTeddyItemMutation";

export const useTeddyItemApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getTeddyItems = (page: ApiTeddyItemGetGetRequest) => new TeddyItemApi(config).apiTeddyItemGetGet(page); // Use the generated client code and adapt it.
    const updateTeddyItem = (id:string, teddyItemUpdateDTO : TeddyItemUpdateDTO) => new TeddyItemApi(config).apiTeddyItemUpdateIdPut({id, teddyItemUpdateDTO});
    const addTeddyItem = (req: ApiTeddyItemAddPostRequest) => new TeddyItemApi(config).apiTeddyItemAddPost(req);
    const deleteTeddyItem = (id: string) => new TeddyItemApi(config).apiTeddyItemDeleteIdDelete({id});
    const downloadTeddyItem = (id: string) => new TeddyItemApi(config).apiTeddyItemGetFileByIdIdGet({id});
    return {
        getTeddyItems: { // Return the query object.
            key: getTeddyItemsQuery, // Add the key to identify the query.
            query: getTeddyItems // Add the query callback.
        },
        updateTeddyItem: {
            key: updateTeddyItemMutationKey,
            mutation: updateTeddyItem
        },
        addTeddyItem: {
            key: addTeddyItemMutationKey,
            mutation: addTeddyItem
        },
        deleteTeddyItem: {
            key: deleteTeddyItemMutationKey,
            mutation: deleteTeddyItem
        },
        downloadTeddyItem: {
            key: downloadTeddyItemsQuery,
            mutation: downloadTeddyItem
        }
    }
}