import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  PasswordInput,
  Select,
  Checkbox,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Обязательное поле")
    .max(64, "Максимум 64 символа"),
  surName: yup
    .string()
    .required("Обязательное поле")
    .max(64, "Максимум 64 символа"),
  password: yup
    .string()
    .when("isEditMode", {
      is: false,
      then: () => yup.string().required("Обязательное поле"),
    })
    .min(6, "Минимум 6 символов"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
    .when("isEditMode", {
      is: false,
      then: () => yup.string().required("Обязательное поле"),
    }),
  fullName: yup.string().max(130, "Максимум 130 символов"),
  email: yup.string().email("Некорректный email").required("Обязательное поле"),
  birthDate: yup.string(),
  telephone: yup.string().matches(/^\+7\d{10}$/, "Формат: +79991234567"),
  employment: yup.string(),
  userAgreement: yup.boolean(),
});

const initialValues = {
  name: "",
  surName: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  email: "",
};

interface Props {
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
  defaultValues?: any;
}

export const UserForm = ({
  onSubmit,
  isEditMode = false,
  defaultValues,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...initialValues,
      ...defaultValues,
    },
    context: { isEditMode },
  });

  const nameValue = watch("name");
  const surNameValue = watch("surName");

  useEffect(() => {
    if (nameValue && surNameValue) {
      setValue("fullName", `${nameValue} ${surNameValue}`);
    }
  }, [nameValue, surNameValue, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Group grow>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Имя"
                error={`${errors.name?.message || ""}`}
                disabled={isEditMode}
              />
            )}
          />
          <Controller
            name="surName"
            control={control}
            render={({ field }) => {
              console.log(field);
              return (
                <TextInput
                  {...field}
                  value={field.value}
                  label="Фамилия"
                  error={`${errors.surName?.message || ""}`}
                  disabled={isEditMode}
                />
              );
            }}
          />
        </Group>

        {!isEditMode && (
          <Group grow>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  label="Пароль"
                  error={`${errors.password?.message || ""}`}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  label="Подтверждение пароля"
                  error={`${errors.confirmPassword?.message || ""}`}
                />
              )}
            />
          </Group>
        )}

        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Полное имя"
              error={`${errors.fullName?.message || ""}`}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Email"
              error={`${errors.email?.message || ""}`}
              disabled={isEditMode}
            />
          )}
        />

        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              type="date"
              label="Дата рождения"
              error={`${errors.birthDate?.message || ""}`}
            />
          )}
        />

        <Controller
          name="telephone"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="Телефон"
              placeholder="+79991234567"
              error={`${errors.telephone?.message || ""}`}
            />
          )}
        />

        <Controller
          name="employment"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Занятость"
              data={["Работает", "Учится", "Безработный"]}
              placeholder="Выберите занятость"
              comboboxProps={{
                position: "top",
                transitionProps: { transition: "pop", duration: 200 },
                shadow: "md",
              }}
              error={`${errors.employment?.message || ""}`}
            />
          )}
        />

        <Controller
          name="userAgreement"
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              label="Принимаю условия пользовательского соглашения"
              checked={field.value}
              error={`${errors.userAgreement?.message || ""}`}
            />
          )}
        />

        <Button type="submit" mt="md">
          {isEditMode ? "Обновить" : "Создать"}
        </Button>
      </Stack>
    </form>
  );
};
