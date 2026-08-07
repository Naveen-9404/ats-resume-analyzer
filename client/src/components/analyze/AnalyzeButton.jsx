import { Sparkles, Loader2 } from "lucide-react";

const AnalyzeButton = ({
  onClick,
  loading,
}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="
      mt-6
      inline-flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-xl
      bg-slate-950
      px-5
      py-3.5
      font-semibold
      text-white
      transition-all
      duration-300
      hover:scale-[1.01]
      hover:bg-slate-800
      active:scale-[0.99]
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
  >
    {loading ? (
      <>
        <Loader2
          size={18}
          className="animate-spin"
        />
        Analyzing Resume...
      </>
    ) : (
      <>
        <Sparkles size={18} />
        Analyze Resume
      </>
    )}
  </button>
);

export default AnalyzeButton;