import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function SlotCounter() {
  const [displayCount, setDisplayCount] = useState(24847);

  const { data } = useQuery({
    queryKey: ["/api/notifications/sent-count"],
    refetchInterval: 30000, // 30 seconds
  });

  useEffect(() => {
    if (data?.totalSent && data.totalSent !== displayCount) {
      // Animate counter to new value
      const startValue = displayCount;
      const endValue = data.totalSent;
      const increment = Math.ceil((endValue - startValue) / 20);
      let current = startValue;

      const updateCounter = setInterval(() => {
        current += increment;
        if (current >= endValue) {
          current = endValue;
          clearInterval(updateCounter);
        }
        setDisplayCount(current);
      }, 50);

      return () => clearInterval(updateCounter);
    }
  }, [data?.totalSent, displayCount]);

  return (
    <span className="text-3xl font-bold text-blue-600">
      {displayCount.toLocaleString()}
    </span>
  );
}
