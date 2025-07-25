import { useNavigate } from "react-router-dom";
import { api } from "@shared/api";
import { UserForm } from "@widgets/user-form";
import type { UserFormValues } from "@entities/user";
import { ROUTES } from "@app/router";

export const UserCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: UserFormValues) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      fullName: values.fullName,
      birthDate: values.birthDate,
      telephone: values.telephone,
      employment: values.employment,
      surName: values.surName,
      userAgreement: values.userAgreement,
    };

    try {
      await api.post("/v1/users", newUser);
      navigate(ROUTES.HOMEPAGE);
    } catch (error) {
      console.error("Ошибка создания пользователя:", error);
    }
  };

  return (
    <div>
      <h1>Создание пользователя</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
};
