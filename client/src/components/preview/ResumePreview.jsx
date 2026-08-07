import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FileUp,
  FileWarning,
  LoaderCircle,
} from "lucide-react";

import ResumeDocument from "./ResumeDocument";
import ResumeToolbar from "./ResumeToolbar";

function ResumePreview({
  file,
  fileName,
  emptyMessage = "Choose an uploaded resume to preview it here.",
}) {
  const downloadUrl = useMemo(() => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }

    return file || "";
  }, [file]);

  useEffect(() => {
    return () => {
      if (file instanceof File && downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [file, downloadUrl]);

  if (!file) {
    return (
      <EmptyPreview
        message={emptyMessage}
      />
    );
  }

  return (
    <PreviewContent
      file={file}
      fileName={fileName}
      downloadUrl={downloadUrl}
    />
  );
}

function PreviewContent({
  file,
  fileName,
  downloadUrl,
}) {
  const [pageNumber, setPageNumber] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(0);

  const [zoom, setZoom] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  if (error) {
    return (
      <ErrorPreview
        message={error}
      />
    );
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-slate-200 bg-slate-100 p-4 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      <ResumeToolbar
        fileName={fileName}
        downloadUrl={downloadUrl}
        pageNumber={pageNumber}
        totalPages={totalPages}
        onPrevious={() =>
          setPageNumber((p) =>
            Math.max(1, p - 1)
          )
        }
        onNext={() =>
          setPageNumber((p) =>
            Math.min(totalPages, p + 1)
          )
        }
        zoom={zoom}
        onZoomIn={() =>
          setZoom((z) =>
            Math.min(2, z + 0.2)
          )
        }
        onZoomOut={() =>
          setZoom((z) =>
            Math.max(0.6, z - 0.2)
          )
        }
      />

      {loading && (
        <LoadingSkeleton />
      )}

      <div
        className={`mt-4 flex min-h-[32rem] justify-center overflow-auto rounded-xl bg-slate-200 p-4 ${
          loading ? "hidden" : ""
        }`}
      >
        <ResumeDocument
          file={file}
          pageNumber={pageNumber}
          zoom={zoom}
          onLoadProgress={() =>
            setLoading(true)
          }
          onLoadSuccess={({
            numPages,
          }) => {
            setTotalPages(numPages);
            setLoading(false);
          }}
          onLoadError={(err) => {
            setError(
              err.message ||
                "Unable to open PDF."
            );
            setLoading(false);
          }}
        />
      </div>
    </motion.section>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex min-h-[28rem] items-center justify-center">
      <LoaderCircle className="mr-3 h-6 w-6 animate-spin text-blue-600" />
      <span className="text-slate-600">
        Loading PDF Preview...
      </span>
    </div>
  );
}

function EmptyPreview({
  message,
}) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-16 text-center">
      <FileUp
        size={56}
        className="mx-auto text-slate-400"
      />

      <h3 className="mt-5 text-xl font-semibold text-slate-900">
        Resume Preview
      </h3>

      <p className="mt-3 text-slate-500">
        {message}
      </p>
    </div>
  );
}

function ErrorPreview({
  message,
}) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-16 text-center">
      <FileWarning
        size={56}
        className="mx-auto text-red-500"
      />

      <h3 className="mt-5 text-xl font-semibold text-red-700">
        Unable to Preview PDF
      </h3>

      <p className="mt-3 text-red-600">
        {message}
      </p>
    </div>
  );
}

export default ResumePreview;