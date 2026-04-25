import { saveToLocalStorage } from "./app.js";


// меню 'гамбургер'
const closeMenu = document.querySelector(".burger-menu");
const menu = document.querySelector(".sidebar");
const content = document.querySelector('.main')


closeMenu.addEventListener('click', () => {
    menu.classList.toggle("close-sidebar");
    closeMenu.classList.toggle('toggle-btn');
    content.classList.toggle('toggle-content');
});

// добавить нового работника modal и валидация
const addBtn = document.querySelector('.btn__add');
const form = document.querySelector(".form-hidden");
const cancelBtn = document.querySelector('.form-cancel');
const submitBtn = document.querySelector('.form-add');
const inputs = form.querySelectorAll('input, select');


addBtn.addEventListener('click', () => {
    form.classList.add('openForm')
    submitBtn.disabled = true
})

cancelBtn.addEventListener('click', () => {
    form.classList.remove('openForm')
})

const alphabetNum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

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
            message = 'Только буквы'   
            }
           
        }
    }

    if (input.id === 'surname') {
        if (value.length <= 3) {
            isValid = false;
            message = 'Минимум 3 символа';
        } else {
            const isValidAll = value
                .split('')
                .every(item => alphabetNum.includes(item))

            if (!isValidAll) {
            isValid = false;
            message = 'Только буквы'   
            }
           
        }
    }

    if (input.id === "birth") {
     const birthDate = new Date(value);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    

    if (!value) {
        isValid = false;
        message = "Выберите дату рождения";
    } else if (age < 18) {
        isValid = false;
        message = "Вам должно быть 18 лет или больше";
    }
    }

    if (input.id === "position") {
        if(value === ''){
            isValid = false;
            message = 'Выберите должность из выпадающего списка'
        }
    }

    if (input.id === "salary") {
        const num = parseFloat(value)
        if (num < 0 || value === '') {
          isValid = false;
          message = "Введите положительное число";
        } else if(!isNaN(num)) {
            value = `${num.toFixed(2)} $`
        }
    }

     if (!isValid) {
       input.style.borderColor = "red";
     } else {
       input.style.borderColor = "green";
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

export function addEmployeeToTable(data) {
    const tableBody = document.querySelector('.table-body');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${data.name}</td>
        <td>${data.surname}</td>
        <td>${calculateAge(data.birth)}</td>
        <td>${data.position}</td>
        <td>${data.salary || '-'}</td>
        <td>${data.project || '-'}</td>
        <td>${data.income || '-'}</td>
        <td><button class="btn-delete">Delete</button></td>
    `;

    tableBody.appendChild(row);
}

function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkForm();

    const formData = {
    name: document.getElementById('name').value,
    surname: document.getElementById('surname').value,
    birth: document.getElementById('birth').value,
    position: document.getElementById('position').value,
    salary: document.getElementById('salary').value
};

    saveToLocalStorage(formData);
    addEmployeeToTable(formData);

    form.reset();
    form.classList.remove('openForm')
})
