import { useEffect, useRef, useState } from "react";
import { initMockDB } from "../../utils/db";

import styles from "./style.module.css";
const Virtualisation = () => {
  const [state, setState] = useState<any[]>([]);
  const listRef = useRef(null);
  const obserEle = useRef(null);
  let page = 0;

  const db = initMockDB({
    title: "Fundamentals of Frontend System Design",
    body: "Learning to use Intersection Observer",
  });
  const CardElement = ({ title, body }: { title: string; body: string }) => {
    return (
      <article className={styles.card}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardBody}>
          <div className={styles.cardBodyImage}></div>
          <section className={styles.cardBodyContent}>{body}</section>
        </div>
      </article>
    );
  };
  const cb = async ([entry]: any[]) => {
    // entries.forEach(async (entry: any) => {
    if (entry.isIntersecting) {
      console.log("entry: ", entry.isIntersecting);
      const data: any = await db.getPage(page++);
      const newState = [...state, ...data];
      console.log("newState: ", newState);
      setState((k) => [...k, ...data]);
    }
    // });
  };

  useEffect(() => {
    if (obserEle.current) {
      const observer = new IntersectionObserver(cb, { threshold: 0.75 });
      observer.observe(obserEle.current);
    }
  }, []);
  return (
    <>
      <div ref={listRef} id="list">
        {state?.map((datum: any, index: number) => (
          <CardElement
            key={`${datum.title}_${index}`}
            title={datum.title}
            body={datum.body}
          />
        ))}
      </div>
      <div ref={obserEle} className={styles.bottomObserver}>
        Bottom Observer
      </div>
    </>
  );
};

export default Virtualisation;
