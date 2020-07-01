const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
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

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    const count = 10;
    const apiKey = 'EIqqdYFWjQE_XHz18lxlCXuc6jQLFlqHPT0ni9aeQVE';
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {

    }
}

// On Load
getPhotos();
