import plugin from "tailwindcss/plugin";

/**
 * disabled:* applies a class if the element is :disabled, aria-disabled=true, or data-disabled=true
 * enabled:* applies a class if the element is NOT :disabled, aria-disabled=true, or data-disabled=true
 * Allows us to handle disabled states in a more consistent way. Especially useful elements that can't receive a "disabled" attribute.
 */
export const betterDisableEnabledVariant = plugin(function ({ addVariant }) {
  // disabled selectors need to be broken into several statements because they're an "OR" selector, if any of them is true, the element is disabled.
  const disabledPseudoSelectors = [
    ":disabled",
    "[aria-disabled=true]",
    "[data-disabled=true]",
  ];
  addVariant(
    "disabled",
    disabledPseudoSelectors.map((selector) => `&${selector}`),
  );
  addVariant(
    "group-disabled",
    disabledPseudoSelectors.map((selector) => `:merge(.group)${selector} &`),
  );
  addVariant(
    "peer-disabled",
    disabledPseudoSelectors.map((selector) => `:merge(.peer)${selector} ~ &`),
  );

  // enabled selector is a long single selector because it's an "AND" selector, only if ALL of the selectors are true, the element is enabled.
  const enabledPseudoSelector =
    ":not([data-disabled=true]):not(:disabled):not([aria-disabled=true])";
  addVariant("enabled", [`&${enabledPseudoSelector}`]);
  addVariant("group-enabled", `:merge(.group)${enabledPseudoSelector} &`);
  addVariant("peer-enabled", `:merge(.peer)${enabledPseudoSelector} ~ &`);
});
