"use strict";

const browser = document.getElementById("browser");
const plugins = document.getElementById("plugins");
const fonts = document.getElementById("fonts");
const monitorSize = document.getElementById("monitorSize");
const browserSize = document.getElementById("browserSize");
const touchscreen = document.getElementById("touchscreen");
const adblock = document.getElementById("block_me");
const flash = document.getElementById("flash");
const dnt = document.getElementById("dnt");
const referrer = document.getElementById("referrer");

/**
 * Identifies the browser.
 */
function _browser() {
  let e;
  let n;
  let a;
  const t = navigator.userAgent;
  let i = navigator.appName;
  let o = "" + parseFloat(navigator.appVersion);
  -1 !== (n = t.indexOf("Opera"))
    ? ((i = "Opera"), (o = t.substring(n + 6)), -1 !== (n = t.indexOf("Version")) && (o = t.substring(n + 8)))
    : -1 !== (n = t.indexOf("MSIE"))
    ? ((i = "Microsoft Internet Explorer"), (o = t.substring(n + 5)))
    : -1 !== (n = t.indexOf("Chrome"))
    ? ((i = "Chrome"), (o = t.substring(n + 7)))
    : -1 !== (n = t.indexOf("Safari"))
    ? ((i = "Safari"), (o = t.substring(n + 7)), -1 !== (n = t.indexOf("Version")) && (o = t.substring(n + 8)))
    : -1 !== (n = t.indexOf("Firefox"))
    ? ((i = "Firefox"), (o = t.substring(n + 8)))
    : -1 !== t.indexOf("Trident/")
    ? ((i = "Microsoft Internet Explorer"), (o = t.substring(t.indexOf("rv:") + 3)))
    : (e = t.lastIndexOf(" ") + 1) < (n = t.lastIndexOf("/")) &&
      ((i = t.substring(e, n)),
      (o = t.substring(n + 1)),
      i.toLowerCase() === i.toUpperCase() && (i = navigator.appName)),
    -1 !== (a = o.indexOf(";"))
      ? (o = o.substring(0, a))
      : -1 !== (a = o.indexOf(" "))
      ? (o = o.substring(0, a))
      : -1 !== (a = o.indexOf(")")) && (o = o.substring(0, a)),
    (o = +(o = o.substring(0, 2))),
    (browser.innerHTML =
      "Microsoft Internet Explorer" === i
        ? i + " " + o + " (chances are that some tests will not work in IE)"
        : ("Firefox" === i && o < 64) ||
          ("Chrome" === i && o < 71) ||
          ("Safari" === i && o < 12) ||
          ("Opera" === i && o < 56)
        ? i + " " + o + '<span style="color:#8a1919"> (out of date)</span>'
        : i + " " + o + '<span style="color:#175506"> (up to date)</span>');
}

/**
 * Identifies the browser plugins; recommends less than 4 plugins.
 */
function _plugins() {
  // eslint-disable-next-line require-jsdoc
  function e() {
    if (0 === navigator.plugins.length) {
      plugins.innerHTML = 'N/A<span style="color:#175506">\n        (Good job!)</span>';
    } else {
      const e = [];
      for (let n = 0, a = navigator.plugins.length; n < a; n++) {
        navigator.plugins[n] && e.push(navigator.plugins[n].name);
      }
      e.length < 4
        ? (plugins.innerHTML = e.join(", ") + '<span style="color:#175506"> (Good job!)</span>')
        : (plugins.innerHTML =
            e.join(", ") + '<span style="color:#8a1919">\n          (These are a lot of plugins, chief!)</span>');
    }
  }

  "Microsoft Internet Explorer" === navigator.appName ||
  ("Netscape" === navigator.appName && /Trident/.test(navigator.userAgent))
    ? (function () {
        let n = [];
        if (
          (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject")) ||
          "ActiveXObject" in window
        ) {
          n = function (e) {
            try {
              return new window.ActiveXObject(e), e;
            } catch (e) {
              return "ERROR";
            }
          };
        } else {
          plugins.innerHTML = "N/A";
        }
        navigator.plugins && (n = n.concat(e()));
      })()
    : e();
}

/**
 * Identifies the browser fonts.
 */
function _fonts() {
  const e = ["monospace", "sans-serif", "serif"];
  const n = [
    "Andale Mono",
    "Arial",
    "Arial Black",
    "Arial Hebrew",
    "Arial MT",
    "Arial Narrow",
    "Arial Rounded MT Bold",
    "Arial Unicode MS",
    "Bitstream Vera Sans Mono",
    "Book Antiqua",
    "Bookman Old Style",
    "Calibri",
    "Cambria",
    "Cambria Math",
    "Century",
    "Century Gothic",
    "Century Schoolbook",
    "Comic Sans",
    "Comic Sans MS",
    "Consolas",
    "Courier",
    "Courier New",
    "Geneva",
    "Georgia",
    "Helvetica",
    "Helvetica Neue",
    "Impact",
    "Lucida Bright",
    "Lucida Calligraphy",
    "Lucida Console",
    "Lucida Fax",
    "LUCIDA GRANDE",
    "Lucida Handwriting",
    "Lucida Sans",
    "Lucida Sans Typewriter",
    "Lucida Sans Unicode",
    "Microsoft Sans Serif",
    "Monaco",
    "Monotype Corsiva",
    "MS Gothic",
    "MS Outlook",
    "MS PGothic",
    "MS Reference Sans Serif",
    "MS Sans Serif",
    "MS Serif",
    "MYRIAD",
    "MYRIAD PRO",
    "Palatino",
    "Palatino Linotype",
    "Segoe Print",
    "Segoe Script",
    "Segoe UI",
    "Segoe UI Light",
    "Segoe UI Semibold",
    "Segoe UI Symbol",
    "Tahoma",
    "Times",
    "Times New Roman",
    "Times New Roman PS",
    "Trebuchet MS",
    "Verdana",
    "Wingdings",
    "Wingdings 2",
    "Wingdings 3",
    "Abadi MT Condensed Light",
    "Academy Engraved LET",
    "ADOBE CASLON PRO",
    "Adobe Garamond",
    "ADOBE GARAMOND PRO",
    "Agency FB",
    "Aharoni",
    "Albertus Extra Bold",
    "Albertus Medium",
    "Algerian",
    "Amazone BT",
    "American Typewriter",
    "American Typewriter Condensed",
    "AmerType Md BT",
    "Andalus",
    "Angsana New",
    "AngsanaUPC",
    "Antique Olive",
    "Aparajita",
    "Apple Chancery",
    "Apple Color Emoji",
    "Apple SD Gothic Neo",
    "Arabic Typesetting",
    "ARCHER",
    "ARNO PRO",
    "Arrus BT",
    "Aurora Cn BT",
    "AvantGarde Bk BT",
    "AvantGarde Md BT",
    "AVENIR",
    "Ayuthaya",
    "Bandy",
    "Bangla Sangam MN",
    "Bank Gothic",
    "BankGothic Md BT",
    "Baskerville",
    "Baskerville Old Face",
    "Batang",
    "BatangChe",
    "Bauer Bodoni",
    "Bauhaus 93",
    "Bazooka",
    "Bell MT",
    "Bembo",
    "Benguiat Bk BT",
    "Berlin Sans FB",
    "Berlin Sans FB Demi",
    "Bernard MT Condensed",
    "BernhardFashion BT",
    "BernhardMod BT",
    "Big Caslon",
    "BinnerD",
    "Blackadder ITC",
    "BlairMdITC TT",
    "Bodoni 72",
    "Bodoni 72 Oldstyle",
    "Bodoni 72 Smallcaps",
    "Bodoni MT",
    "Bodoni MT Black",
    "Bodoni MT Condensed",
    "Bodoni MT Poster Compressed",
    "Bookshelf Symbol 7",
    "Boulder",
    "Bradley Hand",
    "Bradley Hand ITC",
    "Bremen Bd BT",
    "Britannic Bold",
    "Broadway",
    "Browallia New",
    "BrowalliaUPC",
    "Brush Script MT",
    "Californian FB",
    "Calisto MT",
    "Calligrapher",
    "Candara",
    "CaslonOpnface BT",
    "Castellar",
    "Centaur",
    "Cezanne",
    "CG Omega",
    "CG Times",
    "Chalkboard",
    "Chalkboard SE",
    "Chalkduster",
    "Charlesworth",
    "Charter Bd BT",
    "Charter BT",
    "Chaucer",
    "ChelthmITC Bk BT",
    "Chiller",
    "Clarendon",
    "Clarendon Condensed",
    "CloisterBlack BT",
    "Cochin",
    "Colonna MT",
    "Constantia",
    "Cooper Black",
    "Copperplate",
    "Copperplate Gothic",
    "Copperplate Gothic Bold",
    "Copperplate Gothic Light",
    "CopperplGoth Bd BT",
    "Corbel",
    "Cordia New",
    "CordiaUPC",
    "Cornerstone",
    "Coronet",
    "Cuckoo",
    "Curlz MT",
    "DaunPenh",
    "Dauphin",
    "David",
    "DB LCD Temp",
    "DELICIOUS",
    "Denmark",
    "DFKai-SB",
    "Didot",
    "DilleniaUPC",
    "DIN",
    "DokChampa",
    "Dotum",
    "DotumChe",
    "Ebrima",
    "Edwardian Script ITC",
    "Elephant",
    "English 111 Vivace BT",
    "Engravers MT",
    "EngraversGothic BT",
    "Eras Bold ITC",
    "Eras Demi ITC",
    "Eras Light ITC",
    "Eras Medium ITC",
    "EucrosiaUPC",
    "Euphemia",
    "Euphemia UCAS",
    "EUROSTILE",
    "Exotc350 Bd BT",
    "FangSong",
    "Felix Titling",
    "Fixedsys",
    "FONTIN",
    "Footlight MT Light",
    "Forte",
    "FrankRuehl",
    "Fransiscan",
    "Freefrm721 Blk BT",
    "FreesiaUPC",
    "Freestyle Script",
    "French Script MT",
    "FrnkGothITC Bk BT",
    "Fruitger",
    "FRUTIGER",
    "Futura",
    "Futura Bk BT",
    "Futura Lt BT",
    "Futura Md BT",
    "Futura ZBlk BT",
    "FuturaBlack BT",
    "Gabriola",
    "Galliard BT",
    "Gautami",
    "Geeza Pro",
    "Geometr231 BT",
    "Geometr231 Hv BT",
    "Geometr231 Lt BT",
    "GeoSlab 703 Lt BT",
    "GeoSlab 703 XBd BT",
    "Gigi",
    "Gill Sans",
    "Gill Sans MT",
    "Gill Sans MT Condensed",
    "Gill Sans MT Ext Condensed Bold",
    "Gill Sans Ultra Bold",
    "Gill Sans Ultra Bold Condensed",
    "Gisha",
    "Gloucester MT Extra Condensed",
    "GOTHAM",
    "GOTHAM BOLD",
    "Goudy Old Style",
    "Goudy Stout",
    "GoudyHandtooled BT",
    "GoudyOLSt BT",
    "Gujarati Sangam MN",
    "Gulim",
    "GulimChe",
    "Gungsuh",
    "GungsuhChe",
    "Gurmukhi MN",
    "Haettenschweiler",
    "Harlow Solid Italic",
    "Harrington",
    "Heather",
    "Heiti SC",
    "Heiti TC",
    "HELV",
    "Herald",
    "High Tower Text",
    "Hiragino Kaku Gothic ProN",
    "Hiragino Mincho ProN",
    "Hoefler Text",
    "Humanst 521 Cn BT",
    "Humanst521 BT",
    "Humanst521 Lt BT",
    "Imprint MT Shadow",
    "Incised901 Bd BT",
    "Incised901 BT",
    "Incised901 Lt BT",
    "INCONSOLATA",
    "Informal Roman",
    "Informal011 BT",
    "INTERSTATE",
    "IrisUPC",
    "Iskoola Pota",
    "JasmineUPC",
    "Jazz LET",
    "Jenson",
    "Jester",
    "Jokerman",
    "Juice ITC",
    "Kabel Bk BT",
    "Kabel Ult BT",
    "Kailasa",
    "KaiTi",
    "Kalinga",
    "Kannada Sangam MN",
    "Kartika",
    "Kaufmann Bd BT",
    "Kaufmann BT",
    "Khmer UI",
    "KodchiangUPC",
    "Kokila",
    "Korinna BT",
    "Kristen ITC",
    "Krungthep",
    "Kunstler Script",
    "Lao UI",
    "Latha",
    "Leelawadee",
    "Letter Gothic",
    "Levenim MT",
    "LilyUPC",
    "Lithograph",
    "Lithograph Light",
    "Long Island",
    "Lydian BT",
    "Magneto",
    "Maiandra GD",
    "Malayalam Sangam MN",
    "Malgun Gothic",
    "Mangal",
    "Marigold",
    "Marion",
    "Marker Felt",
    "Market",
    "Marlett",
    "Matisse ITC",
    "Matura MT Script Capitals",
    "Meiryo",
    "Meiryo UI",
    "Microsoft Himalaya",
    "Microsoft JhengHei",
    "Microsoft New Tai Lue",
    "Microsoft PhagsPa",
    "Microsoft Tai Le",
    "Microsoft Uighur",
    "Microsoft YaHei",
    "Microsoft Yi Baiti",
    "MingLiU",
    "MingLiU_HKSCS",
    "MingLiU_HKSCS-ExtB",
    "MingLiU-ExtB",
    "Minion",
    "Minion Pro",
    "Miriam",
    "Miriam Fixed",
    "Mistral",
    "Modern",
    "Modern No. 20",
    "Mona Lisa Solid ITC TT",
    "Mongolian Baiti",
    "MONO",
    "MoolBoran",
    "Mrs Eaves",
    "MS LineDraw",
    "MS Mincho",
    "MS PMincho",
    "MS Reference Specialty",
    "MS UI Gothic",
    "MT Extra",
    "MUSEO",
    "MV Boli",
    "Nadeem",
    "Narkisim",
    "NEVIS",
    "News Gothic",
    "News GothicMT",
    "NewsGoth BT",
    "Niagara Engraved",
    "Niagara Solid",
    "Noteworthy",
    "NSimSun",
    "Nyala",
    "OCR A Extended",
    "Old Century",
    "Old English Text MT",
    "Onyx",
    "Onyx BT",
    "OPTIMA",
    "Oriya Sangam MN",
    "OSAKA",
    "OzHandicraft BT",
    "Palace Script MT",
    "Papyrus",
    "Parchment",
    "Party LET",
    "Pegasus",
    "Perpetua",
    "Perpetua Titling MT",
    "PetitaBold",
    "Pickwick",
    "Plantagenet Cherokee",
    "Playbill",
    "PMingLiU",
    "PmingLiU-ExtB",
    "Poor Richard",
    "Poster",
    "PosterBodoni BT",
    "PRINCETOWN LET",
    "Pristina",
    "PTBarnum BT",
    "Pythagoras",
    "Raavi",
    "Rage Italic",
    "Ravie",
    "Ribbon131 Bd BT",
    "Rockwell",
    "Rockwell Condensed",
    "Rockwell Extra Bold",
    "Rod",
    "Roman",
    "Sakkal Majalla",
    "Santa Fe LET",
    "Savoye LET",
    "Sceptre",
    "Script",
    "Script MT Bold",
    "SCRIPTINA",
    "Serifa",
    "Serifa BT",
    "Serifa Th BT",
    "ShelleyVolante BT",
    "Sherwood",
    "Shonar Bangla",
    "Showcard Gothic",
    "Shruti",
    "Signboard",
    "SILKSCREEN",
    "SimHei",
    "Simplified Arabic",
    "Simplified Arabic Fixed",
    "SimSun",
    "SimSun-ExtB",
    "Sinhala Sangam MN",
    "Sketch Rockwell",
    "Skia",
    "Small Fonts",
    "Snap ITC",
    "Snell Roundhand",
    "Socket",
    "Souvenir Lt BT",
    "Staccato222 BT",
    "Steamer",
    "Stencil",
    "Storybook",
    "Styllo",
    "Subway",
    "Swis721 BlkEx BT",
    "Swiss911 XCm BT",
    "Sylfaen",
    "Synchro LET",
    "System",
    "Tamil Sangam MN",
    "Technical",
    "Teletype",
    "Telugu Sangam MN",
    "Tempus Sans ITC",
    "Terminal",
    "Thonburi",
    "Traditional Arabic",
    "Trajan",
    "TRAJAN PRO",
    "Tristan",
    "Tubular",
    "Tunga",
    "Tw Cen MT",
    "Tw Cen MT Condensed",
    "Tw Cen MT Condensed Extra Bold",
    "TypoUpright BT",
    "Unicorn",
    "Univers",
    "Univers CE 55 Medium",
    "Univers Condensed",
    "Utsaah",
    "Vagabond",
    "Vani",
    "Vijaya",
    "Viner Hand ITC",
    "VisualUI",
    "Vivaldi",
    "Vladimir Script",
    "Vrinda",
    "Westminster",
    "WHITNEY",
    "Wide Latin",
    "ZapfEllipt BT",
    "ZapfHumnst BT",
    "ZapfHumnst Dm BT",
    "Zapfino",
    "Zurich BlkEx BT",
    "Zurich Ex BT",
    "ZWAdobeF",
  ];
  const a = document.getElementsByTagName("body")[0];
  const t = document.createElement("div");
  const i = document.createElement("div");
  const o = {};
  const r = {};
  const l = function () {
    const e = document.createElement("span");
    return (
      (e.style.position = "absolute"),
      (e.style.left = "-9999px"),
      (e.style.fontSize = "72px"),
      (e.style.fontStyle = "normal"),
      (e.style.fontWeight = "normal"),
      (e.style.letterSpacing = "normal"),
      (e.style.lineBreak = "auto"),
      (e.style.lineHeight = "normal"),
      (e.style.textTransform = "none"),
      (e.style.textAlign = "left"),
      (e.style.textDecoration = "none"),
      (e.style.textShadow = "none"),
      (e.style.whiteSpace = "normal"),
      (e.style.wordBreak = "normal"),
      (e.style.wordSpacing = "normal"),
      (e.innerHTML = "mmmmmmmmmmlli"),
      e
    );
  };
  const s = function (e, n) {
    const a = l();
    return (a.style.fontFamily = "'" + e + "'," + n), a;
  };
  const d = function (n) {
    let a = !1;
    for (let t = 0; t < e.length; t++) {
      if ((a = n[t].offsetWidth !== o[e[t]] || n[t].offsetHeight !== r[e[t]])) {
        return a;
      }
    }
    return a;
  };
  const c = (function () {
    const n = [];
    for (let a = 0, i = e.length; a < i; a++) {
      const i = l();
      (i.style.fontFamily = e[a]), t.appendChild(i), n.push(i);
    }
    return n;
  })();
  a.appendChild(t);
  for (let n = 0, a = e.length; n < a; n++) {
    (o[e[n]] = c[n].offsetWidth), (r[e[n]] = c[n].offsetHeight);
  }
  const u = (function () {
    const a = {};
    for (let t = 0, o = n.length; t < o; t++) {
      const o = [];
      for (let a = 0, r = e.length; a < r; a++) {
        const r = s(n[t], e[a]);
        i.appendChild(r), o.push(r);
      }
      a[n[t]] = o;
    }
    return a;
  })();
  a.appendChild(i);
  const T = [];
  for (let e = 0; e < n.length; e++) {
    d(u[n[e]]) && T.push(n[e]);
  }
  a.removeChild(i),
    a.removeChild(t),
    T.length < 20
      ? (fonts.innerHTML = T.join(", ") + '<span style="color:#175506">\n      (Good job!)</span>')
      : (fonts.innerHTML = T.join(", ") + '<span style="color:#8a1919"> (These are a lot of fonts, chief!)</span>');
}

/**
 * Identifies the monitor size and color depth.
 */
function _monitorSize() {
  const e = window.screen;
  const n = e.width;
  const a = e.height;
  const t = e.colorDepth;
  monitorSize.innerHTML = `${n} x ${a} (${t} bit color depth)`;
}

/**
 * Identifies the windows size.
 */
function _browserSize() {
  const n = window.innerWidth;
  const a = window.innerHeight;
  browserSize.innerHTML = `${n} x ${a}`;
}

/**
 * Checks if the device is a touchscreen.
 */
function _touchscreen() {
  let e;
  let n = 0;
  const a = "ontouchstart" in window;
  void 0 !== navigator.maxTouchPoints
    ? (n = navigator.maxTouchPoints)
    : void 0 !== navigator.msMaxTouchPoints && (n = navigator.msMaxTouchPoints);
  try {
    document.createEvent("TouchEvent"), (e = !0);
  } catch (n) {
    e = !1;
  }
  touchscreen.innerHTML = 0 === n || !1 === e || !1 === a ? "non-touch screen" : "touch screen";
}

/**
 * Checks if the browser runs an adblocker.
 */
function _adblock() {
  const e = document.createElement("div");
  (e.innerHTML = "&nbsp;"),
    e.setAttribute("style", "top: -999px; position: fixed;"),
    (e.className = "adsbox ad-300x250 banner-ad"),
    document.body.appendChild(e),
    window.setTimeout(function () {
      0 === e.offsetHeight
        ? (document.body.classList.add("ab"), (adblock.innerHTML = "present"))
        : (adblock.innerHTML = "absent"),
        document.body.removeChild(e);
    }, 500);
}

/**
 * Checks if the browser runs flash.
 */
function _flash() {
  (flash.style.color = "#8a1919"), (flash.style.color = "#175506"), (flash.innerHTML = "not installed");
}

/**
 * Checks if the browser asks to not be tracked.
 */
function _dnt() {
  const e = navigator.msDoNotTrack || navigator.doNotTrack;
  !e || ("1" !== e && "yes" !== e)
    ? ((dnt.style.color = "#8a1919"), (dnt.innerHTML = "disabled :("))
    : ((dnt.style.color = "#175506"), (dnt.innerHTML = "enabled!"));
}

/**
 * Identifies the page from which the browser arrived at this page.
 */
function _referrer() {
  referrer.innerHTML = document.referrer;
}

window.addEventListener("resize", _browserSize),
  _browser(),
  _plugins(),
  _fonts(),
  _monitorSize(),
  _browserSize(),
  _touchscreen(),
  _adblock(),
  _flash(),
  _dnt(),
  _referrer();
