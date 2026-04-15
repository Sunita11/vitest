import { useEffect, useRef } from "react";

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

const MObserver = () => {
  const itemRef = useRef(null);

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
    const observerM = new MutationObserver(cbMutation);
    if (itemRef.current) {
      observerM.observe(itemRef.current, {
        subtree: true,
        characterData: true,
      });
    }
    () => {
      observerM.disconnect();
    };
  }, []);
  return (
    <article ref={itemRef} className={styles.card}>
      <h3 className={styles.cardTitle}>Mutation Oberserver</h3>
      <div className={styles.cardBody}>
        <div className={styles.cardBodyImage}></div>
        <section className={styles.cardBodyContent}>
          <div contentEditable>
            Type here <code>/h2</code>
          </div>
        </section>
      </div>
    </article>
  );
};

export default MObserver;
