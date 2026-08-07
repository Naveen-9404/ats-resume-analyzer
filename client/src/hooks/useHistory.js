import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteResume, getResumeHistory } from "../services/resumeService";

export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const fetchHistory = useCallback(async () => {
    try {
      const res = await getResumeHistory();
      setHistory(res.data.data || res.data);
    } catch (error) { console.log(error); }
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(fetchHistory, 0);
    return () => clearTimeout(timeoutId);
  }, [fetchHistory]);
  const removeHistory = async (id) => {
    try {
      await deleteResume(id);
      setHistory((items) => items.filter((item) => item._id !== id));
      toast.success("Resume analysis deleted.");
    } catch (error) {
      console.log(error);
      toast.error("Could not delete this analysis.");
    }
  };
  return { history, fetchHistory, removeHistory };
};
