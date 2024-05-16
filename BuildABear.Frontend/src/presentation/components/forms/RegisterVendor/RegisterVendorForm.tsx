import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    OutlinedInput,
    Select,
    MenuItem
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useRegisterVendorFormController } from "./RegisterVendorForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { PaymentMethod, VendorContractRenewalTerms } from "@infrastructure/apis/client";

/**
 * Here we declare the user add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const RegisterVendorForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { actions, computed, state } = useRegisterVendorFormController(props.onSubmit); // Use the controller.

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <div>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.name)}
                        > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                            <FormLabel required>
                                <FormattedMessage id="globals.name" />
                            </FormLabel> {/* Add a form label to indicate what the input means. */}
                            <OutlinedInput
                                {...actions.register("name")} // Bind the form variable to the UI input.
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.name",
                                        }),
                                    })}
                                autoComplete="none"
                            /> {/* Add a input like a textbox shown here. */}
                            <FormHelperText
                                hidden={isUndefined(state.errors.name)}
                            >
                                {state.errors.name?.message}
                            </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.email)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.email" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("email")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.email",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.email)}
                            >
                                {state.errors.email?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.address)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.address" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("address")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.password",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.address)}
                            >
                                {state.errors.address?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.phoneNumber)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.phoneNumber" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("phoneNumber")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.phoneNumber",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.phoneNumber)}
                            >
                                {state.errors.phoneNumber?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.contractStartDate)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.contractStartDate" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("contractStartDate")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.contractStartDate",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.contractStartDate)}
                            >
                                {state.errors.contractStartDate?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.contractEndDate)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.contractEndDate" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("contractEndDate")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.contractEndDate",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.contractEndDate)}
                            >
                                {state.errors.contractEndDate?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.paymentMethod)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.paymentMethod" />
                            </FormLabel>
                            <Select
                                {...actions.register("paymentMethod")}
                                value={actions.watch("paymentMethod")}
                                onChange={actions.selectPaymentMethod} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                    <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.paymentMethod",
                                            }),
                                        })}
                                    </span>
                                </MenuItem>
                                <MenuItem value={PaymentMethod.CreditCard}>
                                    <FormattedMessage id="globals.creditCard" />
                                </MenuItem>
                                <MenuItem value={PaymentMethod.BankTransfer}>
                                    <FormattedMessage id="globals.bankTransfer" />
                                </MenuItem>
                                <MenuItem value={PaymentMethod.PayPal}>
                                    <FormattedMessage id="globals.paypal" />
                                </MenuItem>
                                <MenuItem value={PaymentMethod.Cheque}>
                                    <FormattedMessage id="globals.cheque" />
                                </MenuItem>
                                <MenuItem value={PaymentMethod.Cash}>
                                    <FormattedMessage id="globals.cash" />
                                </MenuItem>
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.paymentMethod)}
                            >
                                {state.errors.paymentMethod?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.contractRenewalTerms)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.contractRenewalTerms" />
                            </FormLabel>
                            <Select
                                {...actions.register("contractRenewalTerms")}
                                value={actions.watch("contractRenewalTerms")}
                                onChange={actions.selectContractRenewalTerms} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                    <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.contractRenewalTerms",
                                            }),
                                        })}
                                    </span>
                                </MenuItem>
                                <MenuItem value={VendorContractRenewalTerms.Annual}>
                                    <FormattedMessage id="globals.annual" />
                                </MenuItem>
                                <MenuItem value={VendorContractRenewalTerms.Biennial}>
                                    <FormattedMessage id="globals.biennal" />
                                </MenuItem>
                                <MenuItem value={VendorContractRenewalTerms.OnDemand}>
                                    <FormattedMessage id="globals.ondemand" />
                                </MenuItem>
                                <MenuItem value={VendorContractRenewalTerms.AutoRenew}>
                                    <FormattedMessage id="globals.autoRenew" />
                                </MenuItem>
                                <MenuItem value={VendorContractRenewalTerms.Monthly}>
                                    <FormattedMessage id="globals.monthly" />
                                </MenuItem>
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.paymentMethod)}
                            >
                                {state.errors.paymentMethod?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item direction="row" xs={12} className="padding-top-sm">
                    <Grid container item direction="column" xs={12} md={7}></Grid>
                    <Grid container item direction="column" xs={5}>
                        <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}> {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
                            {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                            {computed.isSubmitting && <CircularProgress />}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Stack>
    </form>
};