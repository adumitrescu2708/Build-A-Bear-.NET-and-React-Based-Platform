import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    OutlinedInput,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useTeddyItemEditFormController } from "./TeddyItemEditForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { useState } from "react";
import { ContentCard } from "@presentation/components/ui/ContentCard";

export const TeddyItemEditForm = ({ id }) => {
    const { formatMessage } = useIntl();
    const { actions, computed, state } = useTeddyItemEditFormController(id);
    const [open, setOpen] = useState(false); // State for dialog open/close

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmEdit = () => {
        actions.handleSubmit(actions.submit)(); // Call the submit handler
        handleClose();
    };

    return (
        <form onSubmit={handleClickOpen}>
            <Stack spacing={4} style={{ width: "100%" }}>
                <ContentCard title={formatMessage({ id: "globals.editTeddyItem" })}>
                    <Grid container item direction="row" xs={12} columnSpacing={4}>
                        <Grid container item direction="column" xs={6} md={6}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.price)}
                            >
                                <FormLabel>
                                    <FormattedMessage id="globals.price" />
                                </FormLabel>
                                <OutlinedInput
                                    {...actions.register("price")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.price",
                                            }),
                                        })}
                                    autoComplete="none"
                                />
                                <FormHelperText
                                    hidden={isUndefined(state.errors.price)}
                                >
                                    {state.errors.price?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid container item direction="column" xs={6} md={6}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.description)}
                            >
                                <FormLabel>
                                    <FormattedMessage id="globals.description" />
                                </FormLabel>
                                <OutlinedInput
                                    type="description"
                                    {...actions.register("description")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.description",
                                            }),
                                        })}
                                    autoComplete="none"
                                />
                                <FormHelperText
                                    hidden={isUndefined(state.errors.description)}
                                >
                                    {state.errors.description?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid container item direction="column" xs={6} md={6}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.fabric)}
                            >
                                <FormLabel>
                                    <FormattedMessage id="globals.fabric" />
                                </FormLabel>
                                <OutlinedInput
                                    type="fabric"
                                    {...actions.register("fabric")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.fabric",
                                            }),
                                        })}
                                    autoComplete="none"
                                />
                                <FormHelperText
                                    hidden={isUndefined(state.errors.fabric)}
                                >
                                    {state.errors.fabric?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid container item direction="column" xs={6} md={6}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.color)}
                            >
                                <FormLabel>
                                    <FormattedMessage id="globals.color" />
                                </FormLabel>
                                <OutlinedInput
                                    {...actions.register("color")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.color",
                                            }),
                                        })}
                                    autoComplete="none"
                                />
                                <FormHelperText
                                    hidden={isUndefined(state.errors.color)}
                                >
                                    {state.errors.color?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid container item direction="column" xs={6} md={6}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.quantity)}
                            >
                                <FormLabel>
                                    <FormattedMessage id="globals.quantity" />
                                </FormLabel>
                                <OutlinedInput
                                    type="quantity"
                                    {...actions.register("quantity")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.quantity",
                                            }),
                                        })}
                                    autoComplete="none"
                                />
                                <FormHelperText
                                    hidden={isUndefined(state.errors.quantity)}
                                >
                                    {state.errors.quantity?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container item direction="row" xs={12} className="padding-top-sm">
                        <Grid container item direction="column" xs={12} md={7}></Grid>
                        <Grid container item direction="column" xs={5}>
                            <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}>
                                {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                                {computed.isSubmitting && <CircularProgress />}
                            </Button>
                        </Grid>
                    </Grid>
                </ContentCard>
            </Stack>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{formatMessage({ id: "globals.confirmation" })}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {formatMessage({ id: "globals.confirmEdit" })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {formatMessage({ id: "globals.cancel" })}
                    </Button>
                    <Button onClick={handleConfirmEdit} color="primary" autoFocus>
                        {formatMessage({ id: "globals.confirm" })}
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
};
