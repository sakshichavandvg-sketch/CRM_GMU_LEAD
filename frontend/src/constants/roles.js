export const ROLES = {
  ADMIN: "ADMIN",
  TELE_CALLER: "TELE-CALLER",
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Administrator",
  [ROLES.TELE_CALLER]: "Tele Caller",
};

export const ROLE_HOME_ROUTES = {
  [ROLES.ADMIN]: "/dashboard",
  [ROLES.TELE_CALLER]: "/telecaller",
};
