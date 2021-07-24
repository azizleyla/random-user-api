const URL = "https://randomuser.me/api/";
const container = document.querySelector('.container');

function displayUser(user) {
    container.innerHTML = "";
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${user.large}" class="user-img" alt="user " />
    <p class="user-title">Hi, My name is</p>
    <p class="user-value">${user.name}</p>
    <div class="values-list">
        <!-- single icon -->
        <button class="icon active" data-label="name">
            <span class="far fa-user"></span>
        </button>
        <button class="icon" data-label="email">
            <span class="far fa-envelope-open"></span>
        </button>
        <button class="icon" data-label="age">
            <span class="far fa-calendar-times"></span>
        </button>
        <button class="icon" data-label="street">
            <span class="far fa-map"></span>
        </button>
        <button class="icon" data-label="phone">
            <span class="fas fa-phone"></span>
     
        <button class="icon" data-label="password">
            <span class="fas fa-user-lock"></span>
        </button>
        </div>
        <button class="btn random" type="button" data-label="random">random user</button>
    `
    container.append(div)
    const btns = container.querySelectorAll('.icon');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btns.forEach(btn => btn.classList.remove('active'))
            e.currentTarget.classList.add('active')
        })

    })
    container.querySelector('.random').addEventListener('click', showUser);
}

container.addEventListener('click', showDetails);
async function showDetails(e) {
    const person = await getData();
    const clickedLabel = e.target.parentElement.dataset.label;

    if (clickedLabel === "email") {
        container.querySelector('.user-title').textContent = "My email is"
        container.querySelector('.user-value').textContent = `${person.email}`;
    } else if (clickedLabel === "name") {
        container.querySelector('.user-title').textContent = "My name is"
        container.querySelector('.user-value').textContent = `${person.name}`;
    } else if (clickedLabel === 'age') {
        container.querySelector('.user-title').textContent = "My age is"
        container.querySelector('.user-value').textContent = `${person.age}`;
    } else if (clickedLabel === "password") {
        container.querySelector('.user-title').textContent = "My password is"
        container.querySelector('.user-value').textContent = `${person.password}`;
    }
    else if (clickedLabel === "phone") {
        container.querySelector('.user-title').textContent = "My phone is"
        container.querySelector('.user-value').textContent = `${person.phone}`;
    }
    else if (e.target.parentElement.dataset.label === "street") {
        container.querySelector('.user-title').textContent = "My street is"
        container.querySelector('.user-value').textContent = `${person.street}`;
    }
}

const showUser = async () => {
    const person = await getData();
    displayUser(person)

}


const getData = async () => {
    const response = await fetch(URL);
    let data = await response.json();
    data = data.results[0];
    const { email, phone } = data;
    const { name: { first, last } } = data;
    const { dob: { age } } = data;
    const { login: { password } } = data;
    const { street: { name, number } } = data.location;
    const { picture: { large } } = data;
    return {
        email,
        phone,
        name: `${first} ${last}`,
        age,
        password,
        street: `${number} ${name}`,
        large,

    }

}

window.addEventListener('DOMContentLoaded', showUser)
