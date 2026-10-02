import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import AnalyzeButton from "../components/analyze/AnalyzeButton";
import AnalyzeHeader from "../components/analyze/AnalyzeHeader";
import JobDescriptionBox from "../components/analyze/JobDescriptionBox";
import LoadingAnimation from "../components/analyze/LoadingAnimation";
import ResultsSection from "../components/analyze/ResultsSection";
import UploadSection from "../components/analyze/UploadSection";

import { useATS } from "../hooks/useATS";
import { useUpload } from "../hooks/useUpload";

import {
  analyzeResume,
  saveAnalysis,
} from "../services/resumeService";

import { exportPDF } from "../utils/pdf/exportPDF";

function Analyze() {
  const isMember = Boolean(
    localStorage.getItem("token")
  );

  const {
    analysis,
    setAnalysis,
    hasAnalysis,
  } = useATS();

  const [saving, setSaving] =
    useState(false);

  const [showResults, setShowResults] =
    useState(false);

  const upload = useUpload({
    onSuccess: setAnalysis,
    submitAnalysis: analyzeResume,
  });

  /* ------------------------------------------ */
  /* Show results after loading animation ends  */
  /* ------------------------------------------ */

  useEffect(() => {
    if (
      hasAnalysis &&
      !upload.isUploading
    ) {
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 700);

      return () =>
        clearTimeout(timer);
    }

    setShowResults(false);
  }, [
    hasAnalysis,
    upload.isUploading,
  ]);

  /* ------------------------------------------ */
  /* Save Analysis                             */
  /* ------------------------------------------ */

  const save = async () => {
    if (!upload.file) {
      toast.error(
        "No resume available to save."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...analysis,
        jobDescription: upload.jobDescription
      };

      await saveAnalysis(payload);

      toast.success(
        "Analysis saved successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save analysis."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AnalyzeHeader
        isMember={isMember}
      />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        {/* Hero */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[.18em] text-emerald-600">
            Free ATS Analysis
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            See how your resume stacks up.
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Upload your resume and compare it
            against the role you want.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Upload */}

          {!upload.isUploading &&
            !showResults && (
              <motion.div
                key="upload"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8"
              >
                <div className="grid gap-7 md:grid-cols-2">
                  <UploadSection
                    file={upload.file}
                    onFileChange={
                      upload.setFile
                    }
                  />

                  <JobDescriptionBox
                    value={
                      upload.jobDescription
                    }
                    onChange={
                      upload.setJobDescription
                    }
                  />
                </div>

                <AnalyzeButton
                  onClick={
                    upload.upload
                  }
                  loading={
                    upload.isUploading
                  }
                />
              </motion.div>
            )}

          {/* Loader */}

          {upload.isUploading && (
            <motion.div
              key="loader"
              initial={{
                opacity: 0,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
              }}
              transition={{
                duration: 0.4,
              }}
              className="mx-auto mt-10 max-w-3xl"
            >
              <LoadingAnimation />
            </motion.div>
          )}

          {/* Results */}

          {showResults && (
            <motion.div
              key="results"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
              }}
            >
              <ResultsSection
                analysis={analysis}
                isMember={isMember}
                onDownload={() =>
                  exportPDF(analysis)
                }
                onSave={save}
                saving={saving}
                resumeFile={
                  upload.file
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Analyze;