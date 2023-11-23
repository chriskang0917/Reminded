export const cookie = {
  prefix: "reminded_",
  sameSiteAttribute: "; SameSite=Lax",
  setCookie: (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${cookie.prefix}${name}=${value || ""}${expires};path=/${
      cookie.sameSiteAttribute
    }}`;
  },
  getCookie: (name: string) => {
    const cookies = document.cookie.split("; ");
    let result: string = "";

    cookies.forEach((item) => {
      const [cookieName, cookieValue] = item.split("=");
      const prefixedName = `${cookie.prefix}${name}`;
      if (prefixedName === cookieName) result = cookieValue;
    });

    return result;
  },
  deleteCookie: (name: string) => {
    document.cookie = `${cookie.prefix}${name}=; Max-Age=-99999999;`;
  },
};
