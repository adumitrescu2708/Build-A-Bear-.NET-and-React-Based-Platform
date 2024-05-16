import { useAppSelector } from "@application/store";
import { ApiVendorGetGetRequest, VendorApi } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { VendorAddDTO } from "../client";
/**
 * Use constants to identify mutations and queries.
 */
const getVendorsQuery = "getVendorsQuery";
const addVendorMutationKey = "addVendorMutation";

export const useVendorApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getVendors = (page: ApiVendorGetGetRequest) => new VendorApi(config).apiVendorGetGet(page);
    const addVendor = (page: VendorAddDTO) => new VendorApi(config).apiVendorAddPost({ vendorAddDTO: page });
    return {
        getVendors: { // Return the query object.
            key: getVendorsQuery, // Add the key to identify the query.
            query: getVendors // Add the query callback.
        },
        addVendor: {
            key: addVendorMutationKey,
            mutation: addVendor
        }
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