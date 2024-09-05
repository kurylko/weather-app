export const getThemeFromHtml = () =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'
