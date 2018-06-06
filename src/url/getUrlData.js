/**
 * 
 * @desc   獲取url参数
 * @param  {String} key
 * @return {Object} 
 */

export default function getUrlData(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}