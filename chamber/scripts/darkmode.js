const darkModeBtn = document.querySelector('#dark');
const rootElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  rootElement.classList.add('darkmode');
} else {
  rootElement.classList.remove('darkmode');
}


darkModeBtn.addEventListener('click', () => {
  rootElement.classList.toggle('darkmode');
  
  if (rootElement.classList.contains('darkmode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
