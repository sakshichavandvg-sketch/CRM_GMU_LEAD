import * as Yup from "yup";

export const createLeadSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(100, "Name must be at most 100 characters"),
  mobileNo: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  email: Yup.string().email("Invalid email format").nullable(),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  taluk: Yup.string().required("Taluk is required"),
  source: Yup.string().nullable(),
  collegeStudied: Yup.string().nullable(),
  programme: Yup.string().nullable(),
  course: Yup.string().nullable(),
  discipline: Yup.string().nullable(),
});
