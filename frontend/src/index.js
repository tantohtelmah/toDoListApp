import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
// import ReactDOM from 'react-dom'
import './styles/index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import AddTask from './pages/tasks';
import AddUser from './pages/users';



// Home link
const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);






// const toggleButton = document.querySelector('.toggle-button');
// const navbarLinks = document.querySelector('.navbar-links');

// // add task button
// document.getElementById('apiButton').addEventListener('click', () => {
//     root.render(<AddTask />);
// });

// // sign in link
// document.getElementById('signIn').addEventListener('click', () => {
//     root.render(<AddUser />);
// });


// // toggleButton.addEventListener('click', () => {
// //     navbarLinks.classList.toggle('active');
// // });

// document.addEventListener('alpine:init', () => {
//   Alpine.data('menu', () => ({
//       open: false,
//       toggle() {
//           this.open = !this.open;
//       }
//   }));
// });

// let lastScrollTop = 0;
// const navbar = document.getElementById('navbar');

// window.addEventListener('scroll', () => {
//     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//     if (scrollTop > lastScrollTop) {
//         // Scroll down
//         navbar.classList.add('hidden-nav');
//     } else {
//         // Scroll up
//         navbar.classList.remove('hidden-nav');
//     }
//     lastScrollTop = scrollTop;
// });

// const root = createRoot(document.getElementById('root'));
// // root.render(<App />);