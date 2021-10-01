import { isMobile, _removeClasses } from './functions.js';

window.onload = function() {
    document.addEventListener('click', documentActions);


    function documentActions(e) {
        const targetElement = e.target;

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
            const search = document.querySelector('[data-search-form="true"]');
            if (targetElement.dataset.searchIcon) {
                search.classList.toggle('_active');
            } else {
                if (!targetElement.closest('[data-search-form="true"]') && search.classList.contains('_active')) {
                    search.classList.toggle('_active');
                }
            }
        }
    }

    const headerElement = document.querySelector('.header');

    const callback = function(entries, observer) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('_scroll');
        } else {
            headerElement.classList.add('_scroll');
        }
    }

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);
}