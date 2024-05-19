import { useAppSelector } from "@application/store";
import { ApiVendorGetGetRequest, FeedbackApi, VendorApi } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { FeedbackDTO } from "../client";
/**
 * Use constants to identify mutations and queries.
 */
const addFeedbackKey = "addFeedback";

export const useFeedbackApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const config = getAuthenticationConfiguration(token);

    const addFeedback = (page: FeedbackDTO) => new FeedbackApi(config).apiFeedbackAddPost({ feedbackDTO: page });
       return {
        addFeedback: {
            key: addFeedbackKey,
            mutation: addFeedback
        }
    }
}