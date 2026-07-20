import * as Yup from "yup";

export const transferLeadSchema = Yup.object().shape({
  toEmpId: Yup.string().required("Please select a caller to transfer to"),
  reason: Yup.string()
    .required("Transfer reason is required")
    .min(5, "Reason must be at least 5 characters"),
});
