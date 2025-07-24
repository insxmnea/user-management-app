import { useAuth } from "@features/auth";
import { AppShellHeader, Burger, Button, Group } from "@mantine/core";

interface Props {
  opened: boolean;
  toggle: () => void;
}

export const Header = (props: Props) => {
  const { logout } = useAuth();

  return (
    <AppShellHeader px="md">
      <Group justify="space-between" h="100%">
        <Burger
          opened={props.opened}
          onClick={props.toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Управление пользователями</div>
        <Button onClick={logout} variant="outline">
          Выйти
        </Button>
      </Group>
    </AppShellHeader>
  );
};
