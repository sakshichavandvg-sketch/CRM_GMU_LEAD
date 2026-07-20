"use client";

import { useFormik } from "formik";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createLeadSchema } from "../schemas/createLeadSchema";
import { useCreateLead } from "../hooks/useCreateLead";

const initialValues = {
  name: "",
  mobileNo: "",
  email: "",
  source: "",
  collegeStudied: "",
  state: "",
  district: "",
  taluk: "",
  programme: "",
  course: "",
  discipline: "",
};

export default function CreateLeadDialog({ open, onClose }) {
  const { mutate, isPending } = useCreateLead(() => {
    formik.resetForm();
    onClose();
  });

  const formik = useFormik({
    initialValues,
    validationSchema: createLeadSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create Lead"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-lead-form"
            loading={isPending}
            loadingText="Creating..."
          >
            Create Lead
          </Button>
        </>
      }
    >
      <form
        id="create-lead-form"
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Input
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          required
        />
        <Input
          label="Mobile Number"
          name="mobileNo"
          value={formik.values.mobileNo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mobileNo && formik.errors.mobileNo}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          label="Source"
          name="source"
          value={formik.values.source}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.source && formik.errors.source}
        />
        <Input
          label="State"
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.state && formik.errors.state}
          required
        />
        <Input
          label="District"
          name="district"
          value={formik.values.district}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.district && formik.errors.district}
          required
        />
        <Input
          label="Taluk"
          name="taluk"
          value={formik.values.taluk}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.taluk && formik.errors.taluk}
          required
        />
        <Input
          label="College Studied"
          name="collegeStudied"
          value={formik.values.collegeStudied}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.collegeStudied && formik.errors.collegeStudied}
        />
        <Input
          label="Programme"
          name="programme"
          value={formik.values.programme}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.programme && formik.errors.programme}
        />
        <Input
          label="Course"
          name="course"
          value={formik.values.course}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.course && formik.errors.course}
        />
        <Input
          label="Discipline"
          name="discipline"
          value={formik.values.discipline}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.discipline && formik.errors.discipline}
        />
      </form>
    </Modal>
  );
}
