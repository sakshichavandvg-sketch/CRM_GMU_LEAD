"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { useLogInteraction } from "../hooks/useTelecallerInteractions";
import { Phone, Clock, FileText, CalendarClock } from "lucide-react";

const CALL_OUTCOMES = [
  { value: "CONNECTED", label: "Connected", color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" },
  { value: "BUSY", label: "Busy", color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100" },
  { value: "REJECTED", label: "Rejected", color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100" },
  { value: "WRONG_NUMBER", label: "Wrong Number", color: "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100" },
  { value: "NO_RESPONSE", label: "No Response", color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" }
];

const CALL_OPINIONS = [
  { value: "Interested", label: "Interested", icon: "🔥" },
  { value: "Warm", label: "Warm", icon: "☀️" },
  { value: "Cold", label: "Cold", icon: "❄️" },
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

export default function LogCallModal({ open, onClose, enquiryNo: initialEnquiryNo }) {
  const { mutateAsync: logInteraction, isPending } = useLogInteraction();
  
  // Timer state for duration (just a nice UI addition)
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
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleOutcomeClick = (val) => {
    formik.setFieldValue("outcome", val);
    if (val !== "CONNECTED") {
      formik.setFieldValue("opinion", "");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#7A1F2B]/10 flex items-center justify-center text-[#7A1F2B]">
            <Phone size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Log Interaction</h3>
            <p className="text-sm font-normal text-slate-500">Lead #{initialEnquiryNo}</p>
          </div>
        </div>
      }
      size="lg"
      footer={
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Clock size={16} />
            <span className="w-12">{formatDuration(duration)}</span>
            {isTimerRunning ? (
              <button type="button" onClick={() => setIsTimerRunning(false)} className="text-xs text-blue-600 hover:underline">Stop</button>
            ) : (
              <button type="button" onClick={() => setIsTimerRunning(true)} className="text-xs text-blue-600 hover:underline">Start</button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button onClick={formik.handleSubmit} loading={isPending} className="bg-[#7A1F2B] hover:bg-[#6F1D28] text-white">
              Save Log
            </Button>
          </div>
        </div>
      }
    >
      <form onSubmit={formik.handleSubmit} className="space-y-6 py-2">
        {formik.status && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
            {formik.status}
          </div>
        )}

        {/* Outcome Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Call Outcome</label>
          <div className="flex flex-wrap gap-2">
            {CALL_OUTCOMES.map((out) => {
              const isSelected = formik.values.outcome === out.value;
              return (
                <button
                  key={out.value}
                  type="button"
                  onClick={() => handleOutcomeClick(out.value)}
                  className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                    isSelected 
                      ? out.color.replace('hover:', '').replace('border-', 'border-2 border-') + ' ring-2 ring-offset-1 ring-blue-500/30' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {out.label}
                </button>
              );
            })}
          </div>
          {formik.touched.outcome && formik.errors.outcome && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.outcome}</p>
          )}
        </div>

        {/* Opinion Selector */}
        {formik.values.outcome === "CONNECTED" && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Opinion</label>
            <div className="flex gap-3">
              {CALL_OPINIONS.map((op) => {
                const isSelected = formik.values.opinion === op.value;
                return (
                  <button
                    key={op.value}
                    type="button"
                    onClick={() => formik.setFieldValue("opinion", op.value)}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm font-bold'
                        : 'border-slate-100 bg-white text-slate-500 hover:border-blue-200 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span className="text-lg">{op.icon}</span> {op.label}
                  </button>
                );
              })}
            </div>
            {formik.touched.opinion && formik.errors.opinion && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.opinion}</p>
            )}
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileText size={16} className="text-slate-400" /> Notes
          </label>
          <Textarea
            name="telecallerNotes"
            value={formik.values.telecallerNotes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.telecallerNotes && formik.errors.telecallerNotes}
            rows={3}
            placeholder="What was discussed?"
            className="rounded-xl border-slate-200 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Followup */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <CalendarClock size={16} className="text-slate-400" /> Schedule Next Action (Optional)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="nextCallDate"
              type="datetime-local"
              value={formik.values.nextCallDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nextCallDate && formik.errors.nextCallDate}
              className="bg-white"
            />
            <Input
              name="nextAction"
              type="text"
              value={formik.values.nextAction}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nextAction && formik.errors.nextAction}
              placeholder="e.g. Send prospectus"
              className="bg-white"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
