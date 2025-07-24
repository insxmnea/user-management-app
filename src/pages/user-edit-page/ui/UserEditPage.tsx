import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "./UserEditPage.module.css";
import { api } from "@shared/api";
import { UserForm } from "@widgets/user-form";

export const UserEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reset } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await api.get(`/v1/users/${id}`);
        reset(user);
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
      }
    };

    if (id) fetchUser();
  }, [id, reset]);

  const handleSubmit = async (values: any) => {
    try {
      await api.patch(`/v1/users/${id}`, values);
      navigate("/");
    } catch (error) {
      console.error("Ошибка обновления пользователя:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Редактирование пользователя</h1>
      <UserForm onSubmit={handleSubmit} isEditMode />
    </div>
  );
};
