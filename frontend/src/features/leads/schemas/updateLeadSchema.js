import * as Yup from "yup";
import { createLeadSchema } from "./createLeadSchema";

export const updateLeadSchema = createLeadSchema.shape({
  enquiryNo: Yup.string().required("Enquiry number is required"),
  opinion: Yup.string().nullable(),
  remarks: Yup.string().nullable(),
  status: Yup.string().nullable(),
});
