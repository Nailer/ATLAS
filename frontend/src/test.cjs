const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const html = fs.readFileSync('/Users/aje/Documents/Github/KitePISP/frontend/src/reanest.html', 'utf8');
const dom = new JSDOM(html, { runScripts: "dangerously" });
setTimeout(() => {
    console.log("Errors:", dom.window.document.errors || "None");
}, 2000);
