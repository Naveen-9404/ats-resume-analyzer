const UploadProgress = ({ isUploading }) => isUploading ? <div className="mt-6 animate-pulse space-y-3"><div className="h-3 w-1/3 rounded-full bg-slate-200" /><div className="h-14 rounded-2xl bg-slate-100" /><div className="h-3 w-4/5 rounded-full bg-slate-200" /></div> : null;
export default UploadProgress;
