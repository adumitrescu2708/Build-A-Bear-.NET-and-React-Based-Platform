import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    OutlinedInput,
    MenuItem,
    Select
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useRegisterFormController } from "./RegisterForm.controller";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { isEmpty, isUndefined } from "lodash";
import {UserRoleEnum} from "@infrastructure/apis/client"

/**
 * Here we declare the login form component.
 */
export const RegisterForm = () => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useRegisterFormController(); // Use the controller.

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>

            <ContentCard title={formatMessage({ id: "globals.register" })}>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={12} md={12} style={{ marginBottom: "1rem" }}>
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
                                autoComplete="username"
                            /> {/* Add a input like a textbox shown here. */}
                            <FormHelperText
                                hidden={isUndefined(state.errors.name)}
                            >
                                {state.errors.name?.message}
                            </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={12} md={12}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.email)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.email" />
                            </FormLabel>
                            <OutlinedInput
                                type="email"
                                {...actions.register("email")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.email",
                                        }),
                                    })}
                                autoComplete="current-email"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.email)}
                            >
                                {state.errors.email?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container item direction="column" xs={12} md={12}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.password)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.password" />
                            </FormLabel>
                            <OutlinedInput
                                type="password"
                                {...actions.register("password")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.password",
                                        }),
                                    })}
                                autoComplete="current-password"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.password)}
                            >
                                {state.errors.password?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.role)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.role" />
                            </FormLabel>
                            <Select
                                {...actions.register("role")}
                                value={actions.watch("role")}
                                onChange={actions.selectRole} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                    <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.role",
                                            }),
                                        })}
                                    </span>
                                </MenuItem>
                                <MenuItem value={UserRoleEnum.Admin}>
                                    <FormattedMessage id="globals.admin" />
                                </MenuItem>
                                <MenuItem value={UserRoleEnum.Operator}>
                                    <FormattedMessage id="globals.operator" />
                                </MenuItem>
                                <MenuItem value={UserRoleEnum.Vendor}>
                                    <FormattedMessage id="globals.vendor" />
                                </MenuItem>
                                <MenuItem value={UserRoleEnum.Client}>
                                    <FormattedMessage id="globals.client" />
                                </MenuItem>
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.role)}
                            >
                                {state.errors.role?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container item direction="column" xs={12} md={12}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.country)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.country" />
                            </FormLabel>
                            <OutlinedInput
                                type="country"
                                {...actions.register("country")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.country",
                                        }),
                                    })}
                                autoComplete="current-country"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.country)}
                            >
                                {state.errors.country?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={12} md={12}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.city)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.city" />
                            </FormLabel>
                            <OutlinedInput
                                type="city"
                                {...actions.register("city")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.city",
                                        }),
                                    })}
                                autoComplete="current-city"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.city)}
                            >
                                {state.errors.city?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={12} md={12}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.phoneNumber)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.phoneNumber" />
                            </FormLabel>
                            <OutlinedInput
                                type="phoneNumber"
                                {...actions.register("phoneNumber")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.phoneNumber",
                                        }),
                                    })}
                                autoComplete="current-phoneNumber"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.phoneNumber)}
                            >
                                {state.errors.phoneNumber?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container item xs={12} justifyContent="center" alignItems="center" className="padding-top-sm">
                        <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}>
                            {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                            {computed.isSubmitting && <CircularProgress />}
                        </Button>
                    </Grid>
                </Grid>
            </ContentCard>
        </Stack>
    </form>
};