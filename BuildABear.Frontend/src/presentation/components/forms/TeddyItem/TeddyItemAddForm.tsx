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
import { useTeddyItemAddFormController } from "./TeddyItemAddForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { TeddyItemCategoryEnum } from "@infrastructure/apis/client";
import { UploadButton } from "@presentation/components/ui/UploadButton";
import { ContentCard } from "@presentation/components/ui/ContentCard";
export const TeddyItemAddForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const {  actions, computed, state } = useTeddyItemAddFormController(props.onSubmit);
    
    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
    <Stack spacing={4} style={{ width: "100%" }}>
        <ContentCard title={formatMessage({ id: "globals.addTeddyItem" })}>
            <Grid container item direction="row" xs={12} columnSpacing={4}>
                <Grid container item direction="column" xs={6} md={6} style={{ marginBottom: "1rem" }}>
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
                        error={!isUndefined(state.errors.fileName)}
                    > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                        <FormLabel required>
                            <FormattedMessage id="globals.fileName" />
                        </FormLabel> {/* Add a form label to indicate what the input means. */}
                        <OutlinedInput
                            {...actions.register("fileName")} // Bind the form variable to the UI input.
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.fileName",
                                    }),
                                })}
                            autoComplete="none"
                        /> {/* Add a input like a textbox shown here. */}
                        <FormHelperText
                            hidden={isUndefined(state.errors.fileName)}
                        >
                            {state.errors.fileName?.message}
                        </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                    </FormControl>
                </Grid>

                <Grid container item direction="column" xs={6} md={6}>
                    <FormControl
                        fullWidth
                        error={!isUndefined(state.errors.price)}
                    >
                        <FormLabel required>
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
                        <FormLabel required>
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
                        {/* <Select
                            {...actions.register("color")}
                            value={actions.watch("color")}
                            onChange={actions.selectColor} // Selects may need a listener to for the variable change.
                            displayEmpty
                        ></Select> */}
                        <FormLabel required>
                            <FormattedMessage id="globals.color" />
                        </FormLabel>
                        <OutlinedInput
                            // type="color"
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
                        {/* <OutlinedInput
                            {...actions.register("color")}
                            value={actions.watch("color")}
                            onChange={actions.selectColor}
                            // type="color"
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                {
                                    fieldName: formatMessage({
                                        id: "globals.color",
                                    }),
                                })}
                            autoComplete="none"
                        /> */}
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
                        <FormLabel required>
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

                
                <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.category)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.category" />
                            </FormLabel>
                            <Select
                                {...actions.register("category")}
                                value={actions.watch("category")}
                                onChange={actions.selectCategory} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                    <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.category",
                                            }),
                                        })}
                                    </span>
                                </MenuItem>
                                <MenuItem value={TeddyItemCategoryEnum.Shoes}>
                                    <FormattedMessage id="globals.shoes" />
                                </MenuItem>
                                <MenuItem value={TeddyItemCategoryEnum.Costume}>
                                    <FormattedMessage id="globals.costume" />
                                </MenuItem>
                                <MenuItem value={TeddyItemCategoryEnum.Hoodie}>
                                    <FormattedMessage id="globals.hoodie" />
                                </MenuItem>
                                <MenuItem value={TeddyItemCategoryEnum.TShirt}>
                                    <FormattedMessage id="globals.tshirt" />
                                </MenuItem>
                                <MenuItem value={TeddyItemCategoryEnum.Dress}>
                                    <FormattedMessage id="globals.dress" />
                                </MenuItem>
                                <MenuItem value={TeddyItemCategoryEnum.Pants}>
                                    <FormattedMessage id="globals.pants" />
                                </MenuItem>
                                <MenuItem value={TeddyItemCategoryEnum.Pyjamas}>
                                    <FormattedMessage id="globals.pyjamas" />
                                </MenuItem>   
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.category)}
                            >
                                {state.errors.category?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.file)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.file" />
                            </FormLabel>
                            <UploadButton // You can add inputs via buttons and wrap them into other components to show errors.
                                onUpload={actions.selectFile}
                                isLoading={computed.isSubmitting}
                                disabled={computed.isSubmitting}
                                text={formatMessage({ id: "labels.addUserFile" })}
                                acceptFileType="*/*" />
                            <FormHelperText
                                hidden={isUndefined(state.errors.file)}
                            >
                                {state.errors.file?.message}
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
        </ContentCard>
    </Stack>
</form>
}