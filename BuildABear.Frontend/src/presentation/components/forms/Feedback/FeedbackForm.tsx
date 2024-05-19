import React from 'react';
import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useFeedbackFormController } from "./FeedbackForm.controller";
import { isEmpty } from "lodash";
import { Controller } from 'react-hook-form';

export const FeedbackForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { actions, computed, state } = useFeedbackFormController(props.onSubmit);

    return (
        <form onSubmit={actions.handleSubmit(actions.submit)}>
            <Stack spacing={4} style={{ width: "100%" }}>
                <div>
                    <Grid container item direction="row" xs={12} columnSpacing={4}>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!state.errors.comments}>
                                <FormLabel required>
                                    <FormattedMessage id="globals.comments" />
                                </FormLabel>
                                <textarea
                                    {...actions.register("comments")}
                                    placeholder={actions.watch("comments")}
                                />
                                <FormHelperText>
                                    {state.errors.comments?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!state.errors.feedbackGrade}>
                                <FormLabel required>
                                    <FormattedMessage id="globals.feedbackGrade" />
                                </FormLabel>
                                <Controller
                                    name="feedbackGrade"
                                    control={actions.control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            value={field.value || ''}
                                            onChange={(event) => {
                                                field.onChange(event);
                                                actions.selectGrade(event);
                                            }}
                                        >
                                            <FormControlLabel
                                                value="Poor"
                                                control={<Radio />}
                                                label={<FormattedMessage id="globals.poor" />}
                                            />
                                            <FormControlLabel
                                                value="Average"
                                                control={<Radio />}
                                                label={<FormattedMessage id="globals.average" />}
                                            />
                                            <FormControlLabel
                                                value="Good"
                                                control={<Radio />}
                                                label={<FormattedMessage id="globals.good" />}
                                            />
                                            <FormControlLabel
                                                value="Excellent"
                                                control={<Radio />}
                                                label={<FormattedMessage id="globals.excellent" />}
                                            />
                                            <FormControlLabel
                                                value="VeryPoor"
                                                control={<Radio />}
                                                label={<FormattedMessage id="globals.veryPoor" />}
                                            />
                                        </RadioGroup>
                                    )}
                                />
                                <FormHelperText>
                                    {state.errors.feedbackGrade?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!state.errors.feedbackServiceAction}>
                                <FormLabel required>
                                    <FormattedMessage id="globals.feedbackServiceAction" />
                                </FormLabel>
                                <Controller
                                    name="feedbackServiceAction"
                                    control={actions.control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            value={field.value || ''}
                                            onChange={(event) => {
                                                field.onChange(event);
                                                actions.selectFeedbackServiceAction(event);
                                            }}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>
                                                <span className="text-gray">
                                                    <FormattedMessage id="globals.placeholders.selectInput" values={{
                                                        fieldName: <FormattedMessage id="globals.feedbackServiceAction" />
                                                    }} />
                                                </span>
                                            </MenuItem>
                                            <MenuItem value="BuyTeddy">
                                                <FormattedMessage id="globals.buyTeddy" />
                                            </MenuItem>
                                            <MenuItem value="ReturnTeddy">
                                                <FormattedMessage id="globals.returnTeddy" />
                                            </MenuItem>
                                            <MenuItem value="ShippingTeddy">
                                                <FormattedMessage id="globals.shippingTeddy" />
                                            </MenuItem>
                                            <MenuItem value="Cashback">
                                                <FormattedMessage id="globals.cashback" />
                                            </MenuItem>
                                        </Select>
                                    )}
                                />
                                <FormHelperText>
                                    {state.errors.feedbackServiceAction?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!state.errors.contact}>
                                <Controller
                                    name="contact"
                                    control={actions.control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...field}
                                                    checked={!!field.value}
                                                    onChange={(event) => field.onChange(event.target.checked)}
                                                />
                                            }
                                            label={<FormattedMessage id="globals.contact" />}
                                        />
                                    )}
                                />
                                <FormHelperText>
                                    {state.errors.contact?.message}
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
                </div>
            </Stack>
        </form>
    );
};
