import { FeedbackGrade, FeedbackServiceAction } from "@infrastructure/apis/client";
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

export type FeedbackFormModel = {
    comments: string;//
    feedbackGrade: FeedbackGrade;//
    feedbackServiceAction: FeedbackServiceAction;//
    contact: boolean;//
};

export type FeedbackFormState = {
    errors: FieldErrorsImpl<DeepRequired<FeedbackFormModel>>;
};

export type FeedbackFormActions = {
    register: UseFormRegister<FeedbackFormModel>;
    watch: UseFormWatch<FeedbackFormModel>;
    handleSubmit: UseFormHandleSubmit<FeedbackFormModel>;
    submit: (body: FeedbackFormModel) => void;
    selectGrade: (value: SelectChangeEvent<FeedbackGrade>) => void;
    selectFeedbackServiceAction: (value: SelectChangeEvent<FeedbackServiceAction>) => void;
};
export type FeedbackFormComputed = {
    defaultValues: FeedbackFormModel,
    isSubmitting: boolean
};

export type FeedbackFormController = FormController<FeedbackFormState, FeedbackFormActions, FeedbackFormComputed>;