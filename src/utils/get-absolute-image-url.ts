import { getBaseURL } from "./get-base-url";

export const getAbsoluteImageUrl = (path: string) => {
  const base = getBaseURL();
  const hasSlash = path.startsWith("/");
  return `${base}${hasSlash ? "" : "/"}${path}`;
};
