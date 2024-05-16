import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { RegisterVendorForm } from "@presentation/components/forms/RegisterVendor/RegisterVendorForm";

export const RegisterVendorPage = memo(() => {
    return <Fragment>
        <Seo title="MobyLab Web App | Register Vendor" />
        <WebsiteLayout>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <RegisterVendorForm />
            </Box>
        </WebsiteLayout>
    </Fragment>
});
