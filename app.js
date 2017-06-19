/**
 * Created by soso on 2017/3/30.
 */

const [g, s, d, b, c] = [document.getElementById('getCookie'), Array.from(document.getElementsByClassName('setCookie')),
    document.getElementById('deleteCookie'), document.getElementById('numBtn'), Array.from(document.getElementsByClassName('codeBtn'))];

let r;
// Get cookie
g.onkeydown = (e) => {
    if (e.keyCode ===  13 && (r = GetCookie(g.value))) {
        alert (r);
    }
};

// Set cookie
s.map((item) => {
    item.onkeydown = (e) => {

        let k = e.keyCode;

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
    };
});

// Delete cookie
d.onkeydown = (e) => {
    if (e.keyCode === 13 && d.value) {
        DelCookie(d.value);
    }
};

// Test how many cookies can be stored
b.onclick = () => {
    for (let i = 0; i < 200; i++) {
        setCookie(i, 'temporary', 10);
    }

    let allCookies = document.cookie.match(/temporary/g);

    document.getElementById('numCookies').innerText = (allCookies.length === 200) ? 'more than 200' : allCookies.length;
};

// click to show or hide the code
c.map((item) => {
    item.onclick = () => {
        let p = item.nextElementSibling;
        if (item.innerHTML === 'show code') {
            item.innerHTML = 'hide code';
            p.style.display = 'block';
        } else {
            item.innerHTML = 'show code';
            p.style.display = 'none';
        }
    }
});

function setCookie(name, value, time) {
    //Expiration time
    let t = new Date();

    t.setSeconds(t.getSeconds() + parseInt(time));
    document.cookie = `${escape(name)}=${escape(value)};expires=${t.toGMTString()};`;
}

function GetCookie(name) {
    let reg = new RegExp(`(^| )${escape(name)}=([^;]*)(;|$)`);
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