import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { RegisterPage } from "@presentation/pages/RegisterPage";
import { RegisterVendorUserPage } from "@presentation/pages/RegisterVendorUserPage";
import { MainPage } from "@presentation/pages/MainPage";
import { TeddyItemPage } from "@presentation/pages/TeddyItemPage";
import { EditTeddyItemPage } from "@presentation/pages/EditTeddyItemPage";
import { RegisterVendorPage } from "@presentation/pages/RegisterVendorPage";
import { FeedbackPage } from "@presentation/pages/FeedbackPage";
import { VendorContractPage } from "@presentation/pages/VendorContractPage";
import { VendorFeedPage } from "@presentation/pages/VendorFeedPage";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      {/* This adds the routes and route mappings on the various components. */}
      <Routes>
        <Route path={AppRoute.Index} element={<HomePage />} /> {/* Add a new route with a element as the page. */}
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Feed} element={<MainPage />} />
        <Route path={AppRoute.TeddyItem} element={<TeddyItemPage />} />
        <Route path={`${AppRoute.UpdateTeddyItem}/:id`} element={<EditTeddyItemPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        <Route path={AppRoute.RegisterVendorUser} element={<RegisterVendorUserPage />} />
        <Route path={AppRoute.RegisterVendor} element={<RegisterVendorPage />} />
        <Route path={AppRoute.Feedback} element={<FeedbackPage />} />
        <Route path={AppRoute.Vendor} element={<VendorFeedPage />} />
        <Route path={`${AppRoute.VendorContract}/:id`} element={<VendorContractPage />} />
        
        {/* <Route path={AppRoute.UpdateTeddyItem} element={<EditTeddyItemPage />} /> */}
        {/* {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} If the user doesn't have the right role this route shouldn't be used. */}
      </Routes>
    </AppIntlProvider>
}
