export const validateEmail = (value: string) =>
  /^\S+@\S+$/.test(value) ? null : "Invalid email";

export const validatePhone = (value: string) =>
  /^\+?[1-9]\d{1,14}$/.test(value) ? null : "Invalid phone";
