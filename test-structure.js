const screens = require("./screens");
const missing = [];
let buttons = 0;

for (const [screenId, screen] of Object.entries(screens)) {
  if (!screen.title || screen.title.length > 256) throw new Error(`Invalid title: ${screenId}`);
  if (!screen.description || screen.description.length > 4096) throw new Error(`Invalid description: ${screenId}`);
  if ((screen.buttons ?? []).length > 20) throw new Error(`Too many buttons: ${screenId}`);
  for (const button of screen.buttons ?? []) {
    buttons += 1;
    if (!screens[button.to]) missing.push(`${screenId} -> ${button.to}`);
    if (button.label.length > 80) throw new Error(`Button label too long: ${screenId}`);
  }
  const rows = Math.ceil((screen.buttons ?? []).length / 5) + (!["home", "paused"].includes(screenId) ? 1 : 0);
  if (rows > 5) throw new Error(`Too many component rows: ${screenId}`);
}

if (missing.length) throw new Error(`Missing destinations:\n${missing.join("\n")}`);
console.log(`Validated ${Object.keys(screens).length} screens and ${buttons} pathway buttons.`);
