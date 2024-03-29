const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();

    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=76f77bf0b162706561f70c67e2ba6e40&language=ru&query=' + searchText;

    movie.innerHTML = 'Загрузка';

    fetch(server)
        .then(function (value) {

            if (value.status != 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function (output) {
            console.log(output);
            let inner = '';

            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                console.log(nameItem);
                if (item.poster_path == null) {
                    inner += `
                    <div class='col-3 item'>
                    <div class = 'poster'></div>
                        <h5>${nameItem}</h5>
                    </div>
                    `;
                }

                else{
                    inner += `
                    <div class='col-3 item'>
                        <img src='${urlPoster + item.poster_path}' alt='${nameItem}'>
                        <h5>${nameItem}</h5>
                    </div>
                    `;
                }
            });

            movie.innerHTML = inner;
        })
        .catch(function (reason) {
            movie.innerHTML = 'Упс что-то пошло не так';
            console.error('error ' + reason.status);
        })
}

searchForm.addEventListener('submit', apiSearch);

