
// 更换url里的查询参数

export default function changeUrlSearch( key, value, isEncode = true ) {
  var search = location.search,
    hasKey = false;
  search = search.replace( new RegExp( '[?&]' + key + '=[^&]*' ), function ( match ) {
    hasKey = true;
    return match.substr( 0, 1 ) + key + '=' + ( isEncode ? encodeURIComponent( value ) : value );
  } );
  if ( !hasKey ) {
    search += ( search.indexOf( '?' ) === -1 ? '?' : '&' );
    search += key + '=' + ( isEncode ? encodeURIComponent( value ) : value );
  }
  return search;
}