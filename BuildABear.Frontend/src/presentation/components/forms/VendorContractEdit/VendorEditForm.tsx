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
import { useVendorEditFormController } from "./VendorEditForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { PaymentMethod, VendorContractRenewalTerms } from "@infrastructure/apis/client";

export const VendorEditForm = (id:string| undefined) => {
    // console.log("aici222");
    const { formatMessage } = useIntl();
    const {  actions, computed, state } = useVendorEditFormController(id.id);
    // console.log("aici33");
    return <form onSubmit={actions.handleSubmit(actions.submit)}> 
    <Stack spacing={4} style={{ width: "100%" }}>
        <ContentCard title={formatMessage({ id: "globals.editTeddyItem" })}>
        <Grid container item direction="row" xs={12} columnSpacing={4}>
                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.contractStartDate)}
                    >
                        <FormLabel>
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
                        <FormLabel>
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
                            <FormLabel>
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
                            <FormLabel>
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
            <Grid container item xs={12} justifyContent="center" alignItems="center" className="padding-top-sm">
                        <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}>
                            {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                            {computed.isSubmitting && <CircularProgress />}
                        </Button>
                    </Grid>
        </ContentCard>
    </Stack>
    </form>
}