const fs = require('fs');
const content = [
  "import createNextIntlPlugin from 'next-intl/plugin';",
  "",
  "const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');",
  "",
  "/** @type {import('next').NextConfig} */",
  "const nextConfig = {",
  "  output: 'export',",
  "  basePath: process.env.BASE_PATH ? '/' + process.env.BASE_PATH : '',",
  "  trailingSlash: true,",
  "  images: {",
  "    unoptimized: true,",
  "  },",
  "};",
  "",
  "export default withNextIntl(nextConfig);",
  ""
].join("\n");
fs.writeFileSync("D:/网站/next.config.mjs", content);
console.log("next.config.mjs updated");
