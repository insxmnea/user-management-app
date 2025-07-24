import { useForm } from "react-hook-form";
import { TextInput, PasswordInput, Button, Card } from "@mantine/core";
import styles from "./LoginPage.module.css";
import { useAuth } from "@features/auth";

type FormValues = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "admin@inno.tech", password: "admin" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...register("email", { required: "Обязательное поле" })}
            error={errors.email?.message}
          />

          <PasswordInput
            label="Password"
            mt="md"
            {...register("password", { required: "Обязательное поле" })}
            error={errors.password?.message}
          />

          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
};
