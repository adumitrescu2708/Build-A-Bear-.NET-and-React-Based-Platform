import { isUndefined } from "lodash";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {PaymentMethod, VendorContractRenewalTerms} from "@infrastructure/apis/client/models"
import {VendorEditFormController, VendorEditFormModel} from "./VendorEditForm.types";
import { useVendorApi } from "@infrastructure/apis/api-management/vendor";
import { VendorContractDTO } from "@infrastructure/apis/client";
import { RequestResponse } from "@infrastructure/apis/client/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
const getDefaultValues = (initialData?: {}) =>
    {
        const defaultValues = {
            contractStartDate: null,//
            contractEndDate: null,//
            paymentMethod: null,//
            contractRenewalTerms: null,//
        };
    
        if (!isUndefined(initialData)) {
            return {
                ...defaultValues,
                ...initialData,
            };
        }
    
        return defaultValues;
}

export const useInitVendorEditForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();
    const schema = yup.object().shape({
        contractStartDate: yup.date().nullable(),
        contractEndDate: yup.date().nullable(),
        paymentMethod: yup.string().oneOf([ // The select input should have one of these values.
            PaymentMethod.CreditCard,
            PaymentMethod.BankTransfer,
            PaymentMethod.PayPal,
            PaymentMethod.Cheque,
            PaymentMethod.Cash
        ]).nullable(),
        contractRenewalTerms: yup.string().oneOf([ // The select input should have one of these values.
            VendorContractRenewalTerms.Annual,
            VendorContractRenewalTerms.Biennial,
            VendorContractRenewalTerms.OnDemand,
            VendorContractRenewalTerms.AutoRenew,
            VendorContractRenewalTerms.Monthly
        ]).nullable(),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

export const useVendorEditFormController = (id: string) : VendorEditFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitVendorEditForm();
    const { updateVendor: { mutation: updateVendor, key: updateVendorMutationKey } } = useVendorApi();
    const { redirectToVendor } = useAppRouter();
    const { mutateAsync: add, status } = useMutation<RequestResponse, Error, { id: string, vendorContractDTO: VendorContractDTO }>({
        mutationKey: [updateVendorMutationKey], 
        mutationFn: ({ id, vendorContractDTO }) => updateVendor(id, vendorContractDTO),
    });

    const submit = useCallback((data: VendorContractDTO) => {
        const requestData = {
            id,
            vendorContractDTO: {
                ...data,
                // Add other fields and ensure they are correctly formatted
            }
        };
    
        // Call mutateAsync with the prepared data
        add(requestData).then(() => {
            toast(formatMessage({ id: "notifications.messages.contractUpdatedSuccess" }));
            redirectToVendor();
        }).catch(error => {
            toast(formatMessage({ id: "notifications.messages.contractUpdatedError" }));
        });
    }, [add, formatMessage, id]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<VendorEditFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectPaymentMethod = useCallback((event: SelectChangeEvent<PaymentMethod>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("paymentMethod", event.target.value as PaymentMethod, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectContractRenewalTerms = useCallback((event: SelectChangeEvent<VendorContractRenewalTerms>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("contractRenewalTerms", event.target.value as VendorContractRenewalTerms, {
            shouldValidate: true,
        });
    }, [setValue]);
    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectPaymentMethod,
            selectContractRenewalTerms
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