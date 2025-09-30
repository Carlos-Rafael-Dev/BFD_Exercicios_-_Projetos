const images = [
    {id: 1, url: './assets/1.jpg', title: 'Image 1'},
    {id: 2, url: './assets/2.jpg', title: 'Image 2'},
    {id: 3, url: './assets/3.jpg', title: 'Image 3'},
    {id: 4, url: './assets/4.jpg', title: 'Image 4'},
    {id: 5, url: './assets/5.jpg', title: 'Image 5'},
    {id: 6, url: './assets/6.jpg', title: 'Image 6'}
]

const containerItens = document.querySelector('#container-itens');

const loadImages = (images, container) => {
    images.forEach(image => {  
        container.innerHTML += `<div class="item">
            <img src="${image.url}" alt="${image.title}"/>
        </div>`;
    })
}

loadImages(images, containerItens);

let itens = document.querySelectorAll('.item');

const previous = () => {
    containerItens.appendChild(itens[0]);
    itens = document.querySelectorAll('.item');
}

const next = () => {
    const lastItem = itens[itens.length - 1];
    containerItens.insertBefore(lastItem, itens[0]);
    itens = document.querySelectorAll('.item');
}

document.querySelector('#previous').addEventListener('click', previous);
document.querySelector('#next').addEventListener('click', next);