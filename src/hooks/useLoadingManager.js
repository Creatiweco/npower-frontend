import { useState, useCallback } from "react";

const useLoadingManager = () => {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = useCallback((key, isLoading) => {
    setLoadingStates((prev) => ({ ...prev, [key]: isLoading }));
  }, []);

  const isLoading = Object.values(loadingStates).some((state) => state);

  return { setLoading, isLoading };
};

export default useLoadingManager;
