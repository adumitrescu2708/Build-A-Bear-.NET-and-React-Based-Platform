import { useAppSelector } from "@application/store";
import { ApiVendorGetGetRequest, VendorApi } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { VendorAddDTO, VendorContractDTO } from "../client";
/**
 * Use constants to identify mutations and queries.
 */
const getVendorsQuery = "getVendorsQuery";
const addVendorMutationKey = "addVendorMutation";
const updateVendorMutationKey = "updateVendorMutation";
const deleteVendorMutationKey = "deleteVendorMutation";

export const useVendorApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getVendors = (page: ApiVendorGetGetRequest) => new VendorApi(config).apiVendorGetGet(page);
    const addVendor = (page: VendorAddDTO) => new VendorApi(config).apiVendorAddPost({ vendorAddDTO: page });
    const updateVendor = (id:string, vendorContractDTO:VendorContractDTO) => new VendorApi(config).apiVendorUpdateContractByIdIdPut({id, vendorContractDTO});
    const deleteVendor = (id:string) => new VendorApi(config).apiVendorDeleteIdDelete({id});
    return {
        getVendors: { // Return the query object.
            key: getVendorsQuery, // Add the key to identify the query.
            query: getVendors // Add the query callback.
        },
        addVendor: {
            key: addVendorMutationKey,
            mutation: addVendor
        },
        updateVendor: {
            key: updateVendorMutationKey,
            mutation:updateVendor
        },
        deleteVendor: {
            key: deleteVendorMutationKey,
            mutation: deleteVendor
        }
    }
}