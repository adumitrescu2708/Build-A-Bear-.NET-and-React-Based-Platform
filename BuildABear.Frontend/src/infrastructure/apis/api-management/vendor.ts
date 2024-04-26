import { useAppSelector } from "@application/store";
import { ApiVendorGetGetRequest, VendorApi } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getVendorsQuery = "getVendorsQuery";
const addVendorMutationKey = "addVendorMutation";
const deleteVendorMutationKey = "deleteVendorMutation";
const updateVendorMutationKey = "updateVendorMutation";

export const useVendorApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getVendors = (page: ApiVendorGetGetRequest) => new VendorApi(config).apiVendorGetGet(page); // Use the generated client code and adapt it.
    // const updateTeddyItem = (id:string, teddyItemUpdateDTO : TeddyItemUpdateDTO) => new TeddyItemApi(config).apiTeddyItemUpdateIdPut({id, teddyItemUpdateDTO});
    // const addTeddyItem = (req: ApiTeddyItemAddPostRequest) => new TeddyItemApi(config).apiTeddyItemAddPost(req);
    // const deleteTeddyItem = (id: string) => new TeddyItemApi(config).apiTeddyItemDeleteIdDelete({id});
    return {
        getVendors: { // Return the query object.
            key: getVendorsQuery, // Add the key to identify the query.
            query: getVendors // Add the query callback.
        },
        // updateTeddyItem: {
        //     key: updateTeddyItemMutationKey,
        //     mutation: updateTeddyItem
        // },
        // addTeddyItem: {
        //     key: addTeddyItemMutationKey,
        //     mutation: addTeddyItem
        // },
        // deleteTeddyItem: {
        //     key: deleteTeddyItemMutationKey,
        //     mutation: deleteTeddyItem
        // },
    }
}