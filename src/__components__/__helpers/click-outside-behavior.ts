/**
 * Allows a custom function to be called when clicking anywhere on the document.
 * Be wary to add `e.stopPropagation` for click events that should not trigger this.
 * 
 * Exmample:
 * 
 * ```jsx
 * <parent>
 *      <child onClick={(e) => e.stopPropagation()}></child>
 * <parent>
 * ```
 * 
 * That way, when clicking on <child>, the custom function wont trigger, but otherwise, it will.
 */
export default function addClickOutsideBehavior(callbackOnClickOut: () => any) {
    const clickToCloseEvent = document.addEventListener('click', () => {
        callbackOnClickOut();
        document.removeEventListener('click', clickToCloseEvent!);
    }, { once: true });
}
