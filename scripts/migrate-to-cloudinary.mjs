import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const CDN = 'https://res.cloudinary.com/dfim5nugc/image/upload/f_auto,q_auto';

const MAP = {
  '/assets/deepali.jpeg':                      `${CDN}/deepali_bvv2lb`,
  '/assets/babbel.png':                        `${CDN}/babbel_jv87pf`,
  '/assets/design-system.png':                 `${CDN}/design-system_rrjluf`,
  '/assets/lenskart.png':                      `${CDN}/lenskart_ip8wjw`,
  '/assets/thumb-babbel.png':                  `${CDN}/thumb-babbel_jrlxm9`,
  '/assets/thumb-designsystem.png':            `${CDN}/thumb-designsystem_me3aqc`,
  '/assets/thumb-smartband.png':               `${CDN}/thumb-smartband_cefrzg`,
  '/assets/thumb-smartglasses.png':            `${CDN}/thumb-smartglasses_znjqz4`,
  // babbel
  '/assets/babbel/connect-screens.png':        `${CDN}/connect-screens_ggpzzb`,
  '/assets/babbel/explore-compare.png':        `${CDN}/explore-compare_m3ttrx`,
  '/assets/babbel/home-compare.png':           `${CDN}/home-compare_y5j5gw`,
  '/assets/babbel/new-screens.png':            `${CDN}/new-screens_h5bdm4`,
  '/assets/babbel/old-screens.png':            `${CDN}/old-screens_duvmjn`,
  '/assets/babbel/profile-annotated.png':      `${CDN}/profile-annotated_x3j2jg`,
  '/assets/babbel/sitemap.png':                `${CDN}/sitemap_uyhgo3`,
  '/assets/babbel/style-guide.png':            `${CDN}/style-guide_picedd`,
  '/assets/babbel/wireframes.png':             `${CDN}/wireframes_izw4ek`,
  // designsystem
  '/assets/designsystem/components-grid.png':  `${CDN}/components-grid_r3lphc`,
  '/assets/designsystem/switch-modes.gif':     `${CDN}/switch-modes_vbxueo`,
  '/assets/designsystem/system-spec.png':      `${CDN}/system-spec_huowny`,
  // lenskart
  '/assets/lenskart/buddy-chat.png':           `${CDN}/buddy-chat_bhrizw`,
  '/assets/lenskart/gallery.png':              `${CDN}/gallery_w3ngcx`,
  '/assets/lenskart/glasses-hero.png':         `${CDN}/glasses-hero_gwa4no`,
  '/assets/lenskart/home.png':                 `${CDN}/home_wvgkgd`,
  '/assets/lenskart/look-tell-howto.png':      `${CDN}/look-tell-howto_w6yeb7`,
  '/assets/lenskart/look-tell-instructions.png': `${CDN}/look-tell-instructions_lqr14r`,
  '/assets/lenskart/look-tell-main.png':       `${CDN}/look-tell-main_n0jwwh`,
  '/assets/lenskart/look-tell.png':            `${CDN}/look-tell_u6m68y`,
  '/assets/lenskart/nutrition.png':            `${CDN}/nutrition_j2yzov`,
  '/assets/lenskart/pairing.png':              `${CDN}/pairing_eqoxtk`,
  '/assets/lenskart/settings.png':             `${CDN}/settings_dxpl0g`,
  // logos
  '/assets/logos/ajnalens.png':                `${CDN}/ajnalens_rcauxy`,
  '/assets/logos/css.png':                     `${CDN}/css_af7mpj`,
  '/assets/logos/figma.png':                   `${CDN}/figma_pmg5w3`,
  '/assets/logos/framer.png':                  `${CDN}/framer_wnaa7s`,
  '/assets/logos/html.png':                    `${CDN}/html_w9yl3g`,
  '/assets/logos/illustrator.png':             `${CDN}/illustrator_wtyctx`,
  '/assets/logos/js.png':                      `${CDN}/js_j05kgg`,
  '/assets/logos/slaylink.png':                `${CDN}/slaylink_h6ost3`,
  '/assets/logos/subspace.png':                `${CDN}/subspace_plqiji`,
  // mai
  '/assets/mai/activity.png':                  `${CDN}/activity_qo2abu`,
  '/assets/mai/at-glance.png':                 `${CDN}/at-glance_q2czoz`,
  '/assets/mai/band-no-text.png':              `${CDN}/band-no-text_xhhbs3`,
  '/assets/mai/band.png':                      `${CDN}/band_gm9esy`,
  '/assets/mai/chat.png':                      `${CDN}/chat_n01zjd`,
  '/assets/mai/day-11.png':                    `${CDN}/day-11_nfbonx`,
  '/assets/mai/home.png':                      `${CDN}/home_g4zcbs`,
  '/assets/mai/learn.png':                     `${CDN}/learn_r6n8wq`,
  '/assets/mai/plan-tree.png':                 `${CDN}/plan-tree_edf1go`,
  '/assets/mai/profile.png':                   `${CDN}/profile_f0fhce`,
  '/assets/mai/research.png':                  `${CDN}/research_vf6ntf`,
  '/assets/mai/skin-type.png':                 `${CDN}/skin-type_axglvy`,
};

const FILES = [
  'src/pages/index.astro',
  'src/pages/case-babbel.astro',
  'src/pages/case-designsystem.astro',
  'src/pages/case-lenskart.astro',
  'src/pages/case-smartband.astro',
  'src/pages/article.astro',
  'src/layouts/BaseLayout.astro',
];

const ROOT = resolve(new URL('.', import.meta.url).pathname, '..');

for (const rel of FILES) {
  const path = resolve(ROOT, rel);
  let content;
  try { content = readFileSync(path, 'utf8'); } catch { console.warn(`skip: ${rel}`); continue; }

  let updated = content;
  for (const [local, cdn] of Object.entries(MAP)) {
    updated = updated.replaceAll(local, cdn);
  }

  if (updated !== content) {
    writeFileSync(path, updated, 'utf8');
    const count = [...content.matchAll(/\/assets\//g)].length - [...updated.matchAll(/\/assets\//g)].length;
    console.log(`✓ ${rel}  (${count} replaced)`);
  } else {
    console.log(`– ${rel}  (no changes)`);
  }
}

// Check for any remaining /assets/ references
console.log('\nChecking for remaining /assets/ references...');
for (const rel of FILES) {
  const path = resolve(ROOT, rel);
  let content;
  try { content = readFileSync(path, 'utf8'); } catch { continue; }
  const remaining = [...content.matchAll(/\/assets\/[^\s"']+/g)].map(m => m[0]);
  if (remaining.length) console.log(`  ${rel}: ${remaining.join(', ')}`);
}
