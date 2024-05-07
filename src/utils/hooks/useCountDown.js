import { useEffect, useState } from "react";

function useCountdownTimer(days, hrs = 0, mins = 0, sec = 0) {
  const [countdown, setCountdown] = useState(["00", "00", "00", "00", 1]);

  // check if each value is two digits
  function isGreaterThanTen(num) {
    return num > 9 ? num : "0" + num;
  }

  useEffect(() => {
    // calculate values at intervals
    const interval = setInterval(() => {
      const today = new Date(),
        thisYear = today.getFullYear(),
        thisMonth = today.getMonth(),
        thisDate = today.getDate(),
        endDate = new Date(
          thisYear,
          thisMonth,
          thisDate + days,
          hrs,
          mins,
          sec
        );

      const remTime = endDate.getTime() - today.getTime(),
        aSec = 1000,
        aMin = 1000 * 60,
        anHr = 1000 * 60 * 60,
        aDay = 1000 * 60 * 60 * 24,
        remDays = Math.floor(remTime / aDay),
        remHrs = Math.floor((remTime % aDay) / anHr),
        remMin = Math.floor((remTime % anHr) / aMin),
        remSec = Math.floor((remTime % aMin) / aSec);
      if (remTime < 1) {
        clearInterval(interval);
      }
      setCountdown([
        isGreaterThanTen(remDays),
        isGreaterThanTen(remHrs),
        isGreaterThanTen(remMin),
        isGreaterThanTen(remSec),
        remTime,
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return [countdown];
}
export default useCountdownTimer;
