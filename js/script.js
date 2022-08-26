let endOfThePage = 0;

let preloading = false;

const showPreloader = () => {
    let preloader = document.getElementById('preloader');

    preloader.style.display = 'block';
    preloading = true;
}

const hidePreloader = () => {
    let preloader = document.getElementById('preloader');

    preloader.style.display = 'none';
    preloading = false;
}

const getData = () => {

    if (!preloading) {

        showPreloader();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {
                for (let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pUrl = document.createElement('p');
                    let body = document.body;

                    pId.innerText = `User id: ${user.id}`;
                    pName.innerText = `User name: ${user.name}`;
                    pUrl.innerHTML = `User url: ${user.website} <br>--------`;

                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pUrl);

                    hidePreloader();
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
};

const scrollToEndOfPage = () => {
    let d = document.documentElement;
    let scrollHeight = d.scrollHeight;
    let scrollTop = d.scrollTop;
    let clientHeight = d.clientHeight;
    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

    // console.log(`scrollHeight ${scrollHeight}`)
    // console.log(`scrollTop ${scrollTop}`)
    // console.log(`clientHeight ${clientHeight}`)
    // console.log(`sumScrollTopClientHeight ${sumScrollTopClientHeight}`)

    if (sumScrollTopClientHeight >= scrollHeight) {
        endOfThePage += 1;
        // console.log(`endOfThePage: ${endOfThePage}`)
        getData();
    }
};

window.addEventListener('scroll', scrollToEndOfPage);