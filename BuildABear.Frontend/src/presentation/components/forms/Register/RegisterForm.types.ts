import { FormController } from "../FormController";
import { SelectChangeEvent } from "@mui/material";
import {UserRoleEnum} from "@infrastructure/apis/client/models"
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired
} from "react-hook-form";

export type RegisterFormModel = {
    name: string;
    email: string;
    password: string;
    role: UserRoleEnum;
    country: string;
    city: string;
    phoneNumber: string;
};

export type RegisterFormState = {
    errors: FieldErrorsImpl<DeepRequired<RegisterFormModel>>;
};

export type RegisterFormActions = {
    register: UseFormRegister<RegisterFormModel>;
    handleSubmit: UseFormHandleSubmit<RegisterFormModel>;
    submit: (body: RegisterFormModel) => void;
    selectCategory: (value: SelectChangeEvent<UserRoleEnum>) => void;
};
export type RegisterFormComputed = {
    defaultValues: RegisterFormModel,
    isSubmitting: boolean
};

export type RegisterFormController = FormController<RegisterFormState, RegisterFormActions, RegisterFormComputed>;