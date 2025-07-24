import { useNavigate } from "react-router-dom";
import styles from "./UserCreatePage.module.css";
import { api } from "@shared/api";
import { UserForm } from "@widgets/user-form";

export const UserCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await api.post("/v1/users", values);
      navigate("/");
    } catch (error) {
      console.error("Ошибка создания пользователя:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Создание пользователя</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
};
