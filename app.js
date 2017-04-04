/**
 * Created by soso on 2017/3/30.
 */

var g = document.getElementById('getCookie');
var s = document.getElementsByClassName('setCookie');

var d = document.getElementById('deleteCookie');
var r;
//Get cookie
g.onkeydown = function (e) {
    if (e.keyCode == 13) {
        if (r = GetCookie(g.value)) {
            alert (r);
        }
    }
};
//Set cookie
for (var i in s) {
    s[i].onkeydown = function (e) {
        inputCookie(e.keyCode);
    };
}

function inputCookie(k) {
    if (k == 13) {
        //check the value is set
        setCookie(s[0].value, s[1].value, s[2].value *1000);
        console.log(document.cookie);
    }
}

//Delete cookie
d.onkeydown = function (e) {
    if (e.keyCode == 13) {
        if (r = d.value) {
            DelCookie(r);
        }
        console.log(document.cookie);
    }
};

function setCookie(name, value, time) {
    //Expiration time
    var t = new Date();
    t.setTime(t.getTime() + parseInt(time));

    document.cookie = name + '=' + escape(value) + ' ;expires=' + t.toGMTString();
}

function GetCookie(name) {
    var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        alert ('Not Found');
    }
}

function DelCookie(name) {
    var t = new Date();
    t.setTime(-1);
    var c;

    if (c = GetCookie(name)) {
        document.cookie = name + '=' + c + ';expires=' + t.toGMTString() + ';';
        alert ('Delete Success !');
    }
}