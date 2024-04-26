import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { TeddyItemEditForm } from "@presentation/components/forms/TeddyItemEdit/TeddyItemEditForm";
import { useParams } from 'react-router-dom';

export const EditTeddyItemPage = memo(() => {
    let { id } = useParams();
    return <Fragment>
        <Seo title="Build A Bear Teddy Item | Edit" />
        <WebsiteLayout>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <TeddyItemEditForm id={id}/>
            </Box>
        </WebsiteLayout>
    </Fragment>
});
