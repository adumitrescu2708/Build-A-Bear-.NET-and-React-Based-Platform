import{RegisterFormController, RegisterFormModel} from "./RegisterForm.types"
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRegisterApi } from "@infrastructure/apis/api-management/register";
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
        name: null,
        email: null,
        password: null,
        role: "" as UserRoleEnum,
        country: null,
        city: null,
        phoneNumber: null
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
        password: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.password",
                    }),
                })),
        role: yup.string()
                .oneOf([ // The select input should have one of these values.
                    UserRoleEnum.Admin,
                    UserRoleEnum.Operator,
                    UserRoleEnum.Client,
                    UserRoleEnum.Viewer,
                    UserRoleEnum.Vendor
                ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.role",
                    }),
                })),
        country: yup.string()
        .required(formatMessage(
            { id: "globals.validations.requiredField" },
            {
                fieldName: formatMessage({
                    id: "globals.country",
                }),
            })),
        city: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.city",
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
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

export const useRegisterFormController = () : RegisterFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitRegisterForm();
    const { registerMutation: { mutation: registerMutation, key: registerMutationKey } } = useRegisterApi();
    const { redirectToLogin } = useAppRouter();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [registerMutationKey], 
        mutationFn: registerMutation
    })

    const submit = useCallback((data: RegisterFormModel) => {// Create a submit callback to send the form data to the backend.
        add(data).then(() => {
            toast(formatMessage({ id: "notifications.messages.registerSuccess" }));
            redirectToLogin();
        }).catch(error => {
            toast(formatMessage({ id: "notifications.messages.registerError" }));
        });
    }, [add]);
    
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<RegisterFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });


    const selectRole = useCallback((event: SelectChangeEvent<UserRoleEnum>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("role", event.target.value as UserRoleEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectRole
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