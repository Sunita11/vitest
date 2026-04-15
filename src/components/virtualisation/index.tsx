import { useEffect, useRef, useState, type ReactElement } from "react";
import { initMockDB } from "../../utils/db";

import styles from "./style.module.css";

const SupportedElem = new Set(["/h1", "/h2", "/h3"]);
const getHeading = (node: any): HTMLHeadingElement => {
  let ele = node;
  if (node.textContent.startsWith("/h3")) {
    ele = document.createElement("h3");
  } else if (node.textContent.startsWith("/h2")) {
    ele = document.createElement("h2");
  } else if (node.textContent.startsWith("/h1")) {
    ele = document.createElement("h1");
  }
  ele.textContent = node.textContent.slice(3);
  ele.setAttribute("contenteditable", "true");
  ele.textContent = ele.textContent ? ele.textContent : "Heading!";
  return ele;
};

const Virtualisation = () => {
  const [state, setState] = useState<any[]>([]);
  const listRef = useRef<(HTMLLIElement | null)[]>([]);
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
          <section className={styles.cardBodyContent} contentEditable>
            {body}
          </section>
        </div>
      </article>
    );
  };
  const cb = async ([entry]: any[]) => {
    // entries.forEach(async (entry: any) => {
    if (entry.isIntersecting) {
      const data: any = await db.getPage(page++);
      setState((k) => [...k, ...data]);
    }
    // });
  };

  const cbMutation = (mutationEntries: any[]) => {
    for (let mutation of mutationEntries) {
      let target = mutation.target;
      if (
        mutation.type === "characterData" &&
        SupportedElem.has(target.textContent)
      ) {
        const heading = getHeading(target);
        target.replaceWith(heading);
        heading.focus();
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(cb, { threshold: 0.75 });
    if (obserEle.current) {
      observer.observe(obserEle.current);
    }

    () => {
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const observerM = new MutationObserver(cbMutation);

    if (listRef.current.length) {
      listRef.current.forEach((ele) => {
        ele && observerM.observe(ele, { subtree: true, characterData: true });
      });
    }
    () => {
      observerM.disconnect();
    };
  }, [state.length]);
  return (
    <>
      <div id="list">
        {state?.map((datum: any, index: number) => (
          <li
            key={`${datum.title}_${index}`}
            ref={(ele) => {
              listRef.current.push(ele);
            }}
          >
            <CardElement title={datum.title} body={datum.body} />
          </li>
        ))}
      </div>
      <div ref={obserEle} className={styles.bottomObserver}>
        Bottom Observer
      </div>
    </>
  );
};

export default Virtualisation;
