export interface LoginValueType {
  email: string;
  password: string;
}
export interface LoginErrorsType {
  password: null | string;
  email: null | string;
  auth: null | string;
}
export interface LoginFormType {
  loading: boolean;
  errors: LoginErrorsType;
  values: LoginValueType;
}
