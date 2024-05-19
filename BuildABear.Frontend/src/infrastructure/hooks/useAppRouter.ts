import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "routes";
import { useParams } from 'react-router-dom';
/**
 * The object returned can be used to navigate within the application on various routes, use the callbacks for automatic redirects.
 */
export const useAppRouter = () => {
  const navigate = useNavigate();

  const redirectToHome = useCallback(
    () => navigate(AppRoute.Index),
    [navigate]
  );

  const redirectToVendor = useCallback(
    () => navigate(AppRoute.Vendor),
    [navigate]
  );

  const redirectToUsers = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Users
      }),
    [navigate]
  );

  const redirectToFeed = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Feed
      }),
    [navigate]
  );

  const redirectToLogin = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Login
      }),
    [navigate]
  );
  const redirectToUsersFiles = useCallback(
    () =>
      navigate({
        pathname: AppRoute.Users
      }),
    [navigate]
  );

  const redirectToAddTeddyItem = useCallback(
    () => navigate(AppRoute.TeddyItem),
    [navigate]
  );

  const redirectToEditTeddyItem = useCallback(
    (id) => navigate(`${AppRoute.UpdateTeddyItem}/${id}`),
    [navigate]
  );

  const redirectToVendorContractEdit = useCallback(
    (id) => navigate(`${AppRoute.VendorContract}/${id}`),
    [navigate]
  );

  return {
    redirectToHome,
    redirectToUsers,
    redirectToUsersFiles,
    redirectToFeed,
    redirectToAddTeddyItem,
    redirectToEditTeddyItem,
    redirectToVendorContractEdit,
    redirectToLogin,
    redirectToVendor,
    navigate
  };
};
