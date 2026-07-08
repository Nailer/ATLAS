import fs from 'fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('/Users/aje/Documents/Github/KitePISP/frontend/src/reanest.html', 'utf8');
const dom = new JSDOM(html, { runScripts: "dangerously" });

setTimeout(() => {
    console.log("Errors:");
    if (dom.window.document.errors) {
       console.log(dom.window.document.errors);
    } else {
       console.log("None");
    }
    
    // Check if showSection is defined
    console.log("showSection type:", typeof dom.window.showSection);
    
    process.exit(0);
}, 2000);
