import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../model/auth-store";
import { ROUTES } from "@app/router";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user && location.pathname !== "/login") {
      navigate(ROUTES.LOGIN_PAGE);
    } else if (user && location.pathname === "/login") {
      navigate(ROUTES.HOMEPAGE);
    }
  }, [user, navigate, location]);

  return <>{children}</>;
};
