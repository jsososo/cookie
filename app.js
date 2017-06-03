/**
 * Created by soso on 2017/3/30.
 */

const g = document.getElementById('getCookie');
const s = document.getElementsByClassName('setCookie');
const d = document.getElementById('deleteCookie');

let r;
//Get cookie
g.onkeydown = function (e) {
    if (e.keyCode == 13) {
        if (r = GetCookie(g.value)) {
            alert (r);
        }
    }
};
//Set cookie
for (let i in s) {
    s[i].onkeydown = function (e) {
        inputCookie(e.keyCode);
    };
}

function inputCookie(k) {
    if (k === 13 ) {
        if (s[0].value !== '') {
            if (s[1].value !== '') {
                if (!isNaN(s[2].value) && s[2].value > 0) { // is number and bigger than 0
                    setCookie(s[0].value, s[1].value, s[2].value);
                    alert (`Setting Success ! \nCookie's name: ${s[0].value} \nCookie's value: ${s[1].value} \nCookie's expires time: ${s[2].value}s`);
                    [s[0].value, s[1].value, s[2].value] = ['', '', ''];
                } else {
                    s[2].focus();
                    alert ('input expires time ( >0 )')
                }
            } else {
                s[1].focus();
                alert ('input the value');
            }
        } else {
            s[0].focus();
            alert ('input the name');
        }
    }
}

//Delete cookie
d.onkeydown = function (e) {
    if (e.keyCode == 13 && d.value) {
        DelCookie(d.value);
    }
};

function setCookie(name, value, time) {
    //Expiration time
    let t = new Date();

    t.setSeconds(t.getSeconds() + parseInt(time));
    document.cookie = `${name}=${escape(value)};expires=${t.toGMTString()};`;
}

function GetCookie(name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    let arr = document.cookie.match(reg);

    if (arr) {
        return unescape(arr[2]);
    } else {
        alert ('Not Found');
    }
}

function DelCookie(name) {
    let t = new Date();
    t.setTime(-1);

    let c;

    if (c = GetCookie(name)) {
        document.cookie = `${name}=${c};expires=${t.toGMTString()};`;
        d.value = '';
        alert ('Delete Success !');
    }
}