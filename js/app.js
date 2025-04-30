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
        updateConfiguration();
        loadFromStorage();
    };

    app.register = function() {
       //enableRegistrationForm();
    };

    app.configure = function() {
        loadFromStorage();
      updateConfiguration();
    };

    app.rate = function() {
       
    };

    app.resultsMap = function() {
        displayMap();
      
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
        const configurationForm = document.getElementById('configuration-form');
        configurationItems.configurationList = document.getElementById('configuration-list');
        configurationItems.ruleInput = configurationForm.querySelector('#ruleInput');
        configurationItems.addButton = configurationForm.querySelector('#addrule');
        configurationItems.saveButton = configurationForm.querySelector('#updateList');

        configurationItems.addButton.addEventListener('click', addConfigurationRule);
        configurationItems.configurationList.addEventListener('click', updateConfigurationRules);
        configurationItems.saveButton.addEventListener('click', completeConfigurationRules);
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

    function displayMap() {
        var map = L.map('map').setView([55.861, -4.25], 13);
        L.tileLayer('https://tile.openstreetmap.org/{zoom}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        var marker = L.marker([55.85, -4.25]).addTo(map);
        marker.bindPopup("<b>Laurieston Road</b><br>Score:84").openPopup();

        var popup = L.popup()
            .setLatLng([55.860, -4.25])
            .setContent("I am a standalone popup.")
            .openOn(map);

            function onMapClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(map);
            }
            
            map.on('click', onMapClick);
    }

})(window.app = window.app || {});

