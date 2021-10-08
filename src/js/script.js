import { isMobile, _removeClasses } from './functions.js';

window.onload = function() {
    document.addEventListener('click', documentActions);


    function documentActions(e) {
        const targetElement = e.target;

        const cartHeader = document.querySelector('[data-cart-header="true"]');
        const productsCartIcon = document.querySelector('[data-cart-products-amount="true"]');

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

        if (targetElement.closest('[data-more="true"]')) {
            e.preventDefault();
            getProducts(targetElement);
        }

        if (targetElement.closest('[data-cart-btn="true"]')) {
            e.preventDefault();
            const productElement = targetElement.closest('[data-pid]');
            const productId = productElement.dataset.pid;
            addToCart(targetElement, productId, productElement, productsCartIcon);
        }

        if (targetElement.dataset.cartHeader || targetElement.closest('[data-cart-header="true"]')) {
            e.preventDefault();
            const cartList = document.querySelector('[data-cart-list="true"]');
            if (cartList.children.length > 0 && !targetElement.closest('[data-cart-list-body="true"]') && !targetElement.dataset.cartListBody) {
                cartHeader.classList.toggle('_active');
            }
        } else if (!targetElement.closest('[data-cart-header="true"]') && !targetElement.dataset.cartBtn) {
            cartHeader.classList.remove('_active');
        }

        if (targetElement.dataset.cartListDelete) {
            e.preventDefault();
            const product = targetElement.closest('[data-cart-pid]');
            const productId = product.dataset.cartPid;
            updateCart(productId, null, productsCartIcon, cartHeader, false);
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


async function getProducts(button) {
    if (!button.classList.contains('_hold')) {
        button.classList.add('_hold');
        const file = "json/products.json";
        let response = await fetch(file);
        if (response.ok) {
            let result = await response.json();
            loadProducts(result);
            button.classList.remove('_hold');
            button.remove();
        } else {
            console.log('Error load products');
        }
    }
}

function loadProducts(data) {
    const productslist = document.querySelector('[data-products-list="true"]');
    const productsMarkup = data.products.map(item => {

        let productLabels = Array.from(item.labels).map((label) => {
            return `
                <div class="item-product__label item-product__label_${label.type}">${label.value}</div>
            `;
        }).join('');

        let productPriceOld = item.priceOld ?
            `<div class="item-product__price item-product__price_old">Rp ${item.priceOld}</div>` :
            '';

        return `
        <article data-pid="${item.id}" class="products__item item-product">
            <div class="item-product__labels">
                ${productLabels}
            </div>
            <a href="${item.url}" class="item-product__image _ibg">
                <img src="${item.image}" alt="product ${item.title}" class="item-product__picture">
            </a>
            <div class="item-product__body">
                <div class="item-product__content">
                    <h5 class="item-product__title">${item.title}</h5>
                    <div class="item-product__text">${item.text}</div>
                </div>
                <div class="item-product__prices">
                    <div class="item-product__price">Rp ${item.price}</div>
                    ${productPriceOld}
                </div>
                <div class="item-product__actions actions-product">
                    <div class="actions-product__body">
                        <a href="#" data-cart-btn="true" class="actions-product__button btn btn_white">Add to cart</a>
                        <a href="${item.shareUrl}" class="actions-product__link icon-share"></a>
                        <a href="${item.likeUrl}" class="actions-product__link icon-favorite"></a>
                    </div>
                </div>
            </div>
        </article>
        `;
    }).join('');
    productslist.insertAdjacentHTML('beforeend', productsMarkup);
}

function addToCart(productButton, productId, product, productsCartIcon) {
    if (!productButton.classList.contains('_hold')) {
        productButton.classList.add('_hold');
        productButton.classList.add('_fly');

        const productsImg = product.querySelector('[data-product-img="true"]');
        const productsImgFly = productsImg.cloneNode(true);

        const productsImgFlyWidth = productsImg.offsetWidth;
        const productsImgFlyHeight = productsImg.offsetHeight;
        const productsImgFlyTop = productsImg.getBoundingClientRect().top;
        const productsImgFlyLeft = productsImg.getBoundingClientRect().left;

        productsImgFly.setAttribute('class', '_flyImage _ibg');
        productsImgFly.style.cssText = `
            left: ${productsImgFlyLeft}px;
            top: ${productsImgFlyTop}px;
            height: ${productsImgFlyHeight}px;
            width: ${productsImgFlyWidth}px;
        `;

        document.body.append(productsImgFly);

        const cartFlyLeft = productsCartIcon.getBoundingClientRect().left;
        const cartFlyTop = productsCartIcon.getBoundingClientRect().top;

        productsImgFly.style.cssText = `
            left: ${cartFlyLeft}px;
            top: ${cartFlyTop}px;
            height: 0px;
            width: 0px;
            opacity: 0;
        `;

        productsImgFly.addEventListener('transitionend', function() {

            if (productButton.classList.contains('_fly')) {
                productsImgFly.remove();
                updateCart(productId, product, productsCartIcon, null);
                productButton.classList.remove('_fly');
            }
            productButton.classList.remove('_hold');
        });

    } else {
        console.log('Error load products');
    }
}

function updateCart(productId, product, productsCartIcon, cartHeader, porductAdd = true) {
    const cartList = document.querySelector('[data-cart-list="true"]');
    const cartProduct = cartList.querySelector(`[data-cart-pid="${productId}"]`);
    const productsCounterEl = productsCartIcon.querySelector('span');

    if (porductAdd) {
        if (productsCounterEl) {
            let productsCounter = +(productsCounterEl.textContent || productsCounterEl.innerText);
            productsCounterEl.innerHTML = productsCounter + 1;
        } else {
            productsCartIcon.insertAdjacentHTML('afterbegin', '<span>1</span>');
        }

        if (!cartProduct) {
            const productEl = product ? product : document.querySelector(`[data-pid="${productId}"]`);
            const productImg = productEl.querySelector(`[data-product-img="true"]`).innerHTML;
            const productTitle = productEl.querySelector(`[data-product-title="true"]`).innerHTML;
            const cartProductMarkup = `
                <a href="/change-me/" class="cart-list__image _ibg">${productImg}</a>
                <div class="cart-list__body">
                    <a href="/change-me/" class="cart-list__title">${productTitle}</a>
                    <div data-cart-list-quantity="true" class="cart-list__quantity">Quantity: <span>1</span></div>
                    <a href="/change-me/" data-cart-list-delete="true" class="cart-list__delete">Delete</a>
                </div>
            `;
            cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductMarkup}</li>`);
        } else {
            const cartProductQuantity = cartProduct.querySelector('[data-cart-list-quantity="true"] span');
            cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
        }
    } else {
        const cartProductQuantity = cartProduct.querySelector('[data-cart-list-quantity="true"] span');
        // let productsCounter = +(productsCounterEl.textContent || productsCounterEl.innerText);
        // let productCounter = +(cartProductQuantity.textContent || cartProductQuantity.innerText);
        // let amountProductsCart = productsCounter - productCounter;

        // cartProduct.remove();

        // if (amountProductsCart >= 1) {
        //     productsCounterEl.innerHTML = amountProductsCart;
        // } else {
        //     productsCartIcon.querySelector('span').remove();
        // }

        productsCounterEl.innerHTML = --productsCounterEl.innerHTML;
        cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;

        if (!parseInt(cartProductQuantity.innerHTML)) {
            cartProduct.remove();
        }
        if (productsCounterEl.innerHTML == 0) {
            productsCartIcon.querySelector('span').remove();
            cartHeader.classList.remove('_active');
        }

    }

}