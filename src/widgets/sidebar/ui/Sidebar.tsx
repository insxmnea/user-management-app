import { NavLink } from "react-router-dom";
import { Stack, NavLink as MantineNavLink } from "@mantine/core";
import styles from "./Sidebar.module.css";
import { ROUTES } from "@app/router";

export const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <Stack gap="sm">
        <MantineNavLink
          component={NavLink}
          to={ROUTES.HOMEPAGE}
          label="Главная"
        />
        <MantineNavLink
          component={NavLink}
          to={ROUTES.USER_CREATE_PAGE}
          label="Создать пользователя"
        />
      </Stack>
    </nav>
  );
};
