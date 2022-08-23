const employeeContainer = document.getElementById('employee-container');
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => generateCards(data.results));

function generateCards(data) {
    const cards = data.map(item => `
    <div class='card'>
        <img src="${item.picture.medium}">
        <span class="name">${item.name.first} ${item.name.last}</span>
        <span class="email">${item.email}</span>
        <span class="city">${item.location.city}</span>
    </div>
    `).join('');
    employeeContainer.innerHTML = cards;
}