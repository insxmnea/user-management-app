import { useParams, useNavigate } from "react-router-dom";
import { api } from "@shared/api";
import { UserForm } from "@widgets/user-form";
import type { UserFormValues } from "@entities/user";
import { ROUTES } from "@app/router";

export const UserEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (values: UserFormValues) => {
    const editedUser = {
      name: values.name,
      password: values.password,
      fullName: values.fullName,
      birthDate: values.birthDate,
      telephone: values.telephone,
      employment: values.employment,
      surName: values.surName,
      userAgreement: values.userAgreement,
    };

    try {
      await api.patch(`/v1/users/${id}`, editedUser);
      navigate(ROUTES.HOMEPAGE);
    } catch (error) {
      console.error("Ошибка обновления пользователя:", error);
    }
  };

  return (
    <div>
      <h1>Редактирование пользователя</h1>
      <UserForm onSubmit={handleSubmit} isEditMode />
    </div>
  );
};
