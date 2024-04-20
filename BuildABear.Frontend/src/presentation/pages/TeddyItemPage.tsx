import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { TeddyItemAddForm } from "@presentation/components/forms/TeddyItem/TeddyItemAddForm";

export const TeddyItemPage = memo(() => {
    return <Fragment>
        <Seo title="Build A Bear Teddy Item | Add" />
        <WebsiteLayout>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <TeddyItemAddForm />
            </Box>
        </WebsiteLayout>
    </Fragment>
});
