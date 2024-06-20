import $ from '../../platform/$';
import Icon from '../../Icons/icon';
import Linkify from '../Linkify';
import h, { type EscapedHtml, hFragment, isEscaped } from '../../globals/jsx';
import Time from '../../Miscellaneous/Time';
import CrossOrigin from '../../platform/CrossOrigin';
import { Conf } from '../../globals/globals';

export default function EmbedFxTwitter(a: HTMLAnchorElement): HTMLElement {
  const el = $.el('div', { innerHTML: '<blockquote class="twitter-tweet">Loading&hellip;</blockquote>' });
  const shouldTranslate = Conf.fxtLang ? `/${Conf.fxtLang}` : '';
  CrossOrigin.cachePromise(`${Conf.fxtUrl}/${a.dataset.uid}${shouldTranslate}`).then(async req => {
    if (req.status === 404) {
      el.textContent = '404: tweet not found';
      return;
    }

    const { tweet } = req.response;

    // console.log(tweet);

    async function getReplies(tweet) {
      if (!tweet?.replying_to_status) {
        return [];
      }
      const max_replies = +Conf.fxtMaxReplies;
      let replies = [];
      replies.push(tweet);
      for (let i = 0; i < max_replies; i++) {
        const replyReq = await CrossOrigin.cachePromise(
          `https://api.fxtwitter.com/${replies[i].replying_to}/status/${replies[i].replying_to_status}${shouldTranslate}`
        );
        const replyRes = replyReq.response;
        replies.push(replyRes.tweet);
        if (!replyRes.tweet?.replying_to_status) {
          break;
        }
      }
      return replies;
    }

    const replies = (+Conf.fxtMaxReplies) === 0 ? [] : await getReplies(tweet);

    function renderMedia(tweet): EscapedHtml[] {
      return tweet.media?.all?.map(media => {
        switch (media.type) {
          case 'photo':
            return <div class="fxt-media">
              <a href={media.url} target="_blank" referrerpolicy="no-referrer">
                <img src={media.url} alt={media.altText} width={media.width} height={media.height}
                  referrerpolicy="no-referrer" />
              </a>
            </div>;
          case 'video':
          case 'gif':
            return <div class="fxt-media">
              <video controls width={media.width} height={media.height} poster={media.thumbnail_url} preload="meta">
                <source src={media.url} type={media.format} />
              </video>
            </div>;
          default:
            console.warn(`FxTwitter media type ${media.type} not recognized`);
        }
      }) || [];
    }

    function renderDate(tweet) {
      return Time.format(new Date(tweet.created_at));
    }

    function renderPoll(tweet): EscapedHtml {
      let maxPercentage = 0;
      let maxChoiceIndex = -1;
      tweet.poll.choices.forEach((choice, index) => {
        if (choice.percentage > maxPercentage) {
          maxPercentage = choice.percentage;
          maxChoiceIndex = index;
        }
      });

      return <div class="fxt-poll">
        {...tweet.poll.choices.map((choice, index) =>
          <div class={`fxt-choice ${index === maxChoiceIndex ? 'highlight' : ''}`}>
            <span class="choice_label">{choice.label}</span>
            <span class="choice_percentage">{choice.percentage}%</span>
            <div class="bar" style={`width: ${choice.percentage}%`} />
          </div>
        )}
        <div class="total-votes">{tweet.poll.total_votes.toLocaleString()} votes</div>
      </div>;
    }

    function renderTranslation(tweet): EscapedHtml | '' {
      if (!tweet?.translation?.target_lang || tweet?.translation?.source_lang === tweet?.translation?.target_lang) {
        return '';
      }
      return <>
        <hr />
        <p>Translated from {tweet.translation.source_lang_en}</p>
        <p lang={tweet.translation.target_lang}>{...renderText(tweet.translation.text)}</p>
      </>
    }

    function renderMeta(tweet): EscapedHtml {
      return <div class="fxt-meta">
        <a class="fxt-meta_profile" href={tweet.author.url} title={tweet.author.description} target="_blank"
          referrerpolicy="no-referrer">
          <img src={tweet.author.avatar_url} referrerpolicy="no-referrer" />
          <div class="fxt-meta_author">
            <span class="fxt-meta_author_username">{tweet.author.name}</span>
            <span class="fxt-meta_author_account">@{tweet.author.screen_name}</span>
          </div>
        </a>
        <a href={tweet.url} title="Open tweet in a new tab" target="_blank" referrerpolicy="no-referrer">
          {Icon.raw('link')}
        </a>
      </div>;
    }

    function renderText(inputText: string): (EscapedHtml | string)[] {
      const result = [];
      let endLast = 0;

      for (const match of inputText.matchAll(/(?:@|\#)\w+/g)) {
        result.push(
          inputText.slice(endLast, match.index),
          <a href={`https://x.com/${match[0].startsWith('#') ? 'hashtag/' : ''}${match[0].slice(1)}`} target="_blank"
            referrerpolicy="no-referrer">
            {match[0]}
          </a>
        );
        endLast = match.index + match[0].length;
      }
      result.push(inputText.slice(endLast));
      return result;
    }

    function renderQuote(tweet, renderNested = false): EscapedHtml {
      const quote_nested = (tweet?.quote && renderNested) ? renderQuote(tweet.quote, false) : '';
      const quote_poll = (tweet?.poll) ? renderPoll(tweet) : ''
      const quote_translation = renderTranslation(tweet);
      const media = tweet.media?.all ? renderMedia(tweet) : [];

      return <div class="fxt-quote">
        {renderMeta(tweet)}
        <div class="fxt-text" lang={tweet.lang}>
          {...renderText(tweet.text)}
          {quote_translation}
        </div>
        <div class={`fxt-media_container ${tweet.media?.all?.length > 1 ? 'fxt-media-multiple' : ''}`}>
          {quote_poll}
          {...media}
        </div>
        {quote_nested}
      </div>;
    }

    let repliesJsx: EscapedHtml[] = [];
    if (replies.length > 1) {
      repliesJsx.push({ innerHTML: "<em>Replying To</em><br/>", [isEscaped]: true });
      for (let i = replies.length - 1; i > 0; i--) {
        repliesJsx.push(renderQuote(replies[i], true));
      }
    }

    const media = renderMedia(tweet);
    const quote = (tweet?.quote) ? renderQuote(tweet.quote) : ''

    const poll = (tweet?.poll) ? renderPoll(tweet) : '';
    const created_at = renderDate(tweet);

    const translation = (shouldTranslate) ? renderTranslation(tweet) : '';

    const innerHTML: EscapedHtml = <article class="fxt-card">
      {renderMeta(tweet)}
      <div class="fxt-text" lang={tweet.lang}>
        {...renderText(tweet.text)}
        {translation}
      </div>
      <div class={`fxt-media_container ${tweet.media?.all?.length > 1 ? 'fxt-media-multiple' : ''}`}>
        {poll}
        {...media}
      </div>
      {quote}
      <div class="fxt-stats">
        <div class="fxt-stats_time">{created_at}</div>
        <div class="fxt-stats_meta">
          <span class="fxt-likes">
            {Icon.raw("comment")}
            {tweet.replies.toLocaleString()}
          </span>
          <span class="fxt-reposts">
            {Icon.raw("shuffle")}
            {tweet.retweets.toLocaleString()}
          </span>
          <span class="fxt-replies">
            {Icon.raw("heart")}
            {tweet.likes.toLocaleString()}
          </span>
        </div>
      </div>
    </article>;

    el.innerHTML = innerHTML.innerHTML;
    for (const textEl of el.getElementsByClassName('fxt-text')) {
      Linkify.process(textEl);
    }

    el.style.resize = null;
    el.style.height = 'fit-content';
    el.style.width = 'fit-content';
    el.style.overflow = 'auto';
  });
  return el;
}