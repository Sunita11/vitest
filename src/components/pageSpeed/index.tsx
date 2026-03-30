import { useEffect, useState } from "react";

const PageSpeed = () => {
  const [loadTime, setLoadTime] = useState(0);
  let responseStartTime: number;
  let responseEndTime: number;
  const file =
    "https://rukminim2.flixcart.com/fk-p-flap/1960/1960/image/0d9296346e8ec6b5.jpg?q=20";

  const fileSize = 1000 * 1024 * 1024; // 1000 MB

  useEffect(() => {
    responseStartTime = Date.now();
    const getData = async () => {
      const resp = await fetch(file);
      //   const resp2 = await resp.json();
      console.log("resp: ", resp);
      responseEndTime = Date.now();

      const loadTimeV = responseEndTime - responseStartTime;
      setLoadTime(Math.floor(loadTimeV));
    };

    getData();
  }, []);

  console.log("loadTime: ", loadTime);
  return <div>Upload Speed: {loadTime / fileSize}</div>; // mbps
};

export default PageSpeed;
