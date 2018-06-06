import isType from './isType';

export default function isArray( v ) {
    return Array.isArray ? Array.isArray( v ) : isType( v, 'Array' );
}