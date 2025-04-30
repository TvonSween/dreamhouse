// window is global scope - overarching thing we talk to
// doucment - our page - attached to window - DOM. window.document
import DataTable from 'datatables.net-dt';
import 'datatables.net-responsive-dt';

(function(app){
    'use strict';
    const configurationItems = {};
    //const pageItems = {};

    app.homepage = function() {
        //loginStartup();
        //updateConfiguration();
        loadFromStorage();
    };

    app.register = function() {
       //enableRegistrationForm();
    };

    app.configure = function() {
        updateConfiguration();
        loadFromStorage();
  

    };

    app.rate = function() {
       
    };

    function saveToLocalStorage() {
        const rulesArray = Array.from(configurationItems.configurationList.children);
        const rulesToSave = rulesArray.map(element => {
            return {
                rule: element.innerText,
                isNotRequired: element.classList.contains('remove-list-item')
            };
        });

        localStorage.setItem('configuration-list', JSON.stringify(rulesToSave));

    }

    function loadFromStorage() {
        const configurationString = localStorage.getItem('configuration-list');

        if (configurationString !== null) {
            const items = JSON.parse(configurationString);
            //console.log(items);
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
    

    /*function loginStartup() {
        const form = document.getElementById('loginForm');
        pageItems.completeLogin = document.getElementById('completeLogin');
        pageItems.username = form.querySelector('#username');
        pageItems.submit = form.querySelector('#submit');

        pageItems.submit.addEventListener('click', loginSubmit);
    }

    function loginSubmit(e) {
        e.preventDefault();

        const p = document.querySelector('p');
        p.innerHTML = pageItems.username.value;
        pageItems.completeLogin.append(p);
        pageItems.username.value = '';
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
        */

    function updateConfiguration(){
        e.preventDefault();
        const configurationForm = document.getElementById('configuration-form');
        configurationItems.configurationList = document.getElementById('configuration-list');
        configurationItems.ruleInput = configurationForm.querySelector('#ruleInput');
        configurationItems.addButton = configurationForm.querySelector('#addrule');
        configurationItems.saveButton = configurationForm.querySelector('#updateList');

        configurationItems.addButton.addEventListener('click', addConfigurationRule);
        configurationItems.configurationList.addEventListener('click', updateConfigurationRules);
        configurationItems.saveButton.addEventListener('click', completeConfigurationRules);
        saveToLocalStorage();
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
        e.preventDefault();
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

})(window.app = window.app || {});

