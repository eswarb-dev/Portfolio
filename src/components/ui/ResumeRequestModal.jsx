import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MailCheck, RefreshCw, Send, X } from "lucide-react";
import { statsApiUrl } from "../../lib/statsApi";
import { getPortfolioVisitorId } from "../../lib/visitorId";
import { Badge, BrutalButton, BrutalCard } from "./Brutal";

const initialForm = {
  name: "",
  email: "",
  reason: "",
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const ResumeRequestModal = ({ open, onClose }) => {
  const MotionDiv = motion.div;
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setServerError("");
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitRequest = async (event) => {
    event.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setStatus("loading");
    try {
      const response = await fetch(statsApiUrl("/api/request-resume"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          reason: form.reason.trim(),
          visitorId: getPortfolioVisitorId(),
          path: `${window.location.pathname}${window.location.hash}`,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to send the request right now.");
      }

      setStatus("success");
      setResumeUrl(data.resumeUrl || "");
    } catch (caughtError) {
      setStatus("idle");
      setServerError(caughtError.message);
    }
  };

  const closeModal = () => {
    setForm(initialForm);
    setErrors({});
    setStatus("idle");
    setServerError("");
    setResumeUrl("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 p-3 sm:p-5"
          onClick={closeModal}
        >
          <MotionDiv
            role="dialog"
            aria-modal="true"
            aria-label="Request Resume"
            initial={{ scale: 0.96, y: 18 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 18 }}
            className="w-full max-w-2xl rounded-2xl border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_#b56cff] sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <Badge variant="purple">Resume Access</Badge>
                <h2 className="mt-3 text-3xl font-black uppercase leading-none">Request Resume</h2>
                <p className="mt-3 max-w-xl text-sm font-bold leading-6 text-[#252525]">
                  Share a little context and I will send the resume link to your inbox. I will only use your email for resume access.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close resume request"
                onClick={closeModal}
                className="rounded-xl border-[3px] border-black bg-[#ff5aa5] p-2 shadow-[3px_3px_0_#050505]"
              >
                <X aria-hidden="true" size={20} strokeWidth={3} />
              </button>
            </div>

            {status === "success" ? (
              <div className="grid gap-4">
                <BrutalCard variant="secondary" className="p-4">
                  <div className="flex items-start gap-3">
                    <MailCheck aria-hidden="true" size={30} strokeWidth={3} />
                    <div>
                      <h3 className="text-2xl font-black uppercase">Request received</h3>
                      <p className="mt-2 text-sm font-bold leading-6">
                        Resume sent to your email.
                      </p>
                    </div>
                  </div>
                </BrutalCard>
                {resumeUrl ? (
                  <BrutalButton as="a" href={resumeUrl} target="_blank" rel="noreferrer" variant="secondary" icon={MailCheck}>
                    Open Resume
                  </BrutalButton>
                ) : null}
                <BrutalButton as="button" type="button" onClick={closeModal} variant="white" icon={X}>
                  Close
                </BrutalButton>
              </div>
            ) : (
              <form onSubmit={submitRequest} className="grid gap-4">
                <label className="grid gap-2 text-sm font-black uppercase">
                  Name
                  <input
                    value={form.name}
                    onChange={updateField("name")}
                    className="min-h-12 rounded-xl border-[3px] border-black bg-[#fffaf0] px-4 text-base font-bold shadow-[3px_3px_0_#050505] outline-none focus:shadow-[1px_1px_0_#050505]"
                    autoComplete="name"
                    required
                  />
                  {errors.name ? <span className="text-xs text-[#b00020]">{errors.name}</span> : null}
                </label>

                <label className="grid gap-2 text-sm font-black uppercase">
                  Email
                  <input
                    value={form.email}
                    onChange={updateField("email")}
                    type="email"
                    className="min-h-12 rounded-xl border-[3px] border-black bg-[#fffaf0] px-4 text-base font-bold shadow-[3px_3px_0_#050505] outline-none focus:shadow-[1px_1px_0_#050505]"
                    autoComplete="email"
                    required
                  />
                  {errors.email ? <span className="text-xs text-[#b00020]">{errors.email}</span> : null}
                </label>

                <label className="grid gap-2 text-sm font-black uppercase">
                  Reason
                  <textarea
                    value={form.reason}
                    onChange={updateField("reason")}
                    rows={4}
                    className="resize-y rounded-xl border-[3px] border-black bg-[#fffaf0] px-4 py-3 text-base font-bold shadow-[3px_3px_0_#050505] outline-none focus:shadow-[1px_1px_0_#050505]"
                  />
                </label>

                {serverError ? (
                  <BrutalCard variant="pink" className="p-3 text-sm font-black uppercase">
                    {serverError}
                  </BrutalCard>
                ) : null}

                <BrutalButton as="button" type="submit" variant="secondary" icon={status === "loading" ? RefreshCw : Send}>
                  {status === "loading" ? "Sending" : "Submit Request"}
                </BrutalButton>
              </form>
            )}
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
};

export default ResumeRequestModal;
