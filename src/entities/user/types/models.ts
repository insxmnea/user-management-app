export interface User {
  id: number;
  name: string;
  surName: string;
  password: string;
  fullName: string;
  email: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}

export interface UserFormValues {
  name: string;
  surName: string;
  fullName?: string;
  password?: string;
  confirmPassword?: string;
  email: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}
