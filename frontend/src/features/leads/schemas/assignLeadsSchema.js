import * as Yup from "yup";

export const assignLeadsSchema = Yup.object().shape({
  userId: Yup.string().required("Please select a caller to assign leads to"),
});
