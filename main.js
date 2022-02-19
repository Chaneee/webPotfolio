'use strict';

//스크롤 이동 시 navbar 변경
const navbar = document.querySelector('#navbar');
const navbarHight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHight){
    navbar.classList.add('navbar--dark');
  }else{
    navbar.classList.remove('navbar--dark');
  }
});