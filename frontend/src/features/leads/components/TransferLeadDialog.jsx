"use client";

import { useFormik } from "formik";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { transferLeadSchema } from "../schemas/transferLeadSchema";
import { useTransferLead } from "../hooks/useTransferLead";

// Assuming callers are passed as a prop from a shared hook or parent
export default function TransferLeadDialog({ open, onClose, enquiryNo, callers = [] }) {
  const { mutate, isPending } = useTransferLead(() => {
    formik.resetForm();
    onClose();
  });

  const formik = useFormik({
    initialValues: {
      toEmpId: "",
      reason: "",
    },
    validationSchema: transferLeadSchema,
    onSubmit: (values) => {
      mutate({
        enquiryNo,
        toEmpId: values.toEmpId,
        reason: values.reason,
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
      title="Transfer Lead"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="transfer-lead-form"
            loading={isPending}
            loadingText="Transferring..."
          >
            Transfer Lead
          </Button>
        </>
      }
    >
      <form
        id="transfer-lead-form"
        onSubmit={formik.handleSubmit}
        className="space-y-4"
      >
        <Select
          label="Transfer To"
          name="toEmpId"
          options={[{ label: "Select a Caller", value: "" }, ...callerOptions]}
          value={formik.values.toEmpId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.toEmpId && formik.errors.toEmpId}
          required
        />
        
        <Textarea
          label="Transfer Reason"
          name="reason"
          value={formik.values.reason}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.reason && formik.errors.reason}
          required
          rows={3}
          placeholder="Please provide a reason for this transfer..."
        />
      </form>
    </Modal>
  );
}
