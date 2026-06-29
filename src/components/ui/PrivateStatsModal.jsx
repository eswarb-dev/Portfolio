import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Mail, RefreshCw, X } from "lucide-react";
import { BrutalButton, BrutalCard, StatBlock } from "./Brutal";
import { statsApiUrl } from "../../lib/statsApi";

const emptyStats = {
  totalVisits: "-",
  uniqueVisitors: "-",
  todayVisits: "-",
  lastUpdated: "-",
  totalResumeRequests: "-",
  latestResumeRequests: [],
};

const formatDate = (value) => {
  if (!value || value === "-") return "-";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const PrivateStatsModal = ({ open, onClose }) => {
  const MotionDiv = motion.div;
  const [token, setToken] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const unlockStats = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(statsApiUrl("/api/admin/stats"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to unlock stats.");
      }

      setStats(data.stats || emptyStats);
      setToken("");
    } catch (caughtError) {
      setStats(null);
      setError(caughtError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setToken("");
    setStats(null);
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-black/70 p-3 py-4 sm:p-5"
          onClick={closeModal}
        >
          <MotionDiv
            role="dialog"
            aria-modal="true"
            aria-label="Private Stats"
            initial={{ scale: 0.96, y: 18 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 18 }}
            className="private-stats-modal flex max-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_#b56cff] sm:max-h-[calc(100dvh-2.5rem)] sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
              <div>
                <p className="inline-flex rounded-full border-[2px] border-black bg-[#39ff14] px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_#050505]">
                  Admin
                </p>
                <h2 className="mt-3 text-3xl font-black uppercase leading-none">Private Stats</h2>
              </div>
              <button
                type="button"
                aria-label="Close private stats"
                onClick={closeModal}
                className="rounded-xl border-[3px] border-black bg-[#ff5aa5] p-2 shadow-[3px_3px_0_#050505]"
              >
                <X aria-hidden="true" size={20} strokeWidth={3} />
              </button>
            </div>

            {!stats ? (
              <form onSubmit={unlockStats} className="grid gap-4 overflow-y-auto pr-1">
                <label className="grid gap-2 text-sm font-black uppercase">
                  Admin Password / Token
                  <input
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                    type="password"
                    autoComplete="current-password"
                    className="min-h-12 rounded-xl border-[3px] border-black bg-[#fffaf0] px-4 text-base font-bold shadow-[3px_3px_0_#050505] outline-none focus:shadow-[1px_1px_0_#050505]"
                    required
                  />
                </label>

                {error ? (
                  <BrutalCard variant="pink" className="p-3 text-sm font-black uppercase">
                    {error}
                  </BrutalCard>
                ) : null}

                <BrutalButton as="button" type="submit" variant="secondary" icon={isLoading ? RefreshCw : Lock}>
                  {isLoading ? "Checking" : "Unlock"}
                </BrutalButton>
              </form>
            ) : (
              <div className="grid min-h-0 gap-4 overflow-y-auto pr-1">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <StatBlock value={stats.totalVisits} label="Total Visits" variant="secondary" className="admin-stat" />
                  <StatBlock value={stats.uniqueVisitors} label="Unique Visitors" variant="white" className="admin-stat" />
                  <StatBlock value={stats.todayVisits} label="Today's Visits" variant="primary" className="admin-stat" />
                  <StatBlock value={formatDate(stats.lastUpdated)} label="Last Updated" variant="purple" className="admin-stat admin-stat--date" />
                </div>
                <div className="grid gap-3 xl:grid-cols-[190px_minmax(0,1fr)]">
                  <StatBlock
                    value={stats.totalResumeRequests ?? 0}
                    label="Resume Requests"
                    variant="pink"
                    className="admin-stat"
                  />
                  <BrutalCard variant="white" className="min-w-0 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Mail aria-hidden="true" size={22} strokeWidth={3} />
                      <h3 className="text-lg font-black uppercase">Latest Resume Requests</h3>
                    </div>
                    {stats.latestResumeRequests?.length ? (
                      <div className="grid max-h-[42dvh] gap-3 overflow-y-auto pr-1">
                        {stats.latestResumeRequests.map((request) => (
                          <article
                            key={request.id}
                            className="rounded-xl border-[2px] border-black bg-[#fffaf0] p-3 text-sm font-bold shadow-[3px_3px_0_#050505]"
                          >
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <h4 className="font-black uppercase">{request.name}</h4>
                              <time className="text-xs font-black uppercase leading-4 text-[#5c25b8]">
                                {formatDate(request.requestedAt)}
                              </time>
                            </div>
                            <p className="mt-1 break-words">{request.email}</p>
                            {request.message ? (
                              <p className="mt-2 leading-5 text-[#333]">{request.message}</p>
                            ) : null}
                          </article>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-black uppercase text-[#333]">No resume requests yet.</p>
                    )}
                  </BrutalCard>
                </div>
                <BrutalButton as="button" type="button" onClick={closeModal} variant="white" icon={X}>
                  Close
                </BrutalButton>
              </div>
            )}
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
};

export default PrivateStatsModal;
