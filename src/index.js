document.addEventListener('DOMContentLoaded', () => {
    loadDogs();
})

function loadDogs() {
    clearDogs();
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(json => {
        json.forEach(element => loadOneDog(element));
    });
}

function clearDogs() {
    const dogTable = document.getElementById('table-body');
    while (dogTable.firstChild) {dogTable.removeChild(dogTable.firstChild)};
}

function loadOneDog(dog) {
    const dogTable = document.getElementById('table-body');
    const tr = document.createElement('tr');
    const name = document.createElement('td');
    const breed = document.createElement('td');
    const sex = document.createElement('td');
    const btnCell = document.createElement('td');
    const btn = document.createElement('button');

    name.innerText = dog.name;
    breed.innerText = dog.breed;
    sex.innerText = dog.sex;
    btn.innerText = 'Edit Dog';
    btn.setAttribute('id', dog.id);

    tr.appendChild(name);
    tr.appendChild(breed);
    tr.appendChild(sex);
    tr.appendChild(btnCell);
    btnCell.appendChild(btn);
    dogTable.appendChild(tr);

    btn.addEventListener('click', handleEditDog);
}

function handleEditDog(event) {
    const dogRow = event.target.parentNode.parentNode;
    const name = dogRow.firstChild.innerText;
    const breed = dogRow.children[1].innerText;
    const sex = dogRow.children[2].innerText;
    const form = document.getElementById('dog-form');
    const nameInput = form.querySelector('[name="name"]');
    const breedInput = form.querySelector('[name="breed"]');
    const sexInput = form.querySelector('[name="sex"]');
    const btn = form.querySelector('[type="submit"]');
    nameInput.value = name;
    breedInput.value = breed;
    sexInput.value = sex;
    nameInput.setAttribute('id', event.target.id);
    form.addEventListener('submit', submitEditDog);
}

function submitEditDog(event) {
    event.preventDefault();
    const form = document.getElementById('dog-form');
    const nameInput = form.querySelector('[name="name"]');
    const breedInput = form.querySelector('[name="breed"]');
    const sexInput = form.querySelector('[name="sex"]');

    fetch(`http://localhost:3000/dogs/${nameInput.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({
            "name": nameInput.value,
            "breed": breedInput.value,
            "sex": sexInput.value,
        }),
    })
    .then(res => {
        nameInput.removeAttribute('id');
        loadDogs();
    })
    .then(json => form.reset());
}