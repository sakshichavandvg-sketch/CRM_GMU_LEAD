"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import useUpdateUser from "../useUpdateUser";
import { useConfirm } from "@/hooks/useConfirm";

const initialForm = {
  slNo: null,
  empId: "",
  username: "",
  password: "",
  name: "",
  phoneNo: "",
  college: "",
  programme: "",
  course: "",
  discipline: "",
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
  } = useUpdateUser({
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
        phoneNo: user.phoneNo ?? "",
        college: user.college ?? "",
        programme: user.programme ?? "",
        course: user.course ?? "",
        discipline: user.discipline ?? "",
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
          label="College"
          name="college"
          value={form.college}
          onChange={handleChange}
        />

        <Input
          label="Programme"
          name="programme"
          value={form.programme}
          onChange={handleChange}
        />

        <Input
          label="Course"
          name="course"
          value={form.course}
          onChange={handleChange}
        />

        <Input
          label="Discipline"
          name="discipline"
          value={form.discipline}
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
}