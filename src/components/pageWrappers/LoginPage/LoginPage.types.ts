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
  values: LoginValueType;
}
