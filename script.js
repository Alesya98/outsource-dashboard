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
const inputs = form.querySelectorAll('input');
const tableBody = document.querySelector(".table-body");


addBtn.addEventListener('click', () => {
    form.classList.add('openForm')
    submitBtn.disabled = true
})

cancelBtn.addEventListener('click', () => {
    form.classList.remove('openForm')
})

const alphabetNum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function validateInput(input) {
    let value = input.value.trim();
    const errorSpan = input.nextElementSibling;
    let isValid = true;
    let message = '';

    if (input.id === 'name') {
        if (value.length <= 3) {
            isValid = false;
            message = 'Минимум 3 символа';
        } else {
            const isValidAll = value
                .split('')
                .every(item => alphabetNum.includes(item))

            if (!isValidAll) {
            isValid = false;
            message = 'Только буквы и цифры'   
            }
           
        }
    }

    if (input.id === "company") {
        if (value.length <= 2) {
          isValid = false;
          message = "Минимум 2 символа";
        } else {
          const isValidAll = value
            .split("")
            .every((item) => alphabetNum.includes(item));

          if (!isValidAll) {
            isValid = false;
            message = "Только буквы и цифры";
          }
        }
    }

    if (input.id === "budget") {
        const num = parseFloat(value)
        if (num < 0 || value === '') {
          isValid = false;
          message = "Введите положительное число";
        } else if(!isNaN(num)) {
            value = `$${num.toFixed(2)}`
        }
    }

    if (input.id === "employee") {
         const num = parseFloat(value)
        if (num < 1 || value === '') {
            isValid = false;
            message = 'Введите число больше 1'
        } else if (num % 1 !== 0) {
            isValid = false;
            message = 'Число не должно быть дробным'
        }
        
    }

     if (!isValid) {
       input.style.borderColor = "red";
     } else {
       input.style.borderColor = "#ccc";
     }
        
    errorSpan.textContent = message;
    return isValid
}

function checkForm() {
    let isFormValid = true;

    inputs.forEach(item => {
        if(!validateInput(item)) isFormValid = false
    })

    submitBtn.disabled = !isFormValid;
}

inputs.forEach(item => {
    item.addEventListener('input', checkForm);
    item.addEventListener('blur', checkForm);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkForm();

    const nameProject = form.querySelector("#name");
    
})
