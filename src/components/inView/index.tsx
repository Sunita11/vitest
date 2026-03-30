import {
  useRef,
  useEffect,
  type FC,
  type ReactElement,
  type ReactNode,
} from "react";

type InViewProps = {
  children: ReactNode;
  elementId: string;
  inViewCallback?: (arg?: any) => void;
};
let observer: any;
const targetInViewCb: { [key: string]: any } = {};

const InView: FC<InViewProps> = (props): ReactElement => {
  const { inViewCallback, elementId, children } = props;
  const ref = useRef(null);
  const idRef = useRef(elementId);

  const handleChange = (entries: any[]) => {
    entries.forEach((entry) => {
      const { isIntersecting, target: elem } = entry;
      if (isIntersecting && targetInViewCb[elem.dataset.id]) {
        targetInViewCb[elem.dataset.id](entry);
      }
    });
  };
  const unobserver = (el: any) => {
    if (el) {
      observer.unobserver(el);
      delete targetInViewCb[el.dataset.id];
      if (Object.keys(targetInViewCb).length === 0) {
        observer.disconnect();
      }
    }
  };

  useEffect(() => {
    if (!observer) {
      const options = {
        root: null,
        rootMargin: "0px",
        scrollMargin: "0px",
        threshold: 1,
      };
      observer = new IntersectionObserver(handleChange, options);
    }
    observer.observe(ref.current);
    targetInViewCb[elementId] = inViewCallback;
    return () => {
      unobserver(ref.current);
    };
  }, []);

  return (
    <div ref={ref} data-id={idRef.current}>
      {children}
    </div>
  );
};

export default InView;
