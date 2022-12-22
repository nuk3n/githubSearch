
const inputField = document.querySelector('.wrapper__input')
const searchList = document.querySelector('.wrapper__list')
const addedRepo = document.querySelector('.wrapper__repositories')



async function getRepo(value) {
    if (searchList.childNodes) {
        searchList.innerHTML = ""
    }
    let repositoriesList = await fetch(`https://api.github.com/search/repositories?q=${value}`)
    let response = await repositoriesList.json();
    let resultData = response.items.slice(0,5);
    const fragment = document.createDocumentFragment();
    resultData.forEach(repo => {
        let item = document.createElement('li');
        item.classList.add('wrapper__item');
        item.textContent = repo.name;
        fragment.appendChild(item)
    })
    searchList.appendChild(fragment)
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

inputField.addEventListener('input', function() {
    if (inputField.value.length === 0) {
        searchList.textContent = '';
    } else {
        debounce(getRepo(inputField.value), 200)
    }
})


















