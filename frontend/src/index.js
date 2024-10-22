import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import AddTask from './components/tasks';


const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');

document.getElementById('apiButton').addEventListener('click', () => {
    if (AddTask()) {
        alert("Api clicked");
    } else {
        alert("nope we are not there yet")
    } 
});


toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

document.addEventListener('alpine:init', () => {
  Alpine.data('menu', () => ({
      open: false,
      toggle() {
          this.open = !this.open;
      }
  }));
});

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll down
        navbar.classList.add('hidden-nav');
    } else {
        // Scroll up
        navbar.classList.remove('hidden-nav');
    }
    lastScrollTop = scrollTop;
});

ReactDOM.render(<App />, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

