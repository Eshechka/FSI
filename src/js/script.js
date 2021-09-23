import { isMobile, _removeClasses } from './functions.js';

window.onload = function() {
    document.addEventListener('click', documentActions);


    function documentActions(e) {
        const targetElement = e.target;

        // if (targetElement('[data-popup="true"]')) {
        //     const popupForm = targetElement.closest('form');
        //     const message = popupForm.getAttribute('data-message');
        //     const popup = document.querySelector('data-message');

        // }

        if (window.innerWidth > 767.92 && isMobile.any) {

            const parentElement = targetElement.closest('[data-arrow-parent="true"]');

            if (targetElement.dataset.arrow) {
                if (parentElement) {
                    parentElement.classList.toggle('_hover');
                }
            } else if (!parentElement && document.querySelectorAll('._hover').length > 0) {
                _removeClasses(document.querySelectorAll('._hover'), '_hover');
            }
        }

        if (isMobile.any) {
            if (targetElement.dataset.searchIcon) {
                document.querySelector('[data-search-form="true"]').classList.toggle('_active');
            } else {
                if (!targetElement.closest('[data-search-form="true"]') && document.querySelectorAll('._active').length > 0) {
                    _removeClasses(document.querySelectorAll('._active'), '_active');
                }
            }
        }


    }
}