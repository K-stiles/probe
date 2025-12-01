import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthRoute } from "./common/routePaths";

const AuthRoute = () => {
  const location = useLocation();
  const {
    data: authData,
    isLoading, //error
  } = useAuth();
  const user = authData?.user;

  const _isAuthRoute = isAuthRoute(location.pathname);

  // Show loading only for non-auth routes and when actually loading
  // if (isLoading && !_isAuthRoute && !error)  return <DashboardSkeleton />;
  if (isLoading && !_isAuthRoute) return <DashboardSkeleton />;


  // If no user (either due to error or not authenticated), show auth pages
  // if (!user || error)  return <Outlet />;
  if (!user) return <Outlet />;

  // If user exists and has workspace, redirect to workspace
  if (user.currentWorkspace?._id) {
    return <Navigate to={`workspace/${user.currentWorkspace._id}`} replace />;
  }

  // If user exists but no workspace, show auth pages (shouldn't happen but safety)
  return <Outlet />;
};

export default AuthRoute;
