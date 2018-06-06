export default function isEmptyObject( s ) {
    for ( var name in s ) {
        return false;
    }
    return true;
}