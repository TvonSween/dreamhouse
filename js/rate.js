/*
const rating = {
rate: function () {
   
    capturePropertyData();


    function capturePropertyData() {
        const propertyForm = document.getElementById('rateForm');

        formData = {
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

        propertyForm.onsubmit.addEventListener('click', propertyFormSubmit);
    }

  
function propertyFormSubmit(e) {
    e.preventDefault();

    const existingData = JSON.parse(localStorage.getItem("formData")) || [];
    existingData.push(formData);
    localStorage.setItem('rateFormDataList', JSON.stringify(existingData));

    alert('Form data saved!');
    form.reset();
    populateTable();
}
     
  
function populateTable() {
    const tableBody = document.getElementById('tbody');
    if (!tableBody) return;
  
    tableBody.innerHTML = ''; 
    const dataList = JSON.parse(localStorage.getItem('rateFormDataList')) || [];
  
    dataList.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
          <td>${entry.property}</td>
          <td>${entry.bedrooms}</td>
          <td>${entry.bathroom}</td>
          <td>${entry.kitchen}</td>
          <td>${entry.living}</td>
          <td>${entry.garden}</td>
          <td>${entry.front}</td>
          <td>${entry.location}</td>
          <td>${entry.commute}</td>
          <td>${entry.amenities}</td>
          <td>${entry.like ? 'Yes' : 'No'}</td>
          <td>${entry.pros}</td>
          <td>${entry.cons}</td>
        `;
        tableBody.appendChild(row);
    });
  
    if (!$.fn.DataTable.isDataTable('#ratingTable')) {
    $('#ratingTable').DataTable();
      }
    }
}
}

//export default rating;
*/