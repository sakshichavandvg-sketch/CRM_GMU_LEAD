const permissions = {
  ADMIN: {
    dashboard: true,

    leads: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      assign: true,
    },

    counsellors: {
      view: true,
      create: true,
      edit: true,
      delete: true,
    },

    telecalling: true,

    admissions: true,

    reports: true,

    documents: true,

    settings: true,
  },

  COUNSELLOR: {
    dashboard: true,

    leads: {
      view: true,
      create: false,
      edit: true,
      delete: false,
      assign: false,
    },

    counsellors: false,

    telecalling: true,

    admissions: false,

    reports: false,

    documents: true,

    settings: false,
  },
};

export default permissions;