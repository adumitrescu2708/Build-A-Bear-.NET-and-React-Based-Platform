import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Typography } from "@mui/material";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Container } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import styles from "../assets/styles/styles.module.scss";
import {ContentMediaCard} from "../components/ui/ContentMediaCard/ContentMediaCard"

export const HomePage = memo(() => {
  const { formatMessage } = useIntl();

  return <Fragment>
      <Seo title="Build a Bear | Home" />
      <WebsiteLayout>
        <Container sx={{ padding: "0px 50px 00px 50px", justifyItems: "center"}}>
          <ContentMediaCard title={formatMessage({ id: "globals.welcome" })} imageSrc="src/presentation/assets/img/logo.png" height={200}>
          </ContentMediaCard>
        </Container>
      </WebsiteLayout>
    </Fragment>
});
