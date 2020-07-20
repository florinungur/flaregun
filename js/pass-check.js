"use strict";

const input = document.getElementById("input");
const button = document.getElementById("button");
const output = document.getElementById("output");

/**
 * Checks if a password has been breached and if the password is strong.
 * @param {string} e The password.
 */
function keyupEvent(e) {
  e.preventDefault(),
    (output.innerHTML = ""),
    "" === input.value ||
      ("Enter" !== e.key && 1 !== e.which && 1 !== button.which) ||
      isPassBreached().then(passChecker);
}

/**
 * Retrieves the API status.
 * @param {string} e The status code.
 * @return {json} The status code.
 */
function jsonStatus(e) {
  if (e.ok) {
    return e.text();
  }
  throw new Error(e.statusText);
}

/**
 * Retrieves the breaches from HIBP.
 * @return {Error} error
 */
function isPassBreached() {
  const e = sha1(input.value).toUpperCase();
  const t = e.substring(0, 5);
  const n = e.substring(5);
  return fetch(`https://api.pwnedpasswords.com/range/${t}`, {
    timeout: 1500,
    userAgent: "flaregun",
  })
    .then(jsonStatus)
    .then((e) => {
      const t = document.createElement("div");
      if (-1 === e.indexOf(n)) {
        (t.style.borderColor = "#175506"), (t.innerHTML = "This password wasn't breached!"), output.appendChild(t);
      } else {
        const r = e.split("\n");
        let o = 0;
        let a = 0;
        let s = "times";
        for (; a < r.length; a++) {
          n === r[a].split(":")[0] && ((o = r[a].split(":")[1]), 1 === r[a].split(":")[1] && (s = "time"));
        }
        (o = +o),
          (t.innerHTML = `This password was found\n          <b>${o.toLocaleString(
            "en"
          )}</b> ${s} in\n          compromised databases! I sure hope you're not using it ;)`),
          output.appendChild(t);
      }
    })
    .catch((e) => {
      throw new Error(e);
    });
}

/**
 * Checks the strength of a password.
 */
function passChecker() {
  const e = document.createElement("div");
  const t = document.createElement("div");
  input.value.length < 10
    ? (e.innerHTML =
        "This password can be instantly guessed by\n      determined actors. Time to move to a passphrase.")
    : input.value.length < 14
    ? (e.innerHTML = "This password has a decent length but I wouldn't\n      use it for my bank account.")
    : ((e.style.borderColor = "#175506"), (e.innerHTML = "This password has a good length!")),
    output.appendChild(e);
  const n = [
    "A weak password shall not pass!- Gandalf",
    "Your password needs more protein!- Bear Grylls",
    "Weak, your password is!- Yoda",
    "To a stronger password and beyond!- Buzz Lightyear",
    "Have a longer password and prosper!- Spock",
    "Great! See, you're getting it!- John Connor",
    "With great power comes a great password!- Uncle Ben",
  ];
  const r = /[0-9]/.test(input.value);
  const o = /(.*[0-9].*[0-9])/.test(input.value);
  const a = /[A-Z]/.test(input.value);
  const s = /(.*[A-Z].*[A-Z])/.test(input.value);
  const i = /\s/.test(input.value);
  const d = /[-#!$%^&*()_+|~=`{}[\]:";'<>?,.\/]/.test(input.value);
  const l = r + o + a + s + i + d;
  l > 4 && (t.style.borderColor = "#175506");
  const u = n[l].split("-");
  if (((t.innerHTML = `Here's what ${u[1]} thinks\n    about your password: <em>${u[0]}</em>`), !r)) {
    const e = document.createElement("p");
    (e.innerHTML = "<br>- add some numbers"), t.appendChild(e);
  }
  if (!a) {
    const e = document.createElement("p");
    (e.innerHTML = "- add some capital letters"), t.appendChild(e);
  }
  if (!i) {
    const e = document.createElement("p");
    (e.innerHTML = "- add whitespace (some websites hate it)"), t.appendChild(e);
  }
  if (!d) {
    const e = document.createElement("p");
    (e.innerHTML = "- add some symbols"), t.appendChild(e);
  }
  output.appendChild(t), strongPassGen();
}

/**
 * Generates suggestions of strong passwords.
 */
function strongPassGen() {
  const e = [
    "this IS @ _strong_ p4ssword!",
    "winner winner CHICKEN DINNER! 0_0",
    "I am trapped 1n the machine!",
    "Thanks, Obama! >:(",
    "I like turtl3s! I like infosec as well.",
    "Braking Bad > Game of Thrones x 100",
    "veryStr0ngPazzIndeed!AndVery_long_t00",
    "UseM3D@ddy,please!Hello?!234",
  ];
  let t;
  let n;
  const r =
    e[((t = 0), (n = e.length), (t = Math.ceil(t)), (n = Math.floor(n)), Math.floor(Math.random() * (n - t)) + t)];
  const o = document.createElement("div");
  (o.style.border = "1px solid #175506"),
    (o.innerHTML = `A good passphrase should look like this:\n    <strong style="color:#175506">${r}</strong>`),
    output.appendChild(o);
}

/**
 * Encrypts the plain text password.
 * @param {string} e The plain text password.
 * @return {sha1} The encrypted password.
 */
function sha1(e) {
  // eslint-disable-next-line require-jsdoc
  function t(e, t) {
    return (e << t) | (e >>> (32 - t));
  }

  // eslint-disable-next-line require-jsdoc
  function n(e) {
    let t;
    let n;
    let r = "";
    for (t = 7; t >= 0; t--) {
      r += (n = (e >>> (4 * t)) & 15).toString(16);
    }
    return r;
  }

  let r;
  let o;
  let a;
  let s;
  let i;
  let d;
  let l;
  let u;
  let p;
  const h = new Array(80);
  let c = 1732584193;
  let m = 4023233417;
  let g = 2562383102;
  let f = 271733878;
  let C = 3285377520;
  const w = (e = (function (e) {
    e = e.replace(/\r\n/g, "\n");
    let t = "";
    for (let n = 0; n < e.length; n++) {
      const r = e.charCodeAt(n);
      r < 128
        ? (t += String.fromCharCode(r))
        : r > 127 && r < 2048
        ? ((t += String.fromCharCode((r >> 6) | 192)), (t += String.fromCharCode((63 & r) | 128)))
        : ((t += String.fromCharCode((r >> 12) | 224)),
          (t += String.fromCharCode(((r >> 6) & 63) | 128)),
          (t += String.fromCharCode((63 & r) | 128)));
    }
    return t;
  })(e)).length;
  const y = [];
  for (u = 0; u < w - 3; u += 4) {
    (p = (e.charCodeAt(u) << 24) | (e.charCodeAt(u + 1) << 16) | (e.charCodeAt(u + 2) << 8) | e.charCodeAt(u + 3)),
      y.push(p);
  }
  switch (w % 4) {
    case 0:
      u = 2147483648;
      break;
    case 1:
      u = (e.charCodeAt(w - 1) << 24) | 8388608;
      break;
    case 2:
      u = (e.charCodeAt(w - 2) << 24) | (e.charCodeAt(w - 1) << 16) | 32768;
      break;
    case 3:
      u = (e.charCodeAt(w - 3) << 24) | (e.charCodeAt(w - 2) << 16) | (e.charCodeAt(w - 1) << 8) | 128;
  }
  for (y.push(u); y.length % 16 != 14; ) {
    y.push(0);
  }
  for (y.push(w >>> 29), y.push((w << 3) & 4294967295), r = 0; r < y.length; r += 16) {
    for (u = 0; u < 16; u++) {
      h[u] = y[r + u];
    }
    for (u = 16; u <= 79; u++) {
      h[u] = t(h[u - 3] ^ h[u - 8] ^ h[u - 14] ^ h[u - 16], 1);
    }
    for (a = c, s = m, i = g, d = f, l = C, u = 0; u <= 19; u++) {
      (o = (t(a, 5) + ((s & i) | (~s & d)) + l + h[u] + 1518500249) & 4294967295),
        (l = d),
        (d = i),
        (i = t(s, 30)),
        (s = a),
        (a = o);
    }
    for (u = 20; u <= 39; u++) {
      (o = (t(a, 5) + (s ^ i ^ d) + l + h[u] + 1859775393) & 4294967295),
        (l = d),
        (d = i),
        (i = t(s, 30)),
        (s = a),
        (a = o);
    }
    for (u = 40; u <= 59; u++) {
      (o = (t(a, 5) + ((s & i) | (s & d) | (i & d)) + l + h[u] + 2400959708) & 4294967295),
        (l = d),
        (d = i),
        (i = t(s, 30)),
        (s = a),
        (a = o);
    }
    for (u = 60; u <= 79; u++) {
      (o = (t(a, 5) + (s ^ i ^ d) + l + h[u] + 3395469782) & 4294967295),
        (l = d),
        (d = i),
        (i = t(s, 30)),
        (s = a),
        (a = o);
    }
    (c = (c + a) & 4294967295),
      (m = (m + s) & 4294967295),
      (g = (g + i) & 4294967295),
      (f = (f + d) & 4294967295),
      (C = (C + l) & 4294967295);
  }
  return (o = n(c) + n(m) + n(g) + n(f) + n(C)).toLowerCase();
}

(button.onclick = keyupEvent), input.addEventListener("keyup", keyupEvent);
