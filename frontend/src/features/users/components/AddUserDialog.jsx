"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import useCreateUser from "../useCreateUser";

const initialForm = {
  username: "",
  name: "",
  phoneNo: "",
  college: "",
  programme: "",
  course: "",
  discipline: "",
};

export default function AddUserDialog({
  open,
  onClose,
}) {
  const [form, setForm] = useState(initialForm);

  const [createdUser, setCreatedUser] =
    useState(null);

  const {
    mutate,
    isPending,
  } = useCreateUser({
    onSuccess: (data) => {
      console.log("Created User:", data);

      setCreatedUser(data);
    },
  });

  useEffect(() => {
    if (!open) {
      setForm(initialForm);
      setCreatedUser(null);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(form);
  };

  const handleClose = () => {
    setCreatedUser(null);
    setForm(initialForm);
    onClose();
  };

  if (createdUser) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        title="User Created Successfully"
        footer={
          <Button
            fullWidth={false}
            onClick={handleClose}
          >
            Done
          </Button>
        }
      >
        <div className="space-y-5">

          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-green-700 font-medium">
              The user has been created successfully.
            </p>

            <p className="mt-2 text-sm text-green-600">
              Please share the password with the user.
              It will not be shown again.
            </p>
          </div>

          <div className="space-y-3">

            <div>
              <label className="text-sm text-gray-500">
                Employee ID
              </label>

              <div className="mt-1 rounded-lg border bg-gray-50 p-3">
                {createdUser.empId}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Username
              </label>

              <div className="mt-1 rounded-lg border bg-gray-50 p-3">
                {createdUser.username}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Default Password
              </label>

              <div className="mt-1 rounded-lg border border-yellow-300 bg-yellow-50 p-3 font-semibold tracking-wide">
                {createdUser.defaultPassword}
              </div>
            </div>

          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add User"
      footer={
        <>
          <Button
            variant="secondary"
            fullWidth={false}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="add-user-form"
            fullWidth={false}
            loading={isPending}
            loadingText="Creating..."
          >
            Create User
          </Button>
        </>
      }
    >
      <form
        id="add-user-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Username"
          name="username"
          value={form.username}
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