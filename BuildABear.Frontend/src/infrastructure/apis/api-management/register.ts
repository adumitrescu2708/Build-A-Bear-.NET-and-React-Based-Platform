import { UserAddDTO, VendorUserRegisterDTO } from "../client/models";
import { AuthorizationApi } from "../client/apis";

/**
 * Use constants to identify mutations and queries.
 */
const registerMutationKey = "registerMutation";
const registerVendorUserMutationKey = "registerVendorUserMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case just to login the user.
 */
export const useRegisterApi = () => {
    const registerMutation = (userAddDTO: UserAddDTO) => new AuthorizationApi().apiAuthorizationRegisterPost({ userAddDTO }); // Use the generated client code and adapt it.
    const registerVendorMutation = (vendorUserRegisterDTO:VendorUserRegisterDTO) =>  new AuthorizationApi().apiAuthorizationRegisterVendorUserPost({vendorUserRegisterDTO});

    return {
        registerMutation: { // Return the mutation object.
            key: registerMutationKey, // Add the key to identify the mutation.
            mutation: registerMutation // Add the mutation callback.
        },
        registerVendorMutation: {
            key: registerVendorUserMutationKey,
            mutation: registerVendorMutation
        }
    }
}