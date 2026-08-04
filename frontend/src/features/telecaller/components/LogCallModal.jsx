"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { useLogInteraction } from "../hooks/useTelecallerInteractions";
import {
  Phone,
  Clock,
  FileText,
  CalendarClock,
  Paperclip,
  Mic,
  Flame,
  Sun,
  Snowflake,
} from "lucide-react";

const CALL_OUTCOMES = [
  { value: "CONNECTED", label: "Connected" },
  { value: "BUSY", label: "Busy" },
  { value: "REJECTED", label: "Rejected" },
  { value: "WRONG_NUMBER", label: "Wrong No." },
  { value: "NO_RESPONSE", label: "No Response" },
];

const CALL_OPINIONS = [
  { value: "Interested", label: "Interested", Icon: Flame },
  { value: "Warm", label: "Warm", Icon: Sun },
  { value: "Cold", label: "Cold", Icon: Snowflake },
];

const validationSchema = Yup.object().shape({
  enquiryNo: Yup.number().required("Enquiry No is required"),
  callDurationSeconds: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .min(0, "Duration must be positive"),
  callDirection: Yup.string().required("Direction is required"),
  outcome: Yup.string().required("Outcome is required"),
  opinion: Yup.string().when("outcome", {
    is: "CONNECTED",
    then: () => Yup.string().required("Opinion is required when connected"),
    otherwise: () => Yup.string().notRequired().nullable(),
  }),
  telecallerNotes: Yup.string().required("Notes are required"),
  nextCallDate: Yup.date().nullable(),
  nextAction: Yup.string().nullable(),
});

function ModalHeader({ enquiryNo }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-[20px] bg-[#8F111B]/10 flex items-center justify-center text-[#8F111B]">
        <Phone size={22} />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-slate-900 font-outfit">Log Interaction</h3>
        <p className="text-sm text-slate-500">Lead #{enquiryNo}</p>
      </div>
    </div>
  );
}

function OutcomeSelector({ selected, onSelect, error }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-4">Call Outcome</label>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {CALL_OUTCOMES.map((outcome) => {
          const active = selected === outcome.value;
          return (
            <button
              key={outcome.value}
              type="button"
              onClick={() => onSelect(outcome.value)}
              className={`rounded-[20px] border px-4 py-4 text-left transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-[#8F111B]/30 ${
                active
                  ? "border-[#8F111B] bg-[#FFF2F4] text-[#8F111B] shadow-sm"
                  : "border-[#E8EDF4] bg-white text-slate-700 hover:-translate-y-0.5 hover:shadow-sm"
              }`}
            >
              <span className="block text-sm font-semibold">{outcome.label}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function OpinionSelector({ selected, onSelect, error }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-4">Opinion</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CALL_OPINIONS.map(({ value, label, Icon }) => {
          const active = selected === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              className={`rounded-[20px] border p-5 text-left transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-[#8F111B]/30 ${
                active
                  ? "border-[#8F111B] bg-[#FFF2F4] text-[#8F111B] shadow-sm"
                  : "border-[#E8EDF4] bg-white text-slate-700 hover:-translate-y-0.5 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F8E6E8] text-[#8F111B]">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function NotesSection({ value, onChange, onBlur, error, touched }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
        <FileText size={16} className="text-[#8F111B]" />
        Notes
      </div>
      <div className="relative">
        <Textarea
          name="telecallerNotes"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={touched && error}
          rows={5}
          placeholder="Write important discussion points..."
          className="rounded-[20px] border-[#E8EDF4] bg-white text-slate-900 focus:border-[#8F111B] focus:ring-[#8F111B]/10"
          maxLength={2000}
        />
        <div className="absolute right-4 bottom-4 flex items-center gap-2">
          <button
            type="button"
            className="rounded-full p-2 text-slate-500 transition duration-150 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F111B]/40"
            aria-label="Attach file"
          >
            <Paperclip size={16} />
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-slate-500 transition duration-150 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F111B]/40"
            aria-label="Record note"
          >
            <Mic size={16} />
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{touched && error ? error : ""}</span>
        <span>{value.length}/2000</span>
      </div>
    </div>
  );
}

function ScheduleSection({ values, errors, touched, onChange, onBlur }) {
  return (
    <div className="rounded-[28px] border border-[#E8EDF4] bg-white p-6">
      <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-900">
        <CalendarClock size={18} className="text-[#8F111B]" />
        Schedule Next Follow-up (Optional)
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Follow-up Date"
          name="nextCallDate"
          type="datetime-local"
          value={values.nextCallDate}
          onChange={onChange}
          onBlur={onBlur}
          error={touched.nextCallDate && errors.nextCallDate}
          className="rounded-[20px] border-[#E8EDF4] bg-[#F8F9FC] text-slate-900"
        />
        <Input
          label="Action"
          name="nextAction"
          type="text"
          value={values.nextAction}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. Send brochure"
          error={touched.nextAction && errors.nextAction}
          className="rounded-[20px] border-[#E8EDF4] bg-[#F8F9FC] text-slate-900"
        />
      </div>
    </div>
  );
}

function ModalFooter({ duration, isTimerRunning, onToggleTimer, onCancel, onSave, isLoading }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <div className="flex h-10 items-center gap-2 rounded-2xl border border-[#E8EDF4] bg-[#F8F9FC] px-4">
          <Clock size={16} />
          <span className="font-semibold">{duration}</span>
        </div>
        <button
          type="button"
          onClick={onToggleTimer}
          className="rounded-full border border-[#E8EDF4] bg-white px-4 py-2 text-sm text-[#8F111B] transition duration-150 hover:-translate-y-0.5 hover:bg-[#FFF2F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F111B]/30"
        >
          {isTimerRunning ? "Stop" : "Start"}
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="secondary"
          fullWidth={false}
          onClick={onCancel}
          className="border-[#E8EDF4] bg-white text-[#8F111B] hover:bg-[#F8F6F7]"
        >
          Cancel
        </Button>
        <Button
          type="button"
          fullWidth={false}
          onClick={onSave}
          loading={isLoading}
          className="bg-[#8F111B] hover:bg-[#6F1018] text-white shadow-sm"
        >
          Save Log
        </Button>
      </div>
    </div>
  );
}

export default function LogCallModal({ open, onClose, enquiryNo: initialEnquiryNo }) {
  const { mutateAsync: logInteraction, isPending } = useLogInteraction();
  const [duration, setDuration] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const formik = useFormik({
    initialValues: {
      enquiryNo: initialEnquiryNo || "",
      callDurationSeconds: "",
      callDirection: "OUTBOUND",
      outcome: "CONNECTED",
      opinion: "",
      telecallerNotes: "",
      nextCallDate: "",
      nextAction: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus }) => {
      try {
        const payload = {
          ...values,
          enquiryNo: parseInt(values.enquiryNo, 10),
          callDurationSeconds: values.callDurationSeconds ? parseInt(values.callDurationSeconds, 10) : duration,
        };

        if (!payload.opinion) delete payload.opinion;
        if (!payload.nextCallDate) delete payload.nextCallDate;
        if (!payload.nextAction) delete payload.nextAction;

        await logInteraction(payload);
        onClose();
      } catch (err) {
        setStatus(err?.response?.data?.message || err.message || "Failed to log interaction");
      }
    },
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
      setDuration(0);
      setIsTimerRunning(false);
    } else {
      setIsTimerRunning(true);
    }
  }, [open, formik]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleOutcomeSelect = (value) => {
    formik.setFieldValue("outcome", value);
    if (value !== "CONNECTED") {
      formik.setFieldValue("opinion", "");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={<ModalHeader enquiryNo={initialEnquiryNo} />}
      size="lg"
      className="rounded-[28px] shadow-[0_18px_40px_rgba(38,41,46,0.08)]"
      bodyClassName="px-6 py-6"
      footerClassName="pt-0"
      footer={
        <ModalFooter
          duration={formatDuration(duration)}
          isTimerRunning={isTimerRunning}
          onToggleTimer={() => setIsTimerRunning((prev) => !prev)}
          onCancel={onClose}
          onSave={formik.handleSubmit}
          isLoading={isPending}
        />
      }
    >
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formik.status && (
          <div className="rounded-[20px] border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {formik.status}
          </div>
        )}

        <OutcomeSelector
          selected={formik.values.outcome}
          onSelect={handleOutcomeSelect}
          error={formik.touched.outcome && formik.errors.outcome}
        />

        {formik.values.outcome === "CONNECTED" && (
          <OpinionSelector
            selected={formik.values.opinion}
            onSelect={(value) => formik.setFieldValue("opinion", value)}
            error={formik.touched.opinion && formik.errors.opinion}
          />
        )}

        <NotesSection
          value={formik.values.telecallerNotes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.telecallerNotes}
          touched={formik.touched.telecallerNotes}
        />

        <ScheduleSection
          values={formik.values}
          errors={formik.errors}
          touched={formik.touched}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </form>
    </Modal>
  );
}
