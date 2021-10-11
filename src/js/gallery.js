import 'lightgallery.js/src/css/lightgallery.css';
import 'lightgallery.js/src/js/lightgallery.js';
import { isMobile } from './functions';

let gallery = document.querySelectorAll('._gallery');
if (gallery) {
    gallery_init();
}

function gallery_init() {
    for (let index = 0; index < gallery.length; index++) {
        const el = gallery[index];
        lightGallery(el, {
            counter: false,
            selector: 'a',
            download: false
        });
    }
}

const furniture = document.querySelector('.furniture__body');

if (furniture && !isMobile.any()) {
    const furnitureItems = document.querySelector('.furniture__items');
    const furnitureColumn = document.querySelectorAll('.furniture__column');

    const speed = furniture.dataset.speed;

    let positionX = 0;
    let coordXpercent = 0;

    furniture.addEventListener('mousemove', function(e) {
        let furnitureWidth = furniture.offsetWidth;

        const coordX = e.pageX - furnitureWidth / 2; // 100 - 1000/2 = -400px 
        coordXpercent = coordX / furnitureWidth * 200; // -400px / 1000px * 200 = -0.4 * 200 = -80%

        if (!furniture.classList.contains('_init')) {
            requestAnimationFrame(setMouseGalleryStyle);
            furniture.classList.add('_init');
        }
    });

    function setMouseGalleryStyle() {
        let furnitureItemsWidth = 0;
        furnitureColumn.forEach(element => {
            furnitureItemsWidth += element.offsetWidth;
        });

        const delta = furnitureItemsWidth - furniture.offsetWidth; // 2491px - 1000px = 1491px
        const distX = Math.floor(coordXpercent - positionX); // -80% - 0 = -80
        console.log('distX ', distX);

        positionX += distX * speed; // 0 + -80% * 0.02 = 1,6

        let position = delta / 200 * positionX; // 1491px / 200 * 1,6 = 11,9px

        furnitureItems.style.cssText = `transform: translate3d(${-position}px, 0, 0)`;

        if (Math.abs(distX) > 0) {
            requestAnimationFrame(setMouseGalleryStyle);
        } else {
            furniture.classList.remove('_init');
        }
    }
}