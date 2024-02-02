"use client";
import { getAssessment } from "@/action";
import { useEffect, useState } from "react";

const AnxietyAssessment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://serverfypmh-1-g9416771.deta.app/questions/anxiety")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  console.log(data);
  return <div>{data}</div>;
};

export default AnxietyAssessment;
