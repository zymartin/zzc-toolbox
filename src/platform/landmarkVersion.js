export default function landmarkVersion( version ) {
    if ( version ) {
        let currLandmarkVersion = window.localStorage.getItem( 'landmarkVersion' );
        window.localStorage.setItem( 'landmarkVersion', version );
        if ( currLandmarkVersion && currLandmarkVersion != version ) {
            window.localStorage.setItem( 'resetLandmark', 1 );
        }
    }
}