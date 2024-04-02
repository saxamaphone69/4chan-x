import { E } from '../globals/globals';
import { svgPathData as imgSvg, width as imgW, height as imgH } from "@fa/faImage";
import { svgPathData as eyeSvg, width as eyeW, height as eyeH } from "@fa/faEye";
import { svgPathData as expandSvg, width as expandW, height as expandH } from "@fas/faUpRightAndDownLeftFromCenter";
import { svgPathData as commentSvg, width as commentW, height as commentH } from "@fa/faComment";
import { svgPathData as refreshSvg, width as refreshW, height as refreshH } from "@fas/faRotate";
import { svgPathData as wrenchSvg, width as wrenchW, height as wrenchH } from "@fas/faWrench";
import { svgPathData as boltSvg, width as boltW, height as boltH } from "@fas/faBolt";
import { svgPathData as pencilSvg, width as pencilW, height as pencilH } from "@fas/faPencil";
import { svgPathData as clipboardSvg, width as clipboardW, height as clipboardH } from "@fas/faClipboard";
import { svgPathData as clockSvg, width as clockW, height as clockH } from "@fa/faClock";
import { svgPathData as linkSvg, width as linkW, height as linkH } from "@fas/faLink";


const toSvg = (svgPathData: string, width: string | number, height: string | number) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 ${width} ${height}">` +
    `<path d="${svgPathData}" fill="currentColor" /></svg>`;
}

const icons = new Map<string, string>()
  .set('image', toSvg(imgSvg, imgW, imgH))
  .set('eye', toSvg(eyeSvg, eyeW, eyeH))
  .set('expand', toSvg(expandSvg, expandW, expandH))
  .set('comment', toSvg(commentSvg, commentW, commentH))
  .set('refresh', toSvg(refreshSvg, refreshW, refreshH))
  .set('wrench', toSvg(wrenchSvg, wrenchW, wrenchH))
  .set('bolt', toSvg(boltSvg, boltW, boltH))
  .set('link', toSvg(linkSvg, linkW, linkH))
  .set('pencil', toSvg(pencilSvg, pencilW, pencilH))
  .set('clipboard', toSvg(clipboardSvg, clipboardW, clipboardH))
  .set('clock', toSvg(clockSvg, clockW, clockH));

var Icon = {
  set (node: HTMLElement, name: string, altText?: string) {
    const html = icons.get(name);
    if (!html) throw new Error(`Icon "${name}" not found.`);
    if (altText) {
     node.innerHTML = `<span class="icon--alt-text">${E(altText)}</span>${html}`;
    } else {
      node.innerHTML = html;
    }
  }
};

export default Icon;
