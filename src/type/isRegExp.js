export default function isRegExp( v ) {
    return Object.prototype.toString.call( v ) === '[object RegExp]'
}