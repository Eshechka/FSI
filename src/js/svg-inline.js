export function inlineSVG() {
  const iconGlobe = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.5 10H17.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 2.5C11.876 4.55376 12.9421 7.21903 13 10C12.9421 12.781 11.876 15.4462 10 17.5C8.12404 15.4462 7.05794 12.781 7 10C7.05794 7.21903 8.12404 4.55376 10 2.5V2.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;

  document.querySelector(
    ".header__options-item_globe .header__options-img"
  ).innerHTML = iconGlobe;
}
