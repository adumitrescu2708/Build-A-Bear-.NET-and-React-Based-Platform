import { UserRoleEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { TeddyItemCategoryEnum } from "@infrastructure/apis/client/models";

export type TeddyItemAddFormModel = {
    name: string;//
    price: number;//
    description?: string;//
    fabric: string;//
    color: string;//
    quantity: number;//
    category: TeddyItemCategoryEnum;//
    file: File;//
    fileName: string;//
};

export type TeddyItemAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<TeddyItemAddFormModel>>;
};

export type TeddyItemAddFormActions = {
    register: UseFormRegister<TeddyItemAddFormModel>;
    watch: UseFormWatch<TeddyItemAddFormModel>;
    handleSubmit: UseFormHandleSubmit<TeddyItemAddFormModel>;
    submit: (body: TeddyItemAddFormModel) => void;
    selectCategory: (value: SelectChangeEvent<TeddyItemCategoryEnum>) => void;
    selectFile: (file: File) => void;
};
export type TeddyItemAddFormComputed = {
    defaultValues: TeddyItemAddFormModel,
    isSubmitting: boolean
};

export type TeddyItemAddFormController = FormController<TeddyItemAddFormState, TeddyItemAddFormActions, TeddyItemAddFormComputed>;