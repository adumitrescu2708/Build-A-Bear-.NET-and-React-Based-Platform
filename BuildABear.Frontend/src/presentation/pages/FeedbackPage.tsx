import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Typography } from "@mui/material";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Container } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import styles from "../assets/styles/styles.module.scss";
import {ContentMediaCard} from "../components/ui/ContentMediaCard/ContentMediaCard"
import { Box } from "@mui/material";
import { FeedbackForm } from "@presentation/components/forms/Feedback/FeedbackForm";

export const FeedbackPage = memo(() => {
  const { formatMessage } = useIntl();

  return <Fragment>
      <Seo title="Build a Bear | Feedback" />
      <WebsiteLayout>
          <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <FeedbackForm />
          </Box>
      </WebsiteLayout>
    </Fragment>
});
