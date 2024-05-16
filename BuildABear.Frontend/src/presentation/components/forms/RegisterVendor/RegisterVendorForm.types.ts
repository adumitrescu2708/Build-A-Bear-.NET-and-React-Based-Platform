import { FormController } from "../FormController";
import { SelectChangeEvent } from "@mui/material";
import {PaymentMethod, VendorContractRenewalTerms} from "@infrastructure/apis/client/models"
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";

export type RegisterVendorFormModel = {
    name: string; //
    email: string; //
    address: string; //
    phoneNumber: string; //
    contractStartDate: Date; //
    contractEndDate: Date; //
    paymentMethod: PaymentMethod;
    contractRenewalTerms: VendorContractRenewalTerms;
};

export type RegisterVendorFormState = {
    errors: FieldErrorsImpl<DeepRequired<RegisterVendorFormModel>>;
};

export type RegisterVendorFormActions = {
    register: UseFormRegister<RegisterVendorFormModel>;
    watch: UseFormWatch<RegisterVendorFormModel>;
    handleSubmit: UseFormHandleSubmit<RegisterVendorFormModel>;
    submit: (body: RegisterVendorFormModel) => void;
    selectPaymentMethod: (value: SelectChangeEvent<PaymentMethod>) => void;
    selectContractRenewalTerms: (value: SelectChangeEvent<VendorContractRenewalTerms>) => void;
};
export type RegisterVendorFormComputed = {
    defaultValues: RegisterVendorFormModel,
    isSubmitting: boolean
};

export type RegisterVendorFormController = FormController<RegisterVendorFormState, RegisterVendorFormActions, RegisterVendorFormComputed>;