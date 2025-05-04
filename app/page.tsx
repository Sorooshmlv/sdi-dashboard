"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    fetch("/api/getTemperature")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTemperature(data.result);
        } else {
          console.error("No temperature data found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      {temperature !== null ? (
        <p>Current Temperature: {temperature}°C</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
