import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type TeddyItemEditFormModel = {
    price?: number;//
    description?: string;//
    fabric?: string;//
    color?: string;//
    quantity?: number;//
};

export type TeddyItemEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<TeddyItemEditFormModel>>;
};

export type TeddyItemEditFormActions = {
    register: UseFormRegister<TeddyItemEditFormModel>;
    watch: UseFormWatch<TeddyItemEditFormModel>;
    handleSubmit: UseFormHandleSubmit<TeddyItemEditFormModel>;
    submit: (body: TeddyItemEditFormModel) => void;
};
export type TeddyItemEditFormComputed = {
    defaultValues: TeddyItemEditFormModel,
    isSubmitting: boolean
};

export type TeddyItemAddFormController = FormController<TeddyItemEditFormState, TeddyItemEditFormActions, TeddyItemEditFormComputed>;