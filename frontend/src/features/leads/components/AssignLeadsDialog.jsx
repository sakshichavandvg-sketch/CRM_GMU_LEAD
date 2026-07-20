"use client";

import { useFormik } from "formik";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { assignLeadsSchema } from "../schemas/assignLeadsSchema";
import { useAssignLeads } from "../hooks/useAssignLeads";

export default function AssignLeadsDialog({ open, onClose, enquiryIds, callers = [] }) {
  const { mutate, isPending } = useAssignLeads(() => {
    formik.resetForm();
    onClose();
  });

  const formik = useFormik({
    initialValues: {
      userId: "",
    },
    validationSchema: assignLeadsSchema,
    onSubmit: (values) => {
      mutate({
        userId: values.userId,
        enquiryIds,
      });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const callerOptions = callers.map((c) => ({
    label: c.name,
    value: c.empId,
  }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Assign Leads"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="assign-leads-form"
            loading={isPending}
            loadingText="Assigning..."
          >
            Assign Leads
          </Button>
        </>
      }
    >
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          You are about to assign <span className="font-semibold">{enquiryIds?.length || 0}</span> lead(s) to a caller.
        </p>
      </div>

      <form
        id="assign-leads-form"
        onSubmit={formik.handleSubmit}
        className="space-y-4"
      >
        <Select
          label="Select Caller"
          name="userId"
          options={[{ label: "Select a Caller", value: "" }, ...callerOptions]}
          value={formik.values.userId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userId && formik.errors.userId}
          required
        />
      </form>
    </Modal>
  );
}
