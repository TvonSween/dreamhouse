// window is global scope - overarching thing we talk to
// doucment - our page - attached to window - DOM. window.document
//import rating from './rate.js';

(function(app){
    'use strict';
    const configurationItems = {};
    const loginItems = {};
    const formData = {};

    app.register = function() {
       enableRegistrationForm();
    };

    app.configure = function() {
       updateConfiguration();
    };

    app.rate = function() {
        capturePropertyData();
    };

    app.loginStartUp = function() {
        login();
    };

    function saveToLocalStorage() {
        const rulesArray = Array.from(configurationItems.configurationList.children);
        const rulesToSave = rulesArray.map(element => {
            return {
                rule: element.innerText,
                isNotRequired: element.classList.contains('remove-list-item')
            };
        });

        localStorage.setItem("configurationList", JSON.stringify(rulesToSave));
     
    }

    function loadFromStorage() {
        const configurationString = localStorage.getItem("configurationList");

        if (configurationString !== null) {
            const items = JSON.parse(configurationString);
            items.forEach(element  => {
                const li = document.getElementById('li');
                li.innerText = element.rule;
                if (element.isNotRequired) {
                    li.classList.add('remove-list-item');
                }
                configurationItems.configurationList.appendChild(li);
            });

        }
    }
    
    function login() {
        const form = document.getElementById('loginForm');
        loginItems.completeLogin = document.getElementById('complete-login');
        loginItems.username = form.querySelector('#username');
        loginItems.submit = form.querySelector('#submit');

        loginItems.submit.addEventListener('click', loginSubmit);
    }

    function loginSubmit(e) {
        e.preventDefault();

        const div = document.getElementById('login-message');
        div.innerHTML = `<p>Welcome ${loginItems.username.value}</p>`;
        loginItems.completeLogin.append(div);
        loginItems.username.value = '';
    }

   function enableRegistrationForm(){
        const registrationForm = document.getElementById('registration-form');
        registrationForm.onsubmit = registrationFormSubmit;
    }

    function registrationFormSubmit(e) {
        e.preventDefault();
        const registrationForm = document.getElementById('registration-form');
        const username = registrationForm.querySelector('#username');
        const email = registrationForm.querySelector('#email');
        const password = registrationForm.querySelector('#password')
    
        const mailto = `mailto:${email.value}?subject=Register From ${username.value}&body=${password.value}`;
        window.open(mailto);
    }   

    function updateConfiguration(){
        const configurationForm = document.getElementById('configuration-form');
        configurationItems.configurationList = document.getElementById('configuration-list');
        configurationItems.ruleInput = configurationForm.querySelector('#ruleInput');
        configurationItems.addButton = configurationForm.querySelector('#addrule');
        configurationItems.saveButton = configurationForm.querySelector('#updateList');

        configurationItems.addButton.addEventListener('click', addConfigurationRule);
        configurationItems.configurationList.addEventListener('click', updateConfigurationRules);
        configurationItems.saveButton.addEventListener('click', completeConfigurationRules);
        loadFromStorage();
    }


    function addConfigurationRule(e) {
       e.preventDefault();

        const li = document.createElement('li');
        li.innerText = configurationItems.ruleInput.value;
        configurationItems.configurationList.appendChild(li);
        configurationItems.ruleInput.value = '';
        saveToLocalStorage();
    }

    function updateConfigurationRules(e){
        if (e.target.classList.contains('remove-list-item')) {
            e.target.classList.remove('remove-list-item');
        } else {
            e.target.classList.add('remove-list-item');
        }

        saveToLocalStorage();
    }

    function completeConfigurationRules(e){
        e.preventDefault();
        const rulesArray = Array.from(configurationItems.configurationList.children);
       
        rulesArray.forEach(element => {
            if (element.classList.contains('remove-list-item')) {
                configurationItems.configurationList.removeChild(element);
            }
        });

        saveToLocalStorage();
    }

    function capturePropertyData() {
        const propertyForm = document.getElementById('rateForm');

        formData = {
            propertyList: document.getElementById('property-list'),
            property: document.getElementById('property').value,
            bedrooms: document.getElementById('bedrooms').value,
            bathroom: document.getElementById('bathroom').value,
            kitchen: document.getElementById('kitchen').value,
            living: document.getElementById('living').value,
            garden: document.getElementById('garden').value,
            front: document.getElementById('front').value,
            location: document.getElementById('location').value,
            commute: document.getElementById('commute').value,
            amenities: document.getElementById('amenities').value,
            like: document.getElementById('like').checked,
            pros: document.getElementById('pros').value,
            cons: document.getElementById('cons').value
          };

        formData.submit = propertyForm.querySelector('#submit');

        formData.submit.addEventListener('click', propertyFormSubmit);
    }

  
function propertyFormSubmit(e) {
    e.preventDefault();

    const existingData = JSON.parse(localStorage.getItem("propertyList")) || {};
    existingData.push(formData);
    localStorage.setItem("propertyList", JSON.stringify(existingData));

    alert('Form data saved!');
    form.reset();
    populateTable();
}
     
  
function populateTable() {
    const tableBody = document.getElementById('tbody');
    if (!tableBody) return;
  
    tableBody.innerHTML = ''; 
    const dataList = JSON.parse(localStorage.getItem('propertyList')) || {};
  
    dataList.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${formData.property.value}</td>
          <td>${formData.bedrooms.value}</td>
          <td>${formData.bathroom.value}</td>
        `;
        tableBody.appendChild(row);
    });
 
    }

})(window.app = window.app || {});

