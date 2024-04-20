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
import { TeddyItemTable } from "@presentation/components/ui/Tables/TeddyItemTable";

export const MainPage = memo(() => {
  const { formatMessage } = useIntl();
  return <Fragment>
      <Seo title="Build a Bear | Feed" />
      <WebsiteLayout>
      <Box sx={{ padding: "0px 2px 00px 2px", justifyItems: "center" }}>
        <ContentCard>
          Teddy items
        </ContentCard>
      </Box>   
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <TeddyItemTable />
        </ContentCard>
      </Box>        
      </WebsiteLayout>
    </Fragment>
});
