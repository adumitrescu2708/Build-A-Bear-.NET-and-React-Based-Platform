import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { RegisterVendorUserForm } from "@presentation/components/forms/RegisterVendorUser/RegisterVendorUserForm";

export const RegisterVendorUserPage = memo(() => {
    return <Fragment>
        <Seo title="MobyLab Web App | Register" />
        <WebsiteLayout>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <RegisterVendorUserForm />
            </Box>
        </WebsiteLayout>
    </Fragment>
});
