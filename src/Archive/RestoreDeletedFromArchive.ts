import Redirect from './Redirect';
import Notice from '../classes/Notice';
import { Conf, g } from '../globals/globals';
import CrossOrigin from '../platform/CrossOrigin';
import $ from '../platform/$';
import Header from '../General/Header';
import { type RawArchivePost, parseArchivePost } from './Parse';
import QuoteThreading from '../Quotelinks/QuoteThreading';

const RestoreDeletedFromArchive = {
  restore() {
    const url = Redirect.to('threadJSON', { boardID: g.boardID, threadID: g.threadID });
    if (!url) {
      new Notice('warning', 'No archive found', 3);
      return;
    }
    const encryptionOK = url.startsWith('https://');
    if (encryptionOK || Conf['Exempt Archives from Encryption']) {
      CrossOrigin.ajax(url, function (this: XMLHttpRequest) {
        if (this.status >= 400) {
          const domain = new URL(url).origin;
          new Notice('error', $.el('div', {
              innerHTML: 'There was an error while fetching from the archive. See the console for details.<br />' +
                'Some archive check the browser first before checking content, you might need to open the archive ' +
                `first to get past the browser check: <a href="${domain}" target="_blank">${domain}</a><br />` +
                'If that doesn\'t work, try a different archive under Settings > Advanced > Archives > Thread fetching.'
            }));
          console.error(this);
          return;
        }
        let nrRestored = 0;
        const archivePosts = this.response[g.threadID.toString()].posts as Record<string, RawArchivePost>;
        for (const [postID, raw] of Object.entries(archivePosts)) {
          const key = `${g.boardID}.${postID}`
          if (!g.posts.keys.includes(key)) {
            const postIdNr = +postID;
            const newPost = parseArchivePost(raw);
            const newPostIndex = g.posts.insert(key, newPost, key => +(key.split('.')[1]) < postIdNr);
            newPost.resurrect();
            newPost.markAsFromArchive();

            if (Conf['Thread Quotes']) {
              newPost.thread.nodes.root.insertAdjacentElement('beforeend', newPost.root);
            } else {
              g.posts.get(g.posts.keys[newPostIndex - 1]).root.insertAdjacentElement('afterend', newPost.root);
            }

            QuoteThreading.insert(newPost);

            ++nrRestored;
          }
        }

        let msg: string;
        if (nrRestored === 0) {
          msg = 'No removed posts found';
        } else if (nrRestored === 1) {
          msg = '1 post restored';
        } else {
          msg = `${nrRestored} posts restored`;
        }

        new Notice('info', msg, 3);
      });
    }
  },

  init() {
    if (g.VIEW !== 'thread') return;

    const menuEntry = $.el('a', {
      href: 'javascript:;',
      textContent: 'Restore from archive',
    });
    $.on(menuEntry, 'click', () => {
      RestoreDeletedFromArchive.restore();
      Header.menu.close();
    });
    Header.menu.addEntry({
      el: menuEntry,
      order: 10,
    });
  },
}

export default RestoreDeletedFromArchive;