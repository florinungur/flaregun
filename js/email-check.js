"use strict";

const input = document.getElementById("input");
const button = document.getElementById("button");
const counter = document.getElementById("counter");
const output = document.getElementById("output");

/**
 * Checks the validity of an email address.
 * @param {string} e The email.
 */
function keyupEvent(e) {
  e.preventDefault(),
    (counter.innerHTML = ""),
    (counter.style = ""),
    (output.innerHTML = ""),
    (output.style = ""),
    "" === input.value ||
      ("Enter" !== e.key && 1 !== e.which && 1 !== button.which) ||
      ((counter.style.color = "#8a1919"),
      input.checkValidity()
        ? ((output.innerHTML =
            '<a href="https://github.com/andrew-schofield/keepass2-haveibeenpwned/issues/56" ' +
            'target="_blank" rel="noopener noreferrer"> ' +
            "There is a problem with the HIBP API at the moment</a>"),
          getResults())
        : ((output.style.color = "#8a1919"), (output.innerHTML = input.validationMessage)));
}

/**
 * Retrieves the API status.
 * @param {string} e The status code.
 * @return {json} The status code.
 */
function jsonStatus(e) {
  if (e.ok) {
    return e.json();
  }
  if (404 === e.status) {
    return [];
  }
  throw new Error(e.statusText);
}

/**
 * Retrieves the breaches from HIBP.
 */
function getResults() {
  let e = 0;
  fetch(`https://haveibeenpwned.com/api/v2/breachedaccount/${input.value}`, {
    timeout: 1500,
    userAgent: "flaregun",
  })
    .then(jsonStatus)
    .then((t) => {
      if (0 === t.length) {
        (counter.style.color = "#175506"), (counter.innerHTML = `Yay! '${input.value}' has not been breached!`);
      } else {
        const n = [];
        t.forEach((t) => {
          const u = new Date(Date.parse(t.BreachDate)).getFullYear();
          n.push({
            name: t.Title,
            date: u,
            domain: t.Domain,
            count: t.PwnCount,
            description: t.Description,
          }),
            e++;
        }),
          (counter.innerHTML =
            1 === e
              ? `'${input.value}' has been breached once`
              : `'${input.value}' has been breached\n            ${e.toLocaleString(
                  "en"
                )} times<br><h1>Check it out...</h1>`),
          n.sort((e, t) => t.date - e.date),
          n.forEach((e) => {
            const t = document.createElement("div");
            (t.innerHTML = `<h2><a href="http://${
              e.domain
            }"\n            target="_blank" rel="noopener noreferrer">\n            ${e.name}</a> (${
              e.date
            })</h2>\n            <strong>${e.count.toLocaleString("en")}</strong> accounts\n            breached<p>${
              e.description
            }</p>`),
              output.appendChild(t);
          });
      }
    })
    .catch((e) => {
      throw new Error(e);
    });
}

(button.onclick = keyupEvent), input.addEventListener("keyup", keyupEvent);
