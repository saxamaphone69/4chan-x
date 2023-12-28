import Callbacks from "../classes/Callbacks";
import type Post from "../classes/Post";
import RandomAccessList from "../classes/RandomAccessList";
import Header from "../General/Header";
import { Conf, d, g } from "../globals/globals";
import ReplyPruning from "../Monitoring/ReplyPruning";
import Unread from "../Monitoring/Unread";
import $ from "../platform/$";
import { dict } from "../platform/helpers";

/*
  <3 aeosynth
*/

var QuoteThreading = {
  init() {
    if (!Conf['Quote Threading'] || (g.VIEW !== 'thread')) { return; }

    this.controls = $.el('label',
      {innerHTML: "<input id=\"threadingControl\" name=\"Thread Quotes\" type=\"checkbox\"> Threading"});

    this.threadNewLink = $.el('span', {
      className: 'brackets-wrap threadnewlink',
      hidden: true
    }
    );
    $.extend(this.threadNewLink, {innerHTML: "<a href=\"javascript:;\">Thread New Posts</a>"});

    this.input = $('input', this.controls);
    this.input.checked = Conf['Thread Quotes'];

    $.on(this.input, 'change', this.setEnabled);
    $.on(this.input, 'change', this.rethread);
    $.on(this.threadNewLink.firstElementChild, 'click', this.rethread);
    $.on(d, '4chanXInitFinished', () => { this.ready = true; });

    Header.menu.addEntry(this.entry = {
      el:    this.controls,
      order: 99
    }
    );

    Callbacks.Thread.push({
      name: 'Quote Threading',
      cb:   this.setThread
    });

    Callbacks.Post.push({
      name: 'Quote Threading',
      cb:   this.node
    });
  },

  parent:   dict(),
  children: dict(),
  inserted: dict(),
  lastID: 0,

  toggleThreading() {
    this.setThreadingState(!Conf['Thread Quotes']);
  },

  setThreadingState(enabled) {
    this.input.checked = enabled;
    this.setEnabled.call(this.input);
    this.rethread.call(this.input);
  },

  setEnabled() {
    if (this.checked) {
      $.set('Prune All Threads', false);
      const other = ReplyPruning.inputs?.enabled;
      if (other?.checked) {
        other.checked = false;
        $.event('change', null, other);
      }
    }
    $.cb.checked.call(this);
  },

  setThread() {
    QuoteThreading.thread = this;
    $.asap((() => !Conf['Thread Updater'] || $('.navLinksBot > .updatelink')), function() {
      let navLinksBot;
      if (navLinksBot = $('.navLinksBot')) { $.add(navLinksBot, [$.tn(' '), QuoteThreading.threadNewLink]); }
    });
  },

  /**
   * @param retroactive Whether the function is ran retroactively on posts connected to one restored from an archive.
   * If it's not passed, a post that isn't the newest post triggers this function is called again with parent and child
   * posts to insert it in the thread.
   */
  node(this: Post, retroactive = false) {
    let parent;
    if (this.isFetchedQuote || this.isClone || !this.isReply) { return; }

    if (!retroactive) {
      if (this.ID < QuoteThreading.lastID) {
        // Post was inserted from archive, it might be higher up in a chain
        for (const backLink of this.nodes.backlinks) {
          const [, board, number] = backLink.href.match(/\/([a-z]+)\/thread\/\d+#p(\d+)$/);
          QuoteThreading.node.call(g.posts.get(`${board}.${number}`), true);
        }

        if (this.quotes.length) {
          QuoteThreading.shouldReThread();
          for (var quote of this.quotes) {
            const parent = g.posts.get(quote);
            if (parent) QuoteThreading.node.call(parent, true);
          }
        }
      } else {
        QuoteThreading.lastID = this.ID;
      }
    }

    const parents = new Set();
    let lastParent = null;
    for (var quote of this.quotes) {
      if ((parent = g.posts.get(quote))) {
        if (!parent.isFetchedQuote && parent.isReply && (parent.ID < this.ID)) {
          parents.add(parent.ID);
          if (!lastParent || (parent.ID > lastParent.ID)) { lastParent = parent; }
        }
      }
    }

    if (!lastParent) return;

    let ancestor = lastParent;
    while ((ancestor = QuoteThreading.parent[ancestor.fullID])) {
      parents.delete(ancestor.ID);
    }

    if (parents.size === 1) {
      QuoteThreading.parent[this.fullID] = lastParent;
    }
  },

  descendants(post) {
    let children;
    let posts = [post];
    if (children = QuoteThreading.children[post.fullID]) {
      for (var child of children) {
        posts = posts.concat(QuoteThreading.descendants(child));
      }
    }
    return posts;
  },

  insert(post) {
    let parent, x;
    if (!(
      Conf['Thread Quotes'] &&
      (parent = QuoteThreading.parent[post.fullID]) &&
      !QuoteThreading.inserted[post.fullID]
    )) { return false; }

    const descendants = QuoteThreading.descendants(post);
    if (!Unread.posts.has(parent.ID)) {
      if ((function() { for (var x of descendants) { if (Unread.posts.has(x.ID)) { return true; } } })()) {
        QuoteThreading.threadNewLink.hidden = false;
        return false;
      }
    }

    const {order} = Unread;
    const children = (QuoteThreading.children[parent.fullID] || (QuoteThreading.children[parent.fullID] = []));
    const threadContainer = parent.nodes.threadContainer || $.el('div', {className: 'threadContainer'});
    const nodes = [post.nodes.root];
    if (post.nodes.threadContainer) { nodes.push(post.nodes.threadContainer); }

    let i = children.length;
    for (let j = children.length - 1; j >= 0; j--) { var child = children[j]; if (child.ID >= post.ID) { i--; } }
    if (i !== children.length) {
      const next = children[i];
      for (x of descendants) { order.before(order[next.ID], order[x.ID]); }
      children.splice(i, 0, post);
      $.before(next.nodes.root, nodes);
    } else {
      let prev2;
      let prev = parent;
      while ((prev2 = QuoteThreading.children[prev.fullID]) && prev2.length) {
        prev = prev2[prev2.length-1];
      }
      for (let k = descendants.length - 1; k >= 0; k--) { x = descendants[k]; order.after(order[prev.ID], order[x.ID]); }
      children.push(post);
      $.add(threadContainer, nodes);
    }

    QuoteThreading.inserted[post.fullID] = true;

    if (!parent.nodes.threadContainer) {
      parent.nodes.threadContainer = threadContainer;
      $.addClass(parent.nodes.root, 'threadOP');
      // Put in the post if it isn't in the dom already. This happens with posts restored from the archive.
      // I'm not sure where if this is the right place to do that.
      if (!d.contains(parent.nodes.root)) $.add(parent.thread.nodes.root, parent.nodes.root);
      $.after(parent.nodes.root, threadContainer);
    }

    return true;
  },

  rethread() {
    if (!QuoteThreading.ready) { return; }
    const {thread} = QuoteThreading;
    const {posts} = thread;

    QuoteThreading.threadNewLink.hidden = true;

    if (Conf['Thread Quotes']) {
      posts.forEach(QuoteThreading.insert);
    } else {
      const nodes = [];
      Unread.order = new RandomAccessList();
      QuoteThreading.inserted = dict();
      posts.forEach(function(post) {
        if (post.isFetchedQuote) { return; }
        Unread.order.push(post);
        if (post.isReply) { nodes.push(post.nodes.root); }
        if (QuoteThreading.children[post.fullID]) {
          delete QuoteThreading.children[post.fullID];
          $.rmClass(post.nodes.root, 'threadOP');
          $.rm(post.nodes.threadContainer);
          delete post.nodes.threadContainer;
        }
      });
      $.add(thread.nodes.root, nodes);
    }

    Unread.position = Unread.order.first;
    Unread.updatePosition();
    Unread.setLine(true);
    Unread.read();
    Unread.update();
  },

  rethreadQueued: false,

  /** When a post from the archive has an existing child post, the threading has to be re-run. */
  shouldReThread() {
    if (this.rethreadQueued) return;
    Promise.resolve().then(() => {
      this.rethread();
      this.rethreadQueued = false
    });
    this.rethreadQueued = true;
  },
};
export default QuoteThreading;
