
const inputField = document.querySelector('.wrapper__input');
const searchList = document.querySelector('.wrapper__list');
const addedRepo = document.querySelector('.wrapper__repositories');

async function getRepo(value) {
    if (inputField.value) {
        let repositoriesList = await fetch(`https://api.github.com/search/repositories?q=${value}`)
        let response = await repositoriesList.json();
        let resultData = response.items.slice(0, 5);
        searchList.innerHTML = '';
        const fragment = document.createDocumentFragment();
        resultData.forEach(repo => {
            let item = document.createElement('li');
            item.classList.add('wrapper__item');
            item.textContent = repo.name;
            item.addEventListener('click', function() {
                createCard(repo.name, repo.owner.login, repo.stargazers_count)
                searchList.innerHTML = '';
                inputField.value = '';
            })
            fragment.appendChild(item)
        })
        searchList.appendChild(fragment)
    } else {
        searchList.innerHTML = ''
    }
}

function createCard(name, owner, stars) {
    let li = document.createElement('li');
    li.classList.add('wrapper__repository');

    let infoDiv = document.createElement('div');
    infoDiv.classList.add('wrapper__info');

    let repoName = document.createElement('span');
    repoName.textContent = `Name: ${name}`;
    infoDiv.appendChild(repoName);

    let repoOwner = document.createElement('span');
    repoOwner.textContent = `Owner: ${owner}`;
    infoDiv.appendChild(repoOwner);

    let repoStars = document.createElement('span');
    repoStars.textContent = `Stars: ${stars}`;
    infoDiv.appendChild(repoStars);

    li.appendChild(infoDiv)

    let closeButton = document.createElement('div');
    closeButton.classList.add('wrapper__closeButton');
    li.appendChild(closeButton)

    addedRepo.appendChild(li)

    closeButton.addEventListener('click', function() {
        li.remove()
    })
}

const debounce = (fn, debounceTime) => {
    let timeout
    return function() {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, debounceTime)
    }
};

const debouncedGetRepo = debounce(getRepo, 200);

inputField.addEventListener('input', function() {
        debouncedGetRepo(inputField.value)
});





















