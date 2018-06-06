export function getCss( ele, key ) {
    return getComputedStyle( document.querySelector( ele ) )[key];
}