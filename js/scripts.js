const employeeContainer = document.getElementById('employee-container');
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => generateCards(data.results))
    .then(data => generateModal());

function generateCards(data) {
    const cards = data.map(item => `
    <div class='card'>
        <img src="${item.picture.large}" alt="employee image">
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

function generateModal() {
    let cards = document.getElementsByClassName("card");
    let modal = document.querySelector(".modal");
    let closeBtn = document.querySelector(".close-btn");

    for (let i = 0; i < cards.length; i++) {
        cards[i].onclick = function(e){
            populateModal(e);
            modal.style.display = "block";
        }
    }

    closeBtn.onclick = function(){
      modal.style.display = "none";
    }

    window.onclick = function(e){
      if(e.target == modal){
        modal.style.display = "none";
      }
    }
}

function populateModal(e) {
    //step 1 - Get Modal HTML
    const modalImage = document.querySelector('.modal-image');
    const modalName = document.querySelector('.modal-name');
    const modalEmail = document.querySelector('.modal-email');
    const modalCity = document.querySelector('.modal-city');
    const modalPhone = document.querySelector('.modal-phone');
    const modalAddr = document.querySelector('.modal-addr');
    const modalDate = document.querySelector('.modal-date');

    //step 2 - Get Clicked On Data 
    const card = e.target.closest('.card');
    const cardImage = card.children[0].src;
    const cardName = card.children[1].children[0].innerHTML;
    const cardEmail = card.children[1].children[1].innerHTML;
    const cardCity = card.children[1].children[2].innerHTML;
    const cardPhone = card.children[1].dataset.phoneNumber;
    const cardAddr = card.children[1].dataset.address;
    const cardDate = card.children[1].dataset.birthday;

    //step 3 - Populate Modal With Data
    modalImage.src = cardImage;
    modalName.innerHTML = cardName;
    modalEmail.innerHTML = cardEmail;
    modalCity.innerHTML = cardCity;
    modalPhone.innerHTML = cardPhone;
    modalAddr.innerHTML = cardAddr;
    modalDate.innerHTML = "Birthday: "+ cardDate;
}
