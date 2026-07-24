"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import GeoSelectors from "./GeoSelectors";
import { updateLeadSchema } from "../schemas/updateLeadSchema";
import { useUpdateLead } from "../hooks/useUpdateLead";

export default function EditLeadDialog({ open, onClose, lead }) {
  const { mutate, isPending } = useUpdateLead(() => {
    formik.resetForm();
    onClose();
  });

  const formik = useFormik({
    initialValues: {
      enquiryNo: "",
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
      opinion: "",
      remarks: "",
      status: "",
    },
    validationSchema: updateLeadSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    if (open && lead) {
      formik.setValues({
        enquiryNo: lead.enquiryNo || "",
        name: lead.name || "",
        mobileNo: lead.mobileNo || "",
        email: lead.email || "",
        source: lead.source || "",
        collegeStudied: lead.collegeStudied || "",
        state: lead.state || "",
        district: lead.district || "",
        taluk: lead.taluk || "",
        programme: lead.programme || "",
        course: lead.course || "",
        discipline: lead.discipline || "",
        opinion: lead.opinion || "",
        remarks: lead.remarks || "",
        status: lead.status || "",
      });
    } else {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lead]);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Edit Lead"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-lead-form"
            loading={isPending}
            loadingText="Updating..."
          >
            Update Lead
          </Button>
        </>
      }
    >
      <form
        id="edit-lead-form"
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

        <GeoSelectors formik={formik} required />

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
        <Input
          label="Opinion"
          name="opinion"
          value={formik.values.opinion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.opinion && formik.errors.opinion}
        />
        <Input
          label="Status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.status && formik.errors.status}
        />
        <Input
          label="Remarks"
          name="remarks"
          value={formik.values.remarks}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.remarks && formik.errors.remarks}
          className="sm:col-span-2"
        />
      </form>
    </Modal>
  );
}
