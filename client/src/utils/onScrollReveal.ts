/**
 * @description Reveals element on scroll-up
 *
 * `WARNING:`
 * This will only work if elements are positioned sticky or fixed.
 * This also does not add transition styles.
 * We encourage everyone to only use this for headers
 *
 * @example
 * ```javascript
 * const header = document.getElementById("header")
 * onScrollReveal(header)
 * ```
 *
 */
const onScrollReveal = (elem: HTMLElement) => {
  let prevScrollPos = window.scrollY;

  const onScrollReveal_ = () => {
    const scrollPos = window.scrollY;
    elem.style.top = prevScrollPos > scrollPos ? "0" : "-100%";
    prevScrollPos = scrollPos;
  };

  document.addEventListener("scroll", onScrollReveal_, false);
};

export default onScrollReveal;
