import { FormController } from "../FormController";
import { SelectChangeEvent } from "@mui/material";
import {UserRoleEnum} from "@infrastructure/apis/client/models"
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired
} from "react-hook-form";

export type RegisterVendorUserFormModel = {
    name: string;
    email: string;
    password: string;
    role: UserRoleEnum;
    country: string;
    city: string;
    phoneNumber: string;
    vendorEmail : string
};

export type RegisterVendorUserFormState = {
    errors: FieldErrorsImpl<DeepRequired<RegisterVendorUserFormModel>>;
};

export type RegisterVendorUserFormActions = {
    register: UseFormRegister<RegisterVendorUserFormModel>;
    handleSubmit: UseFormHandleSubmit<RegisterVendorUserFormModel>;
    submit: (body: RegisterVendorUserFormModel) => void;
};
export type RegisterVendorUserFormComputed = {
    defaultValues: RegisterVendorUserFormModel,
    isSubmitting: boolean
};

export type RegisterVendorUserFormController = FormController<RegisterVendorUserFormState, RegisterVendorUserFormActions, RegisterVendorUserFormComputed>;