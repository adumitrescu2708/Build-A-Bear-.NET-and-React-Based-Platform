import { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import StoreIcon from '@mui/icons-material/Store';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';
import { AppRoute } from 'routes';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '@application/store';
import { Grid } from '@mui/material';
import { resetProfile } from '@application/state-slices';
import { useAppRouter } from '@infrastructure/hooks/useAppRouter';
import { NavbarLanguageSelector } from '@presentation/components/ui/NavbarLanguageSelector/NavbarLanguageSelector';
import { useOwnUserHasRole } from '@infrastructure/hooks/useOwnUser';
import { UserRoleEnum } from '@infrastructure/apis/client';
import styles from "../../assets/styles/styles.module.scss";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import FeedbackIcon from '@mui/icons-material/Feedback';
/**
 * This is the navigation menu that will stay at the top of the page.
 */
export const Navbar = () => {
  const { formatMessage } = useIntl();
  const { loggedIn } = useAppSelector(x => x.profileReducer);
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
  const isVendor = useOwnUserHasRole(UserRoleEnum.Vendor);
  const dispatch = useAppDispatch();
  const { redirectToHome,  redirectToFeed} = useAppRouter();
  const logout = useCallback(() => {
    dispatch(resetProfile());
    redirectToHome();
  }, [dispatch, redirectToHome]);

  return <Box sx={{ flexGrow: 1}}>
    <AppBar sx ={{  background: styles.babBlue }}>
      <Toolbar>
        <Grid
          container
          item
          direction="row"
          xs={12}
          alignItems="center"
          wrap="nowrap"
          columnSpacing={2}
        >
          {/* REGISTER LINK */}
          <Grid container item direction="column" xs={1}>
            { !loggedIn && <Button color="inherit">  {/* If the user is not logged in show a button that redirects to the login page. */}
              <Link style={{ color: 'white', fontSize:'large' }} to={AppRoute.Register}>
                {formatMessage({ id: "globals.register" })}
              </Link>
            </Button>}
          </Grid>


          {/* REGISTER LINK */}
          <Grid container item direction="column" xs={1}>
            { !loggedIn && <Button color="inherit">  {/* If the user is not logged in show a button that redirects to the login page. */}
              <Link style={{ color: 'white', fontSize:'large' }} to={AppRoute.RegisterVendorUser}>
                {formatMessage({ id: "globals.registerVendorUser" })}
              </Link>
            </Button>}
          </Grid>

          {/* WTF */}
          <Grid container item direction="column" xs={1}>
            <Link
              to={AppRoute.Index}> {/* Add a button to redirect to the home page. */}
              <HomeIcon style={{ color: 'white' }} fontSize='large' />
            </Link>
          </Grid>

          <Grid container item direction="column" xs={8}>
            {isAdmin && <Grid // If the user is logged in and it is an admin they can have new menu items shown.
              container
              item
              direction="row"
              xs={12}
              alignItems="center"
              wrap="nowrap"
              columnSpacing={15}
            >

            </Grid>}
          </Grid>

          {/* VENDOR LINK */}
          <Grid container item direction="column" xs={1}>
            {loggedIn && <Grid // If the user is logged in and it is an admin they can have new menu items shown.
              container
              item
              direction="row"
              xs={1}
              alignItems="center"
              wrap="nowrap"
              columnSpacing={15}
            >
              <Grid container item direction="column">
                <Button color="inherit">
                  <Link style={{ color: 'white' }} to={AppRoute.Vendor}>
                    <StoreIcon  style={{ color: 'white' }} fontSize='large' />
                  </Link>
                </Button>
              </Grid>
            </Grid>}
          </Grid>

          <Grid container item direction="column" xs={2}>
            {isVendor && <Grid // Button for adding a teddy item
              container
              item
              direction="row"
              xs={2}
              // alignItems="center"
              wrap="nowrap"
              columnSpacing={20}
            >
                <Button color="inherit">
                  <Link style={{ color: 'white' }} to={AppRoute.TeddyItem}>
                  <AddCircleOutlineIcon  style={{ color: 'white' }} fontSize='large' />
                  </Link>
                </Button>
            </Grid>}
          </Grid>

          <Grid container item direction="column" xs={1}>
            {loggedIn && isAdmin && <Grid // Button for adding a teddy item
              container
              item
              direction="row"
              xs={1}
              // alignItems="center"
              wrap="nowrap"
              columnSpacing={15}
            >
                <Button color="inherit">
                  <Link style={{ color: 'white' }} to={AppRoute.RegisterVendor}>
                  <LibraryAddIcon  style={{ color: 'white' }} fontSize='large' />
                  </Link>
                </Button>
            </Grid>}
          </Grid>


          
          <Grid container item direction="column" xs={1}>
            {loggedIn && <Grid // Button for redirecting to feed page
              container
              item
              direction="row"
              xs={1}
              alignItems="center"
              wrap="nowrap"
              columnSpacing={15}
            >
                <Button color="inherit">
                  <Link to={AppRoute.Feed}>
                    <PetsIcon style={{ color: 'white' }} fontSize='large' />
                  </Link>
                </Button>
            </Grid>}
          </Grid>


          <Grid container item direction="column" xs={1}>
            {loggedIn && <Grid // Button for redirecting to feed page
              container
              item
              direction="row"
              xs={1}
              alignItems="center"
              wrap="nowrap"
              columnSpacing={15}
            >
                <Button color="inherit">
                  <Link to={AppRoute.Feedback}>
                    <FeedbackIcon  style={{ color: 'white' }} fontSize='large' />
                  </Link>
                </Button>
            </Grid>}
          </Grid>




          <Grid container item direction="column" xs={1} color= 'white' fontSize='large'>
            <NavbarLanguageSelector />
          </Grid>
          <Grid container item direction="column" xs={2}>
            {!loggedIn && <Button color="inherit">  {/* If the user is not logged in show a button that redirects to the login page. */}
              <Link style={{ color: 'white', fontSize:'large' }} to={AppRoute.Login}>
                {formatMessage({ id: "globals.login" })}
              </Link>
            </Button>}
            {loggedIn && <Button onClick={logout} color="inherit"> {/* Otherwise show the logout button. */}
              <Grid color= 'white' fontSize='large'>
                {formatMessage({ id: "globals.logout" })}
              </Grid>
            </Button>}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </Box>
}