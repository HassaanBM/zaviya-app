/* The one HTML document shell. Every page goes through page(), so head, header, footer and overlays are never duplicated. */
import { R, esc, U, MODE, write } from "../../lib/site.mjs";
import { IMG } from "../../data/images.mjs";
import { header } from "./header.mjs";
import { footer } from "./footer.mjs";
import { overlays, preloader } from "./overlays.mjs";

/**
 * page({url,title,desc,body,cur,ld,noindex,ogImg,bar,preload})
 * cur: href of the nav item to mark current. bar: show the mobile order bar. noindex: keep out of search engines.
 */
export function page({ url, title, desc, body, cur = "", ld = "", noindex = false, ogImg = IMG.og.src, bar = true, preload = "" }) {
  const home = url === "/";
  const fonts = MODE === "preview" ? "" : `<link rel="preload" href="/assets/fonts/manrope.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="preload" href="/assets/fonts/fraunces.woff2" as="font" type="font/woff2" crossorigin>\n`;
  write(url, `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${R.site}${url === "/404" ? "/" : url}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website">
<meta property="og:url" content="${R.site}${url}"><meta property="og:image" content="${ogImg}"><meta property="og:site_name" content="${R.name}"><meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${ogImg}">
<meta name="robots" content="${noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}">
<meta name="theme-color" content="#0F2E24">
<meta name="zg-base" content="/">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
${fonts}${preload}<link rel="stylesheet" href="/assets/styles.css">
<script>(function(){var d=document.documentElement;d.classList.add("js");try{var r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(!r){if(${home}&&(/[?&]intro/.test(location.search)||!sessionStorage.getItem("zg_intro")))d.classList.add("is-intro");else if(sessionStorage.getItem("zg_tr"))d.classList.add("is-tr")}}catch(e){}})()</script>
${ld}
</head>
<body>
${home ? preloader() : ""}
${header(cur)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
${bar ? `<div class="mbar" data-mbar hidden><a class="btn btn--block" href="${U.cart}"><span>View order <span data-mbar-n>0</span></span><span data-mbar-sum>$0.00</span></a></div>` : ""}
${overlays()}
<noscript><p class="ns">JavaScript is off. You can read the menu. To order, call <a href="tel:${R.tel}">${R.phone}</a>.</p></noscript>
<script src="/assets/config.js"></script><script src="/assets/app.js" defer></script>
</body>
</html>
`);
}
