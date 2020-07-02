const imageContainer = document.getElementById('image-container');
const pageLoader = document.getElementById('page-loader');
const serviceError = document.getElementById('service-error');
const imageLoader = document.getElementById('image-loader');
let loadingItem;
let initialLoading = true;
let photosArray = [];
let ready = false;
let imageCollection;
let imageCollectionIndex = 0;
let imagesRendered = 0;
let totalImages = 0;
let fetchImageCount = 5;

function onInit() {
    serviceError.hidden = true;
    imageLoader.hidden = true;
    getPhotos();
}

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function createImageCollection() {
    imageCollection = document.createElement('div');
    setAttributes(imageCollection, {
        class: `image-collection-${imageCollectionIndex}`,
        id: `image-collection-${imageCollectionIndex}`
    });
    imageCollection.hidden = true;
}

function imageRendered() {
    imagesRendered++;

    if(imagesRendered === totalImages) {
        ready = true;        
        fetchImageCount = 15;
        imageCollection.hidden = false;

        if(initialLoading) {
            pageLoader.hidden = true;
            initialLoading = false;
        } else {
            imageLoader.hidden = true;
        }
    }
}

function displayPhotos() {
    imagesRendered = 0;
    totalImages = photosArray.length;

    createImageCollection();    

    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
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

        // Put <img> inside <a>, then put both inside imageCollection Element
        item.appendChild(img);
        imageCollection.appendChild(item);
    });

    imageContainer.appendChild(imageCollection);
    imageCollectionIndex++;
}

async function getPhotos() {
    if(!initialLoading) {
        imageLoader.hidden = false;
    }

    const apiKey = 'EIqqdYFWjQE_XHz18lxlCXuc6jQLFlqHPT0ni9aeQVE';
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${fetchImageCount}`;

    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        serviceError.hidden = false;
        setTimeout(() => {
            getPhotos();
        }, 3600000);
    }
}

// Check to see if scrolling is near bottom of the page, Load more photos
window.addEventListener('scroll', () => {
    if(((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000)) && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
onInit();
