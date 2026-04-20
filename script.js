// меню 'гамбургер'
const closeMenu = document.querySelector(".burger-menu");
const menu = document.querySelector(".sidebar");
const content = document.querySelector('.main')


closeMenu.addEventListener('click', () => {
    menu.classList.toggle("close-sidebar");
    closeMenu.classList.toggle('toggle-btn');
    content.classList.toggle('toggle-content');
});

// добавить новый проект modal и валидация
const addBtn = document.querySelector('.btn__add');
const form = document.querySelector(".form-hidden");
const cancelBtn = document.querySelector('.form-cancel');
const submitBtn = document.querySelector('.form-add');
const inputs = form.querySelectorAll('input')

addBtn.addEventListener('click', () => {
    form.classList.add('openForm')
})

cancelBtn.addEventListener('click', () => {
    form.classList.remove('openForm')
})

function validateField (input) {
    const errorSpan = input.nextElementSibling;
    let message = ''

    if (input.validity.valueMissing) {
        message = "Это поле обязательно";
    }


errorSpan.textContext = message;
input.style.borderColor = message ? "#fa0808" : "#ddd";


}

validateField()