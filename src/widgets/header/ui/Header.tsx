import { useAuth } from "@features/auth";
import { AppShellHeader, Burger, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const Header = () => {
  const { logout } = useAuth();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShellHeader px="md">
      <Group justify="space-between" h="100%">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Управление пользователями</div>
        <Button onClick={logout} variant="outline">
          Выйти
        </Button>
      </Group>
    </AppShellHeader>
  );
};
