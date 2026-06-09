import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(new URL('.', import.meta.url).pathname, '..');
const CDN = 'https://res.cloudinary.com/dfim5nugc/image/upload';

// Width rules by public_id (most specific wins)
const WIDTH_RULES = {
  // Portrait — small display size
  'deepali_bvv2lb':        'w_600,c_limit',
  'deepali_kpgmby':        'w_600,c_limit',
  // Case study thumbnails on homepage — max ~900px display
  'thumb-smartglasses_znjqz4': 'w_900,c_limit',
  'thumb-smartglasses_kbkhh4': 'w_900,c_limit',
  'thumb-babbel_jrlxm9':       'w_900,c_limit',
  'thumb-babbel_pnrbwk':       'w_900,c_limit',
  'thumb-designsystem_me3aqc': 'w_900,c_limit',
  'thumb-designsystem_ezpvwg': 'w_900,c_limit',
  'thumb-smartband_cefrzg':    'w_900,c_limit',
  'thumb-smartband_elkmjt':    'w_900,c_limit',
  'band-no-text_xhhbs3':       'w_900,c_limit',
  // Logos — tiny icons
  'css_af7mpj':       'w_64,c_limit',
  'figma_pmg5w3':     'w_64,c_limit',
  'framer_wnaa7s':    'w_64,c_limit',
  'html_w9yl3g':      'w_64,c_limit',
  'illustrator_wtyctx': 'w_64,c_limit',
  'js_j05kgg':        'w_64,c_limit',
  'ajnalens_rcauxy':  'w_64,c_limit',
  'slaylink_h6ost3':  'w_64,c_limit',
  'subspace_plqiji':  'w_64,c_limit',
};
const DEFAULT_WIDTH = 'w_1400,c_limit';

const FILES = [
  'src/pages/index.astro',
  'src/pages/case-babbel.astro',
  'src/pages/case-designsystem.astro',
  'src/pages/case-lenskart.astro',
  'src/pages/case-smartband.astro',
  'src/pages/article/[slug].astro',
];

for (const rel of FILES) {
  const path = resolve(ROOT, rel);
  let content;
  try { content = readFileSync(path, 'utf8'); } catch { console.warn(`skip: ${rel}`); continue; }

  // Replace every Cloudinary URL: inject width after f_auto,q_auto
  let updated = content.replace(
    new RegExp(`${CDN.replace(/\//g,'\\/')}\/f_auto,q_auto\/([\\w._-]+)`, 'g'),
    (match, publicId) => {
      const w = WIDTH_RULES[publicId] ?? DEFAULT_WIDTH;
      return `${CDN}/f_auto,q_auto,${w}/${publicId}`;
    }
  );

  if (updated !== content) {
    writeFileSync(path, updated, 'utf8');
    console.log(`✓ ${rel}`);
  } else {
    console.log(`– ${rel} (no changes)`);
  }
}
