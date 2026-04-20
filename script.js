// меню 'гамбургер'

const closeMenu = document.querySelector(".burger-menu");
const menu = document.querySelector(".sidebar");
const content = document.querySelector('.main')


closeMenu.addEventListener('click', () => {
    menu.classList.toggle("close-sidebar");
    closeMenu.classList.toggle('toggle-btn');
    content.classList.toggle('toggle-content');
})