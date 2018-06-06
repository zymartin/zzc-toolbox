/**
 * 通过UA获取平台信息
 *
 * tantu:
 *  * iOS: ZZCIOS/com.tantu.map/1.3.0 (iPhone; iPhone OS 9.3.5; zh_CN)
 *  * Android: ZZCAndroid/com.tantu.map.xiaomi/1.3.0(Android; Android5.1.1;zh)
 *
 * zuzuche: ZZCIOS/5.2.0 (iPhone; iPhone OS 9.3.5; zh_CN)
 *
 * safari: Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G36 Safari/601.1
 *
 * qq:
 *  * iOS: Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G36 QQ/6.5.3.410 V1_IPH_SQ_6.5.3_1_APP_A Pixel/750 Core/UIWebView NetType/WIFI Mem/57
 *  * Android: Mozilla/5.0 (Linux; Android 6.0; MX6 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.2 TBS/036558 Safari/537.36 V1_AND_SQ_6.5.3_398_YYB_D QQ/6.5.3.2855 NetType/WIFI WebP/0.3.0 Pixel/1080
 *
 * wechat: Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G36 MicroMessenger/6.3.25 NetType/WIFI Language/zh_CN
 *
 * weibo: Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G36 Weibo (iPhone7,2__weibo__6.9.0__iphone__os9.3.5) AliApp(BC/2.1) tae_sdk_ios_2.1 havana
 */

/**
 * 判断平台：
 *
 * safari
 * chrome
 * UC
 * zzc
 * tantu
 * wechat
 * ...
 */

const UA = navigator.userAgent;
let platform = {
    name: '',
    version: ''
};

/**
 * 获取APP平台信息
 *
 * @return {object} platform
 * @property {string} name 平台名称
 * @property {string} version 版本号
 */
export default function getPlatform() {
    if ( platform.name && platform.version ) {
        return platform;
    }

    let key;
    for ( key in match ) {
        match[key]();

        if ( platform.name && platform.version ) break;
    }

    return platform;
}


export function isZzc() {
    let platform = getPlatform();
    return platform.name.toLocaleLowerCase() === 'zzc';
}

export function isTantu() {s
    let platform = getPlatform();
    return platform.name.toLocaleLowerCase() === 'tantu';
}

export function isTantuTravel() {
    let platform = getPlatform();
    return platform.name.toLocaleLowerCase() === 'com.tantu.travel' || platform.name.toLocaleLowerCase() === 'tantu';
}

export function isZzcPro() {
    let platform = getPlatform();

    return platform.name.toLocaleLowerCase() === 'vip';
}

export function compareAppVersion( version, success, error ) {
    let versionArr = version.split( '.' );
    let appVersion = [0, 0, 0];
    if ( isZzc() || isTantuTravel() || isZzcPro() ) {
        try {
            zzc.call( 'getAppVersion', {
                success: function ( response ) {
                    appVersion = response.data.split( '.' );
                    if ( appVersion[0] >= versionArr[0] && appVersion[1] >= versionArr[1] && appVersion[2] >= versionArr[2] ) {
                        success instanceof Function && success();
                    } else {
                        error instanceof Function && error();
                    }
                }
            } );
        } catch ( err ) {
            console.log( err );
            error instanceof Function && error();
        }
    } else {
        error instanceof Function && error();
    }
}

export function isWX() {
    var ua = navigator.userAgent.toLowerCase();
    if ( ua.match( /MicroMessenger/i ) == "micromessenger" ) {
        return true;
    } else {
        return false;
    }
}

export function isIos() {
    return /iphone|ipad|ipod/i.test( navigator.userAgent );
}

export function isAndroid() {
    return /android/i.test( navigator.userAgent );
}


const match = {
    tantuTravel() {
        let reg = /ZZC\w+\/(com.tantu.travel)\/(\d+\.\d+\.\d+)/;
        let result = UA.match( reg );
        if ( result ) {
            platform.name = result[1];
            platform.version = result[2];
        }
    },
    tantu() {
        let reg = /^ZZC\w+\/[^\/]+(tantu)[^\/]+\/(\d+\.\d+\.\d+)/;
        let result = UA.match( reg );

        if ( result ) {
            platform.name = result[1];
            platform.version = result[2];
        }
    },
    zzc() {
        let reg = /^(ZZC)\w+\/(\d+\.\d+\.\d+)/;
        let result = UA.match( reg );

        if ( result ) {
            platform.name = result[1];
            platform.version = result[2];
        }
    },

    zzc_pro() {
        let reg = /^(VIP)\w+\/(\d+\.\d+\.\d+)/;
        let result = UA.match( reg );

        if ( result ) {
            platform.name = result[1];
            platform.version = result[2];
        }
    }
};