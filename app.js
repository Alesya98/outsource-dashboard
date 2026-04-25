import { addEmployeeToTable } from './employees.js';

export const getCurrentPeriodKey = () => {
    const monthSelect = document.querySelector('#month-select'); 
    const yearSelect = document.querySelector('#year-select');  
    
    const month = monthSelect.selectedIndex + 1; 
    const year = yearSelect.value;
    
    return `${year}.${month}`; 
}

export function saveToLocalStorage(newEmployee) {
    const month = document.querySelector('#month-select').selectedIndex + 1;
    const year = document.querySelector('#year-select').value;
    const key = `${year}.${month}`;
    
    let fullData = JSON.parse(localStorage.getItem('monthlyData')) || {};
    
    if (!fullData[key]) {
        fullData[key] = { employees: [], projects: [] };
    }
    
    fullData[key].employees.push(newEmployee);
    
    localStorage.setItem('monthlyData', JSON.stringify(fullData));
}


function updateTable() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; 

    const key = getCurrentPeriodKey();
    const fullData = JSON.parse(localStorage.getItem('monthlyData')) || {};
    
    if (fullData[key] && fullData[key].employees) {
        fullData[key].employees.forEach(emp => addEmployeeToTable(emp));
    }
}

document.querySelector('#month-select').addEventListener('change', updateTable);
document.querySelector('#year-select').addEventListener('change', updateTable);

updateTable();