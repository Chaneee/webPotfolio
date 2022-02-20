'use strict';

const allHight = document.documentElement.scrollHeight;
const navbar = document.querySelector('#navbar');
const navbarHight = navbar.getBoundingClientRect().height;
const home = document.querySelector('#home');
const homeHight = home.getBoundingClientRect().height;

// const about = document.querySelector('#about');
// const aboutHight = about.getBoundingClientRect().height;
// const skill = document.querySelector('#skill');
// const skillHight = skill.getBoundingClientRect().height;
// const work = document.querySelector('#work');
// const workHight = work.getBoundingClientRect().height;
// const anything = document.querySelector('#anything');
// const anythingHight = anything.getBoundingClientRect().height;

const arrowUp = document.querySelector('.arrow-up');

document.addEventListener('scroll', () => {

  //스크롤 이동 시 navbar 변경
  if(window.scrollY > navbarHight){
    navbar.classList.add('navbar--dark');
  }else{
    navbar.classList.remove('navbar--dark');
  }

  //스크롤 이동 시 화면 투명도 변경
  home.style.opacity = 1 - (window.scrollY / homeHight);
  // about.style.opacity = (window.scrollY / aboutHight);
  /*skill.style.opacity = (window.scrollY / skillHight)-1;
  work.style.opacity = (window.scrollY / workHight)-1.3;
  anything.style.opacity = (window.scrollY / anythingHight)-2;
*/
  //스크롤 이동 시 화살표 나타나기
  if(window.scrollY >= homeHight){
    arrowUp.classList.add('visible');
  }else{
    arrowUp.classList.remove('visible');
  }
});

//navbar 클릭 시 동작
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if(link == null){
    return;
  }

  const selected = document.querySelector('.navbar__menu__item.selected');
  selected.classList.remove('selected');
  event.target.classList.add('selected');

  navbarMenu.classList.remove('open');

  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({behavior: "smooth"});
  selectNavItem(target);
});

//navbar toggle버튼 동작
const navbarToggle = document.querySelector('.navbar__toggle-btn');
navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

//arrow-up 클릭 시 동작
arrowUp.addEventListener('click', () => {
  home.scrollIntoView({behavior: "smooth"});
});

// Projects
const workBtnContainer = document.querySelector('.work__caregories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');//배열로 받아옴

workBtnContainer.addEventListener('click', (e)=>{
  const filter = e.target.dataset.filter == null ? e.target.parentNode.dataset.filter : e.target.dataset.filter;
  if(filter == null){
    return;
  }
  
  const active = document.querySelector('.category__btn.selected')
  active.classList.remove('selected');
  const target = e.target.nodeName == 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');


  projectContainer.classList.add('ani-out');
  setTimeout(() => {
    var project;
    for(var i = 0; i < projects.length; i++){
      project = projects[i];

      if(filter == '*' || filter == project.dataset.type){
        project.classList.remove('invisible');
      }else{
        project.classList.add('invisible');
      }
    }
    projectContainer.classList.remove('ani-out');
  }, 500);

});

//스크롤 시 메뉴 활성화
const sectionIds = ['#home', '#about', '#skill', '#work', '#anything'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

var selectedNavIndex = 0;
var selectedNavItem = navItems[0];

function selectNavItem(selected){
  selectedNavItem.classList.remove('selected');
  selectedNavItem = selected;
  selectedNavItem.classList.add('selected');
};

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  var entry;
  for(var i = 0; i < entries.length; i++){
    entry = entries[i];
    if(!entry.isIntersecting && entry.intersectionRatio > 0) {//각 섹션 나갈 때
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      
      if(entry.boundingClientRect.y < 0){//스크롤링 아래로 = 페이지 up
        selectedNavIndex = index + 1;
      }else{//반대 = 페이지 down
        selectedNavIndex = index - 1;
      }
    }
  }
};

var section;
const observer = new IntersectionObserver(observerCallback, observerOptions);
for(var i = 0; i < sections.length; i++){
  section = observer.observe(sections[i]);
}

window.addEventListener('scroll', () => {
  if(window.scrollY == 0){
    selectedNavIndex = 0;
  }else if(window.scrollY + window.innerHeight >= document.body.clientHeight){
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});