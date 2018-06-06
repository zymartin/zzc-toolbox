import { getCookie } from '../cookie/getCookie';
import getUrlData from '../getUrlData';

// 避免引入一大堆其他页面的语言包增加体积,仅仅返回CN，HK，TW
function getLang() {
    let lang = '';

    if ( getCookie( 'lang' ) ) {
        lang = getCookie( 'lang' ).toUpperCase();
    } else if ( getUrlData( 'lang' ) ) {
        lang = getUrlData( 'lang' ).toUpperCase();
    } else {
        lang = 'CN';
    }

    return lang;
}
const lang = getLang();

export {
    lang
};