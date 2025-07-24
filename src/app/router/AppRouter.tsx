import { Navigate, Route, Routes } from "react-router";
import { HomePage } from "@pages/homepage";
import { ROUTES } from "./routes";
import { Layout } from "@pages/layout";
import { LoginPage } from "@pages/login-page";
import { UserCreatePage } from "@pages/user-create-page";
import { UserEditPage } from "@pages/user-edit-page";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />
      <Route path={ROUTES.HOMEPAGE} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.USER_CREATE_PAGE} element={<UserCreatePage />} />
        <Route path={ROUTES.USER_EDIT_PAGE} element={<UserEditPage />} />

        <Route path="*" element={<Navigate to={ROUTES.HOMEPAGE} replace />} />
      </Route>
    </Routes>
  );
};
