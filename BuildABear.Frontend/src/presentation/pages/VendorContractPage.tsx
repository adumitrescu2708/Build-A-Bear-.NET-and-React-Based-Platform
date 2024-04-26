import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Typography } from "@mui/material";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Container } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import styles from "../assets/styles/styles.module.scss";
import {ContentMediaCard} from "../components/ui/ContentMediaCard/ContentMediaCard"
import { Box } from "@mui/system";
import { VendorTable } from "@presentation/components/ui/Tables/VendorTable";
import { useParams } from 'react-router-dom';


export const VendorContractPage = memo(() => {
    let { id } = useParams();
    const { formatMessage } = useIntl();
    return <Fragment>
        <Seo title="Build a Bear | Vendor Contract" />
        <WebsiteLayout>
        <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <VendorContractTable id={id}/>
            </Box>  
        </WebsiteLayout>
        </Fragment>
});
