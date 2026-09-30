export function initializeTheme() {
  let theme = "light";
  try {
    if (localStorage.getItem("portfolio-theme") === "dark") theme = "dark";
  } catch {
    /* A preferência é opcional quando o navegador bloqueia o storage. */
  }
  document.documentElement.dataset.theme = theme;
}

export const themeInitializationScript = `(${initializeTheme.toString()})()`;
