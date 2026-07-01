const fs = require('fs');
const bt = String.fromCharCode(96); // backtick
const dl = String.fromCharCode(36); // dollar sign
const content = [
  "import { getRequestConfig } from 'next-intl/server';",
  "",
  "export default getRequestConfig(async ({ locale }) => {",
  "  return {",
  "    messages: (await import(" + bt + "../messages/" + dl + "{locale}.json" + bt + ")).default",
  "  };",
  "});",
  ""
].join("\n");
fs.writeFileSync("D:/网站/src/i18n/request.ts", content);
console.log("request.ts fixed");
