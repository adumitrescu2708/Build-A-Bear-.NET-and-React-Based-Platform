import {TeddyItemEditFormModel, TeddyItemEditFormController} from "./TeddyItemEditForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { RequestResponse, TeddyItemCategoryEnum } from "@infrastructure/apis/client/models";
import { useTeddyItemApi } from "@infrastructure/apis/api-management/teddyItem";
import { toast } from "react-toastify";
import { TeddyItemUpdateDTO } from "@infrastructure/apis/client";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
const getDefaultValues = (initialData?: {}) =>
{
    const defaultValues = {
        price: null,//
        description: null,//
        fabric: null,//
        color: null,//
        quantity: null,//
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
}
export const useInitTeddyItemEditForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();
    const schema = yup.object().shape({
        price: yup.number().nullable(),
        description: yup.string().nullable(),
        fabric: yup.string().nullable(),
        color: yup.string().nullable(),
        quantity: yup.number().nullable(),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

export const useTeddyItemEditFormController = (id: string) : TeddyItemEditFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitTeddyItemEditForm();
    const { updateTeddyItem: { mutation:updateTeddyItem, key: updateTeddyItemQuery } } = useTeddyItemApi();
    const { redirectToFeed } = useAppRouter();
    // const { mutateAsync: add, status } = useMutation<{ id: string, teddyItemUpdateDTO: TeddyItemUpdateDTO }>({
    //     mutationKey: [updateTeddyItemQuery], 
    //     mutationFn: ({ id, teddyItemUpdateDTO }) => updateTeddyItem(id, teddyItemUpdateDTO),
    // })

    const { mutateAsync: add, status } = useMutation<RequestResponse, Error, { id: string, teddyItemUpdateDTO: TeddyItemUpdateDTO }>({
        mutationKey: [updateTeddyItemQuery], 
        mutationFn: ({ id, teddyItemUpdateDTO }) => updateTeddyItem(id, teddyItemUpdateDTO),
    });
    

    // const submit = useCallback((data: TeddyItemEditFormModel) => // Create a submit callback to send the form data to the backend.
    //     add(id, data).then(() => {
    //         toast(formatMessage({ id: "notifications.messages.itemUpdatedSuccess" }));
    //     }), [add, id]);
    const submit = useCallback((data: TeddyItemUpdateDTO) => {
        const requestData = {
            id,
            teddyItemUpdateDTO: {
                ...data,
                // Add other fields and ensure they are correctly formatted
            }
        };
    
        // Call mutateAsync with the prepared data
        add(requestData).then(() => {
            
            toast(formatMessage({ id: "notifications.messages.itemUpdatedSuccess" }));
            redirectToFeed();
        }).catch(error => {
            console.log("aici", id);
            toast(formatMessage({ id: "notifications.messages.itemUpdatedError" }));
            console.error("Failed to update teddy item:", error);
        });
    }, [add, formatMessage, id]);

    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<TeddyItemEditFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending" // Return if the form is still submitting or nit.
        },
        state: {
            errors // Return what errors have occurred when validating the form input.
        }
    }

}