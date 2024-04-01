import { E } from '../globals/globals';
import $ from '../platform/$';
import { svgPathData as imgSvg, width as imgW, height as imgH } from "@fa/faImage";
import { svgPathData as eyeSvg, width as eyeW, height as eyeH } from "@fa/faEye";
import { svgPathData as expandSvg, width as expandW, height as expandH } from "@fas/faUpRightAndDownLeftFromCenter";
import { svgPathData as commentSvg, width as commentW, height as commentH } from "@fa/faComment";
import { svgPathData as refreshSvg, width as refreshW, height as refreshH } from "@fas/faRotate";
import { svgPathData as wrenchSvg, width as wrenchW, height as wrenchH } from "@fas/faWrench";
import { svgPathData as boltSvg, width as boltW, height as boltH } from "@fas/faBolt";


const toSvg = (svgPathData: string, width: string | number, height: string | number) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 ${width} ${height}" preserveAspectRatio="true">` +
    `<path d="${svgPathData}" fill="currentColor" /></svg>`;
}

const icons = new Map<string, string>()
  .set('image', toSvg(imgSvg, imgW, imgH))
  .set('eye', toSvg(eyeSvg, eyeW, eyeH))
  .set('expand', toSvg(expandSvg, expandW, expandH))
  .set('comment', toSvg(commentSvg, commentW, commentH))
  .set('refresh', toSvg(refreshSvg, refreshW, refreshH))
  .set('wrench', toSvg(wrenchSvg, wrenchW, wrenchH))
  .set('bolt', toSvg(boltSvg, boltW, boltH));


var Icon = {
  set (node: HTMLElement, name: string, altText?: string) {
    const html = icons.get(name);
    if (altText) {
     node.innerHTML = `<span class="icon--alt-text">${E(altText)}</span>${html}`;
    } else {
      node.innerHTML = html;
    }
  }
};

export default Icon;
