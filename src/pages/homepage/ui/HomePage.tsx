import { Table, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./HomePage.module.css";
import { useUserStore } from "@entities/user";

export const HomePage = () => {
  const { users, loading, error, fetchUsers, deleteUser } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.id}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.fullName}</Table.Td>
      <Table.Td>
        <Button
          component={Link}
          to={`/user/edit/${user.id}`}
          variant="outline"
          size="xs"
        >
          Редактировать
        </Button>
      </Table.Td>
      <Table.Td>
        <Button
          variant="outline"
          color="red"
          size="xs"
          onClick={() => deleteUser(user.id)}
        >
          Удалить
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={styles.container}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Полное имя</Table.Th>
            <Table.Th colSpan={2}>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};
