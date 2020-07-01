const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesRendered = 0;
let totalImages = 0;

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageRendered() {
    imagesRendered++;
    if(imagesRendered === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function displayPhotos() {
    imagesRendered = 0;
    totalImages = photosArray.length;

    // Run function for each object in photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Event Listener, check when each photo is finished loading
        img.addEventListener('load', imageRendered);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    const count = 30;
    const apiKey = 'EIqqdYFWjQE_XHz18lxlCXuc6jQLFlqHPT0ni9aeQVE';
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {

    }
}

// Check to see if scrolling is near bottom of the page, Load more photos
window.addEventListener('scroll', () => {
    if((window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();
