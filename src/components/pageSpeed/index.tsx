/* import { useEffect, useState } from "react";

const PageSpeed = () => {
  const [loadTime, setLoadTime] = useState(0);
  let responseStartTime: number;
  let responseEndTime: number;
  const file =
    "https://rukminim2.flixcart.com/fk-p-flap/1960/1960/image/0d9296346e8ec6b5.jpg?q=20";

  const fileSize = 1000 * 1024 * 1024; // 1000 MB

  useEffect(() => {
    responseStartTime = performance.now();
    const getData = async () => {
      const resp = await fetch(file);
      console.log("resp: ", resp);
      responseEndTime = performance.now();

      const loadTimeV = responseEndTime - responseStartTime;
      setLoadTime(Math.floor(loadTimeV));
    };

    getData();
  }, []);

  console.log("loadTime: ", loadTime);
  return <div>Upload Speed: {loadTime / fileSize}</div>; // mbps
};

export default PageSpeed;
 */

import React, { useState } from "react";

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "24px",
    // textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "12px",
    fontFamily: "Arial, sans-serif",
  },
  speedBox: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: "20px 0",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
const SpeedTest = () => {
  const [speed, setSpeed] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState("Idle");

  const testFileUrl =
    "https://rukminim2.flixcart.com/fk-p-flap/1960/1960/image/0d9296346e8ec6b5.jpg?q=20&t="; // replace with your real file path

  const startTest = async () => {
    setIsTesting(true);
    setSpeed(null);
    setStatus("Testing...");

    const cacheBustedUrl = `${testFileUrl}${Date.now()}`;

    try {
      const startTime = performance.now();

      const response = await fetch(cacheBustedUrl, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch test file");
      }

      const blob = await response.blob();
      const endTime = performance.now();

      const durationInSeconds = (endTime - startTime) / 1000;
      const fileSizeInBytes = blob.size;

      const bitsLoaded = fileSizeInBytes * 8;
      const mbps = bitsLoaded / durationInSeconds / 1_000_000;

      setSpeed(mbps.toFixed(2));
      setStatus("Completed");
    } catch (error) {
      console.error(error);
      setStatus("Failed");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Internet Speed Test</h2>

      <div style={styles.speedBox}>
        {speed ? <span>{speed} Mbps</span> : <span>--</span>}
      </div>

      <p>Status: {status}</p>

      <button onClick={startTest} disabled={isTesting} style={styles.button}>
        {isTesting ? "Testing..." : "Start Speed Test"}
      </button>
    </div>
  );
};

export default SpeedTest;
