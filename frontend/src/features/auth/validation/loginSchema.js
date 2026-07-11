import * as Yup from "yup";

const loginSchema = Yup.object({

  username: Yup.string()
    .required("Username is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 characters"),

});

export default loginSchema;