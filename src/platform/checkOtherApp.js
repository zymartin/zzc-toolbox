
const IOSAPPLIST = ['ctrip', 'huizuche', 'ctripizuche', 'rentalcars', 'TUNIUAPP', 'qyer', 'QunariPhone'];
const ANDROIDAPPLIST = ['ctrip.android.view', 'com.huizuche.app', 'com.ctrip.izuche', 'com.rentalcars.handset', 'com.tuniu.app.ui', 'com.qyer.android.jinnang', 'com.Qunar'];


function checkOtherApp() {
    if(window.navigator.userAgent.indexOf('IOS') != -1){

        zzc.call('phoneIsExistApp', {
            appNames: IOSAPPLIST,
            success: function (response) {
                send(response.data,'ios');
            }
        });

    }else{

        zzc.call('phoneIsExistApp', {
            appNames: ANDROIDAPPLIST,
            success: function (response) {
                send(response.data,'android');
            }
        });
    }
}

function send(data,type) { 
    $.ajax( {
        url: '/api/collectAppInstall.php',
        data: {
            info: data,
            device: type
        },
        dataType: 'json',
        type: 'POST',
        success: function () { },
        error: function () { }
    })
}


export default function () { 

    let appVersion = null;
    try{
        zzc.call('getAppVersion', {
            success: function (response) {
                appVersion = response.data.split( '.' );
                if(appVersion[0] >= 5 && appVersion[1] >= 2 && appVersion[2] >= 26 ){
                    checkOtherApp();
                }
            }
        });
    }catch(err) {
        console.log(err);
    }
}

