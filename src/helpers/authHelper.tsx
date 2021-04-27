export function GetOrgFromStorage() {
  const org = localStorage.getItem("org");
  if (org) return org;
  else return false;
}

export function GetTokenFromStorage() {
  const token = localStorage.getItem("token");
  if (token) return token;
  else return false;
}
