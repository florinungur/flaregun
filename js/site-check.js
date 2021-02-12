"use strict";

const input = document.getElementById("input");
const button = document.getElementById("button");
const output = document.getElementById("output");

/**
 * Checks the validity of a domain name.
 * @param {string} t The domain name.
 */
function keyupEvent(t) {
  t.preventDefault(),
    (output.innerHTML = ""),
    (output.style = ""),
    "" === input.value ||
      ("Enter" !== t.key && 1 !== t.which && 1 !== button.which) ||
      (input.checkValidity()
        ? getResults()
        : ((output.style.color = "#8a1919"),
          (output.innerHTML = `'${input.value}' is an invalid domain name. 
        Please\n        match the requested format: example.com`)));
}

/**
 * Retrieves the API status.
 * @param {string} t The status code.
 * @return {json} The status code.
 */
function jsonStatus(t) {
  if (t.ok) {
    return t.json();
  }
  throw new Error(t.statusText);
}

/**
 * Retrieves the breaches from HIBP.
 */
function getResults() {
  let t = !1;
  fetch("https://haveibeenpwned.com/api/v2/breaches/", {
    timeout: 1500,
    userAgent: "flaregun",
  })
    .then(jsonStatus)
    .then((e) => {
      const n = document.createElement("div");
      (n.style.width = "500px"),
        e.forEach((e) => {
          e.Domain === input.value &&
            ((n.style.borderColor = "#8a1919"),
            (n.innerHTML = `<img src="${e.LogoPath}" alt="flaregun logo">
            <h2>${input.value}\n            has been breached!</h2>
            ${e.Description}<br>`),
            (t = !0));
        }),
        t || ((n.style.textAlign = "center"), (n.innerHTML = `${input.value} isn't breached`)),
        output.appendChild(n);
    })
    .catch((t) => {
      throw new Error(t);
    });
}

(button.onclick = keyupEvent), input.addEventListener("keyup", keyupEvent);
