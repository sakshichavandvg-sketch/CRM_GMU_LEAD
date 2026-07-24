"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import useUpdateTelecaller from "@/features/users/hooks/useUpdateTelecaller";
import { useConfirm } from "@/hooks/useConfirm";

const initialForm = {
  slNo: null,
  empId: "",
  username: "",
  password: "",
  name: "",
  phoneNo: "",
  email: "",
  department: "",
  role: "",
  reportingManager: "",
};

export default function EditTelecallerDialog({
  open,
  onClose,
  user,
}) {
  const [form, setForm] = useState(initialForm);

  const {
    mutate,
    isPending,
  } = useUpdateTelecaller(user?.empId, {
    onSuccess: () => {
      onClose();
    },
  });

  useEffect(() => {
    if (user && open) {
      setForm({
        slNo: user.slNo,
        empId: user.empId,
        username: user.username ?? "",
        password: "",
        name: user.name ?? "",
        phoneNo: user.phone ?? "",
        email: user.email ?? "",
        department: user.department ?? "",
        role: user.role ?? "",
        reportingManager: user.reportingManager ?? "",
      });
    } else {
      setForm(initialForm);
    }
  }, [user, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const confirm = useConfirm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = await confirm({
      title: "Save Changes?",
      description: "Are you sure you want to save these changes to the telecaller?",
      confirmText: "Save",
      variant: "primary",
    });

    if (isConfirmed) {
      mutate(form);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Telecaller"
      footer={
        <>
          <Button
            variant="secondary"
            fullWidth={false}
            onClick={onClose}
          >
            Cancel
          </Button>

          <button
            type="submit"
            form="edit-user-form"
            disabled={isPending}
            className="h-[44px] rounded-xl bg-[#6F1D28] px-5 text-white hover:bg-[#5a1620] transition font-medium disabled:opacity-50"
          >
            {isPending ? "Updating..." : "Save Telecaller"}
          </button>
        </>
      }
    >
      <form
        id="edit-user-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <Input
          label="Employee ID"
          name="empId"
          value={form.empId}
          disabled
        />

        <Input
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Phone Number"
          name="phoneNo"
          value={form.phoneNo}
          onChange={handleChange}
          required
        />

        <Input
          label="New Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Leave blank to keep existing password"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
        />

        <Input
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
        />

        <Input
          label="Reporting Manager"
          name="reportingManager"
          value={form.reportingManager}
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
}