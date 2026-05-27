// Dev: empty prefix → files served from public/ (local dev server)
// Prod: CDN prefix → jsDelivr for images, GitHub raw for LFS videos
const isProd = process.env.NODE_ENV === 'production'
export const IMG_CDN = isProd
  ? 'https://cdn.jsdelivr.net/gh/dhbaleswar97/Urban-Trim@main/public'
  : ''
export const VID_CDN = isProd
  ? 'https://raw.githubusercontent.com/dhbaleswar97/Urban-Trim/main/public'
  : ''
