import { TOKEN_STORAGE_NAME } from "./constants";

export const validateEmail = (email: string) => {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailFormat) ? true : false;
};

export const setSessionStorageToken = (token: string) => {
  sessionStorage.setItem(TOKEN_STORAGE_NAME, token);
};

export const getSessionStorageToken = () => {
  return sessionStorage.getItem(TOKEN_STORAGE_NAME) || null;
};

export const removeSessionStorageToken = () => {
  sessionStorage.removeItem(TOKEN_STORAGE_NAME);
};
