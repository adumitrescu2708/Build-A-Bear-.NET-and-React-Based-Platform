import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import {PaymentMethod, VendorContractRenewalTerms} from "@infrastructure/apis/client/models"
import { SelectChangeEvent } from "@mui/material";

export type VendorEditFormModel = {
    contractStartDate?: Date;//
    contractEndDate?: Date;//
    paymentMethod?: PaymentMethod;//
    contractRenewalTerms?: VendorContractRenewalTerms;//
};

export type VendorEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<VendorEditFormModel>>;
};

export type VendorEditFormActions = {
    register: UseFormRegister<VendorEditFormModel>;
    watch: UseFormWatch<VendorEditFormModel>;
    handleSubmit: UseFormHandleSubmit<VendorEditFormModel>;
    submit: (body: VendorEditFormModel) => void;
    selectPaymentMethod: (value: SelectChangeEvent<PaymentMethod>) => void;
    selectContractRenewalTerms: (value: SelectChangeEvent<VendorContractRenewalTerms>) => void;
};
export type VendorEditFormComputed = {
    defaultValues: VendorEditFormModel,
    isSubmitting: boolean
};

export type VendorEditFormController = FormController<VendorEditFormState, VendorEditFormActions, VendorEditFormComputed>;