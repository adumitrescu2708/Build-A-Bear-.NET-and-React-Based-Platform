import{RegisterVendorFormController, RegisterVendorFormModel} from "./RegisterVendorForm.types"
import { useVendorApi } from "@infrastructure/apis/api-management/vendor";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import {PaymentMethod, VendorContractRenewalTerms} from "@infrastructure/apis/client/models"
import { useAppRouter } from "@infrastructure/hooks/useAppRouter"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { toast } from "react-toastify";

const getDefaultValues = (initialData?: {}) =>
{
    const defaultValues = {
        name: null,
        email: null,
        address: null,
        phoneNumber: null,
        contractStartDate: "" as unknown as Date,
        contractEndDate: "" as unknown as Date,
        paymentMethod: "" as PaymentMethod,
        contractRenewalTerms: "" as VendorContractRenewalTerms
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
}

export const useInitRegisterForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();
    const schema = yup.object().shape({
        name: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.name",
                    }),
                })),
        email: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.email",
                    }),
                })),
        address: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.address",
                    }),
                })),
        phoneNumber: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.phoneNumber",
                    }),
                })),
        paymentMethod: yup.string()
                .oneOf([ // The select input should have one of these values.
                    PaymentMethod.CreditCard,
                    PaymentMethod.BankTransfer,
                    PaymentMethod.PayPal,
                    PaymentMethod.Cheque,
                    PaymentMethod.Cash
                ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.paymentMethod",
                    }),
                })),
        contractRenewalTerms: yup.string()
                .oneOf([ // The select input should have one of these values.
                    VendorContractRenewalTerms.Annual,
                    VendorContractRenewalTerms.Biennial,
                    VendorContractRenewalTerms.OnDemand,
                    VendorContractRenewalTerms.AutoRenew,
                    VendorContractRenewalTerms.Monthly
                ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.contractRenewalTerms",
                    }),
                })),            
        contractStartDate: yup.date()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.contractStartDate",
                    }),
                })),
        contractEndDate: yup.date()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.contractEndDate",
                    }),
                })),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

export const useRegisterVendorFormController = (onSubmit?: () => void) : RegisterVendorFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitRegisterForm();
    const { addVendor: { mutation: addVendor, key: addVendorMutationKey } } = useVendorApi();
    const { redirectToVendor } = useAppRouter();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [addVendorMutationKey], 
        mutationFn: addVendor
    });
    const submit = useCallback((data: RegisterVendorFormModel) => // Create a submit callback to send the form data to the backend.
        add(data).then(() => {
            if (onSubmit) {
                onSubmit();
                redirectToVendor();
                toast(formatMessage({ id: "notifications.messages.vendorAddedSuccess" }));
                
            }
        }).catch(error => {
            toast(formatMessage({ id: "notifications.messages.vendorAddedError" }));
        })
    , [add]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<RegisterVendorFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
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