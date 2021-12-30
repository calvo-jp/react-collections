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
const onScrollReveal = function (element: HTMLElement) {
  var prevScrollPos = window.scrollY;

  const handleScrolling = function () {
    const scrollPos = window.scrollY;
    element.style.top = prevScrollPos > scrollPos ? "0" : "-100%";
    prevScrollPos = scrollPos;
  };

  document.addEventListener("scroll", handleScrolling, false);
};

export default onScrollReveal;
