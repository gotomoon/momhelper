import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_hj56jtRs.mjs';
import { manifest } from './manifest_aLPWUjoa.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin/blog.astro.mjs');
const _page3 = () => import('./pages/admin/posts.astro.mjs');
const _page4 = () => import('./pages/api/auth.astro.mjs');
const _page5 = () => import('./pages/api/posts/add.astro.mjs');
const _page6 = () => import('./pages/api/posts/delete.astro.mjs');
const _page7 = () => import('./pages/api/posts/update.astro.mjs');
const _page8 = () => import('./pages/api/posts.astro.mjs');
const _page9 = () => import('./pages/en/about.astro.mjs');
const _page10 = () => import('./pages/en/about-postpartum-care.astro.mjs');
const _page11 = () => import('./pages/en/book-online.astro.mjs');
const _page12 = () => import('./pages/en/contact.astro.mjs');
const _page13 = () => import('./pages/en/faq.astro.mjs');
const _page14 = () => import('./pages/en/other-services.astro.mjs');
const _page15 = () => import('./pages/en/partner-affiliation.astro.mjs');
const _page16 = () => import('./pages/en/postpartum-care.astro.mjs');
const _page17 = () => import('./pages/en/prenatal-postpartum-info.astro.mjs');
const _page18 = () => import('./pages/en/pricing.astro.mjs');
const _page19 = () => import('./pages/en/privacy.astro.mjs');
const _page20 = () => import('./pages/en/reviews.astro.mjs');
const _page21 = () => import('./pages/en/terms.astro.mjs');
const _page22 = () => import('./pages/en/what-is-postpartum-care.astro.mjs');
const _page23 = () => import('./pages/en.astro.mjs');
const _page24 = () => import('./pages/ko/about.astro.mjs');
const _page25 = () => import('./pages/ko/q-a.astro.mjs');
const _page26 = () => import('./pages/ko/공지사항.astro.mjs');
const _page27 = () => import('./pages/ko/관리사-파트너-제휴.astro.mjs');
const _page28 = () => import('./pages/ko/기타-서비스.astro.mjs');
const _page29 = () => import('./pages/ko/기타-서비스-신청하기.astro.mjs');
const _page30 = () => import('./pages/ko/산전-산후조리-정보.astro.mjs');
const _page31 = () => import('./pages/ko/산후관리-서비스.astro.mjs');
const _page32 = () => import('./pages/ko/산후관리사란.astro.mjs');
const _page33 = () => import('./pages/ko/산후조리-서비스.astro.mjs');
const _page34 = () => import('./pages/ko/산후조리사란.astro.mjs');
const _page35 = () => import('./pages/ko/산후조리에-관하여.astro.mjs');
const _page36 = () => import('./pages/ko/서비스-신청하기.astro.mjs');
const _page37 = () => import('./pages/ko/연락처.astro.mjs');
const _page38 = () => import('./pages/ko/이용약관.astro.mjs');
const _page39 = () => import('./pages/ko/이용요금-2.astro.mjs');
const _page40 = () => import('./pages/ko/이용후기/_slug_.astro.mjs');
const _page41 = () => import('./pages/ko/이용후기.astro.mjs');
const _page42 = () => import('./pages/ko.astro.mjs');
const _page43 = () => import('./pages/rss.xml.astro.mjs');
const _page44 = () => import('./pages/산후조리-서비스.astro.mjs');
const _page45 = () => import('./pages/산후조리사란.astro.mjs');
const _page46 = () => import('./pages/_---blog_/_category_/_---page_.astro.mjs');
const _page47 = () => import('./pages/_---blog_/_tag_/_---page_.astro.mjs');
const _page48 = () => import('./pages/_---blog_/_---page_.astro.mjs');
const _page49 = () => import('./pages/index.astro.mjs');
const _page50 = () => import('./pages/_---blog_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/blog.astro", _page2],
    ["src/pages/admin/posts.astro", _page3],
    ["src/pages/api/auth.ts", _page4],
    ["src/pages/api/posts/add.ts", _page5],
    ["src/pages/api/posts/delete.ts", _page6],
    ["src/pages/api/posts/update.ts", _page7],
    ["src/pages/api/posts.ts", _page8],
    ["src/pages/en/about.astro", _page9],
    ["src/pages/en/about-postpartum-care.astro", _page10],
    ["src/pages/en/book-online.astro", _page11],
    ["src/pages/en/contact.astro", _page12],
    ["src/pages/en/faq.astro", _page13],
    ["src/pages/en/other-services.astro", _page14],
    ["src/pages/en/partner-affiliation.astro", _page15],
    ["src/pages/en/postpartum-care.astro", _page16],
    ["src/pages/en/prenatal-postpartum-info.astro", _page17],
    ["src/pages/en/pricing.astro", _page18],
    ["src/pages/en/privacy.astro", _page19],
    ["src/pages/en/reviews.astro", _page20],
    ["src/pages/en/terms.astro", _page21],
    ["src/pages/en/what-is-postpartum-care.astro", _page22],
    ["src/pages/en/index.astro", _page23],
    ["src/pages/ko/about.astro", _page24],
    ["src/pages/ko/q-a/index.astro", _page25],
    ["src/pages/ko/공지사항/index.astro", _page26],
    ["src/pages/ko/관리사-파트너-제휴/index.astro", _page27],
    ["src/pages/ko/기타-서비스/index.astro", _page28],
    ["src/pages/ko/기타-서비스-신청하기/index.astro", _page29],
    ["src/pages/ko/산전-산후조리-정보/index.astro", _page30],
    ["src/pages/ko/산후관리-서비스/index.astro", _page31],
    ["src/pages/ko/산후관리사란/index.astro", _page32],
    ["src/pages/ko/산후조리-서비스/index.astro", _page33],
    ["src/pages/ko/산후조리사란/index.astro", _page34],
    ["src/pages/ko/산후조리에-관하여/index.astro", _page35],
    ["src/pages/ko/서비스-신청하기/index.astro", _page36],
    ["src/pages/ko/연락처/index.astro", _page37],
    ["src/pages/ko/이용약관/index.astro", _page38],
    ["src/pages/ko/이용요금-2/index.astro", _page39],
    ["src/pages/ko/이용후기/[slug].astro", _page40],
    ["src/pages/ko/이용후기/index.astro", _page41],
    ["src/pages/ko/index.astro", _page42],
    ["src/pages/rss.xml.ts", _page43],
    ["src/pages/산후조리-서비스/index.astro", _page44],
    ["src/pages/산후조리사란/index.astro", _page45],
    ["src/pages/[...blog]/[category]/[...page].astro", _page46],
    ["src/pages/[...blog]/[tag]/[...page].astro", _page47],
    ["src/pages/[...blog]/[...page].astro", _page48],
    ["src/pages/index.astro", _page49],
    ["src/pages/[...blog]/index.astro", _page50]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "1460accc-abe5-45ca-83ba-a2fe734d7979",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
