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
const onScrollReveal = (function (win, doc) {
  return function (elem: HTMLElement) {
    var prevScrollPos = win.scrollY;

    const handleScrolling = function () {
      const scrollPos = win.scrollY;
      elem.style.top = prevScrollPos > scrollPos ? "0" : "-100%";
      prevScrollPos = scrollPos;
    };

    doc.addEventListener("scroll", handleScrolling, false);
  };
})(window, document);

export default onScrollReveal;
