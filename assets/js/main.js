
const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
} 

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}
const navLink = document.querySelectorAll('.nav_link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    //when a link is clicked, menu is removed
    navMenu.classList.remove("show-menu");
}
navLink.forEach(n=>n.addEventListener('click', linkAction))
const skillsContent = document.getElementsByClassName('skills_content'),
    skillsHeader = document.querySelectorAll('.skills_header');

function toggleSkills() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = "skills_content skills_close";
    }
    if (itemClass === "skills_content skills_close") {
        this.parentNode.className = "skills_content skills_open"; 
    }
}

skillsHeader.forEach((el)=>el.addEventListener('click', toggleSkills))
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)
        
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification_active')
        })

        target.classList.add('qualification_active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification_active')
        })
        tab.classList.add('qualification_active')
    })
}) 

let swiper = new Swiper(".portfolio_container", {
  cssMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
      el: ".swiper-pagination",
      clickable:true
    },
});
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.scrollY
    sections.forEach(curr => {
        const sectionHeight = curr.scrollHeight
        const sectionTop = curr.offsetTop -50;
        sectionId = curr.getAttribute('id')
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
             document
               .querySelector(".nav_menu a[href*=" + sectionId + "]")
               .classList.remove("active-link");
        }
    })
}
window.addEventListener('scroll', scrollActive) 


function scrollTop() {
    const scrollTop = document.getElementById('scroll-up');
    if (this.scrollY >= 560) {
        scrollTop.classList.add('show-scroll')
    } else {
        scrollTop.classList.remove('show-scroll')
    }
}
window.addEventListener("scroll", scrollTop); 