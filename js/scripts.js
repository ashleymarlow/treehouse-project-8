const employeeContainer = document.getElementById('employee-container');
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => generateCards(data.results));

function generateCards(data) {
    const cards = data.map(item => `
    <div class='card'>
        <img src="${item.picture.medium}">
        <div class="employee-info" 
            data-phone-number="${item.phone}" 
            data-address="${item.location.street.number} ${item.location.street.name} ${item.location.city}, ${item.location.state} ${item.location.postcode}" 
            data-birthday="${item.dob.date.slice(0,10)}">
                <span class="name">${item.name.first} ${item.name.last}</span>
                <span class="email">${item.email}</span>
                <span class="city">${item.location.city}</span>
        </div>
    </div>
    `).join('');
    employeeContainer.innerHTML = cards;
}

let modalBtn = document.getElementById("modal-btn");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");
modalBtn.onclick = function(){
  modal.style.display = "block";
}
closeBtn.onclick = function(){
  modal.style.display = "none";
}
window.onclick = function(e){
  if(e.target == modal){
    modal.style.display = "none";
  }
}