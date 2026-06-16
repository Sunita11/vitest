/**
 * Standard Margin between cards
 * @type {number}
 */
export const MARGIN = 16;

/**
 * Returns top and bottom observer elements
 * @returns {[HTMLElement,HTMLElement]}
 */
export const getObserver = () => [
  document.getElementById("top-observer"),
  document.getElementById("bottom-observer"),
];

/**
 * Returns a virtual list container
 * @returns {HTMLElement}
 */
export const getVirtualList = () => {
  return document.getElementById("virtual-list");
};

/**
 * Returns a main app container
 * @returns {HTMLElement}
 */
export const getContainer = () => {
  return document.getElementById("container");
};

/**
 * Returns `data-y` attribute of the HTMLElement, if value is provided
 * additionally updates the attribute
 *
 * @param element {HTMLElement}
 * @param value {string | number}
 * @returns {?number}
 */
export const y = (element: any, value = undefined) => {
  if (value != null) {
    element?.setAttribute("data-y", value);
  }
  // @ts-ignore
  const y = document?.getAttribute("y");
  if (y !== null && y !== "" && +y === +y) {
    return +y;
  }

  return null;
};

/**
 * Returns a CSS Transform Style string to Move Element by certain amount of pixels
 * @param value      - value in pixels
 * @returns {string}
 */
export const translateY = (val: number) => {
  return `translateY(${val}px)`;
};

type VProps = {
  getPage: <T>(p: number) => Promise<T[]>;
  getTemplate: <T>(datum: number) => HTMLElement;
  updateTemplate: <T>(data: number, element: HTMLElement) => HTMLElement;
  pageSize: number;
};

/**
 * Starter skeleton
 */
export class VirtualList {
  props: VProps;
  root: HTMLDivElement | null;
  /*
   * @param root
   * @param prop{{
   *   getPage: <T>(p:number) => Promise<T[]>,
   *   getTemplate: <T>(datum:number) =>HTMLElement,
   *   updateTemplate: <T>(data:number, element:HTMLElement) => HTMLElement,
   *   pageSize: number
   * }}
   */

  constructor(props: VProps) {
    this.props = { ...props };
    this.root = null;
  }

  /**
   * Returns an HTML Representation of the component, should have the following structure:
   * #container>
   *    #top-observer+
   *    #virtual-list+
   *    #bottom-observer
   * @returns {string}
   */
  toHTML() {
    return `<div id="container">
    <div id="top-observer">Top Observer</div>
    <div id="virtual-list"></div>
    <div id="bottom-observer">Bottom Observer</div>
    </div>`.trim();
  }

  /**
   * @returns void
   */
  #effect() {}

  /**
   * @returns void
   */
  render() {
    if (this.root) {
      this.root.innerHTML = this.toHTML();
      this.#effect();
    }
  }

  /**
   * Handles observer intersection entries
   * @param entries {IntersectionObserverEntry[]}
   */
  #handleIntersectionObserver() {}
  async #handleTopObserver() {}
  async #handleBottomObserver() {}

  /**
   * Function uses `props.getTemplate` to update the html elements
   * using provided data
   *
   * @param elements {HTMLElement[]} - HTML Elements to update
   * @param data {T[]} - Data to use for update
   */
  #updateData() {}

  /**
   * Move elements on the screen using CSS Transform
   *
   * @param direction {"top" | "down" }
   */
  #updateElementPosition(direction: string) {
    const [top, bottom] = getObserver();

    if (direction === "top") {
    } else if (direction === "bottom") {
    }
  }
}
