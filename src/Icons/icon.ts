import { E } from '../globals/globals';
import { isEscaped, type EscapedHtml } from '../globals/jsx';
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
import { svgPathData as shuffleSvg, width as shuffleW, height as shuffleH } from "@fas/faShuffle";
import { svgPathData as undoSvg, width as undoW, height as undoH } from "@fas/faRotateLeft";
import { svgPathData as downloadSvg, width as downloadW, height as downloadH } from "@fas/faDownload";
import { svgPathData as bookOpenSvg, width as bookOpenW, height as bookOpenH } from "@fas/faBookOpen";
import { svgPathData as shrinkSvg, width as shrinkW, height as shrinkH } from "@fas/faDownLeftAndUpRightToCenter";
import { svgPathData as heartSvg, width as heartW, height as heartH } from "@fas/faHeart";
import { svgPathData as caretRightSvg, width as caretRightW, height as caretRightH } from "@fas/faCaretRight";
import { svgPathData as caretLeftSvg, width as caretLeftW, height as caretLeftH } from "@fas/faCaretLeft";
import { svgPathData as caretDownSvg, width as caretDownW, height as caretDownH } from "@fas/faCaretDown";
import { svgPathData as scissorsSvg, width as scissorsW, height as scissorsH } from "@fas/faScissors";
import { svgPathData as xmarkSvg, width as xmarkW, height as xmarkH } from "@fas/faXmark";
import { svgPathData as arrowRightLongSvg, width as arrowRightLongW, height as arrowRightLongH } from "@fas/faArrowRightLong";
import { svgPathData as plusSvg, width as plusW, height as plusH } from "@fas/faPlus";
import { svgPathData as squarePlusSvg, width as squarePlusW, height as squarePlusH } from "@fa/faSquarePlus";
import { svgPathData as squareMinusSvg, width as squareMinusW, height as squareMinusH } from "@fa/faSquareMinus";
import { svgPathData as playSvg, width as playW, height as playH } from "@fas/faPlay";
import { svgPathData as stopSvg, width as stopW, height as stopH } from "@fas/faStop";


const toSvg = (svgPathData: string, width: string | number, height: string | number) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 ${width} ${height}">` +
    `<path d="${svgPathData}" fill="currentColor" /></svg>`;
}

const icons = {
   image:           toSvg(imgSvg, imgW, imgH),
   eye:             toSvg(eyeSvg, eyeW, eyeH),
   expand:          toSvg(expandSvg, expandW, expandH),
   comment:         toSvg(commentSvg, commentW, commentH),
   refresh:         toSvg(refreshSvg, refreshW, refreshH),
   wrench:          toSvg(wrenchSvg, wrenchW, wrenchH),
   bolt:            toSvg(boltSvg, boltW, boltH),
   link:            toSvg(linkSvg, linkW, linkH),
   pencil:          toSvg(pencilSvg, pencilW, pencilH),
   clipboard:       toSvg(clipboardSvg, clipboardW, clipboardH),
   clock:           toSvg(clockSvg, clockW, clockH),
   shuffle:         toSvg(shuffleSvg, shuffleW, shuffleH),
   undo:            toSvg(undoSvg, undoW, undoH),
   download:        toSvg(downloadSvg, downloadW, downloadH),
   bookOpen:        toSvg(bookOpenSvg, bookOpenW, bookOpenH),
   shrink:          toSvg(shrinkSvg, shrinkW, shrinkH),
   heart:           toSvg(heartSvg, heartW, heartH),
   caretRight:      toSvg(caretRightSvg, caretRightW, caretRightH),
   caretLeft:       toSvg(caretLeftSvg, caretLeftW, caretLeftH),
   caretDown:       toSvg(caretDownSvg, caretDownW, caretDownH),
   scissors:        toSvg(scissorsSvg, scissorsW, scissorsH),
   xmark:           toSvg(xmarkSvg, xmarkW, xmarkH),
   arrowRightLong:  toSvg(arrowRightLongSvg, arrowRightLongW, arrowRightLongH),
   plus:            toSvg(plusSvg, plusW, plusH),
   squarePlus:      toSvg(squarePlusSvg, squarePlusW, squarePlusH),
   squareMinus:     toSvg(squareMinusSvg, squareMinusW, squareMinusH),
   play:            toSvg(playSvg, playW, playH),
   stop:            toSvg(stopSvg, stopW, stopH)
} as const;

var Icon = {
  /** Sets an icon in an HTML element */
  set (node: HTMLElement, name: keyof typeof icons, altText?: string) {
    const html = icons[name];
    if (!html) throw new Error(`Icon "${name}" not found.`);
    if (altText) {
      node.innerHTML = `<span class="icon--alt-text">${E(altText)}</span>${html}`;
    } else {
      node.innerHTML = html;
    }
  },

  /** Get the raw SVG string for an icon. */
  get(name: keyof typeof icons): string {
    return icons[name];
  },

  /** Get the raw SVG string for an icon wrapped for use in JSX. */
  raw(name: keyof typeof icons): EscapedHtml {
    return { innerHTML: icons[name], [isEscaped]: true };
  },
};

export default Icon;