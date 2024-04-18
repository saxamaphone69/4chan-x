## 4chan XT changelog

4chan XT uses a different user script namespace, so to migrate you need to export settings from 4chan X, and import them
in XT.

### 2.8.0 (2024-04-18)

- Fixed post hiding on poster ID not applying to new posts.
  [#41 (comment)](https://github.com/TuxedoTako/4chan-xt/issues/41#issuecomment-2057981978)
- Fixed semicolon in Yotsuba B CSS [#48](https://github.com/TuxedoTako/4chan-xt/pull/48)
- Capitalized "Watcher" in the header for consistency. [#49](https://github.com/TuxedoTako/4chan-xt/pull/49)
- To address the restore from archive issues [#51](https://github.com/TuxedoTako/4chan-xt/issues/51):
  - Added an error message when fetching fails instead of failing silently.
  - Added option to select archive to fetch from.
- Counting poster IDs is now used as a fallback for the missing IP count.
  [#52](https://github.com/TuxedoTako/4chan-xt/issues/52)
- Trying to fetch the captcha in /biz/ without verified email verification now shows the error to the user instead of
  failing silently. [#53](https://github.com/TuxedoTako/4chan-xt/issues/53)

### 2.7.1 (2024-04-12)

- Right-align shortcut icons in header when header links are centered.
  [#45](https://github.com/TuxedoTako/4chan-xt/pull/45)
- OneeChan compatibility fixes:
  - Do not apply highlights of your posts and replies when OneeChan is detected since the CSS specificity from XT was
    higher. [#43](https://github.com/TuxedoTako/4chan-xt/issues/43)
  - Switched from `overflow: clip;` to `overflow: auto;` on posts.
    [#44](https://github.com/TuxedoTako/4chan-xt/issues/44)
- Fixed Expand/Contract All Images icon in the header. [#47](https://github.com/TuxedoTako/4chan-xt/issues/47)

### 2.7.0 (2024-04-06)

- Re-added font-awesome for the header icons. This time I'm only importing the icons needed instead of the whole icon
  font. [#38](https://github.com/TuxedoTako/4chan-xt/issues/38)
- Added button to un-randomize the filename in the quick reply. [#40](https://github.com/TuxedoTako/4chan-xt/issues/40)
  - Moved the icon buttons and submit to a new row to give the file input some space.
- Added option to hide posts by poster ID. [#41](https://github.com/TuxedoTako/4chan-xt/issues/41)
- Made the audio the source of truth for video sound posts. Should fix
  [#36](https://github.com/TuxedoTako/4chan-xt/issues/36), but I didn't find a video to longer audio to test on.

### v2.6.0 (2024-03-30)

- Added an option to Update stats more often and add purge position when a thread is close to getting purged, for anons
  who manage general threads. [#39](https://github.com/TuxedoTako/4chan-xt/issues/39)

### v2.5.2 (2024-03-06)

- Fixed thread watcher icon not changing colors when somebody replies to your post in the tomorrow theme.
  [#35](https://github.com/TuxedoTako/4chan-xt/issues/35)
- Fixed header color in the futaba theme.

### v2.5.1 (2024-03-03)

- Fixed missing semicolon in yotsuba.css. Thanks to
  [@saxamaphone69's review](https://github.com/TuxedoTako/4chan-xt/commit/d795e93e045f5192b51f5680b7e65cd089e99625#commitcomment-139046323).

### v2.5.0 (2024-02-25)

- Quick MD5 filter on shift + click on a thumbnail or expanded file.
  [#32](https://github.com/TuxedoTako/4chan-xt/issues/32)
  - Can be turned off in the settings.
- Moved different themes to CSS variables.
  - This shouldn't make a difference for the end user, but I have accidentally broking things before.
- Added `color-scheme: dark;` for tomorrow and spooky themes for dark scroll bars, inputs and buttons.

### v2.4.6 (2024-02-08)

- Fixed inserted posts from external archives missing the hide button before it.

### v2.4.5 (2024-02-04)

- Fixed hovering over a link to a hidden thread throwing an error.
  [#30](https://github.com/TuxedoTako/4chan-xt/issues/30)
- Fixed example of the type option on general filters. [#29](https://github.com/TuxedoTako/4chan-xt/issues/29)

### v2.4.4 (2024-02-01)

- Fixed icons next to embed links. [#28](https://github.com/TuxedoTako/4chan-xt/issues/28)
- Updated some of those icons, and compressed some others.

### v2.4.3 (2024-01-25)

- Updated CSS to remove older properties. [#25](https://github.com/TuxedoTako/4chan-xt/issues/25)
- Fixed image prefetching icon incorrectly showing it is enabled by default.
  [#26](https://github.com/TuxedoTako/4chan-xt/issues/26)
- Fixed mixing of line endings in the entire output. [#24](https://github.com/TuxedoTako/4chan-xt/issues/24)

### v2.4.2 (2024-01-23)

- Fixed infinite loop when a thread from a tinyboard website is in the thread watcher.
  [#23](https://github.com/TuxedoTako/4chan-xt/issues/23)
- Fixed bug that ocurred on threads on websites without IP counter.
  [#23](https://github.com/TuxedoTako/4chan-xt/issues/23#issuecomment-1905295911)
- Fixed mixing of line endings in the header comments. [#24](https://github.com/TuxedoTako/4chan-xt/issues/24)

### v2.4.1 (2024-01-21)

- Fixed new Relative dates settings' interaction with elements that aren't the date info on posts, like the refresh
  button on the 4chan-XT catalog.

### v2.4.0 (2024-01-21)

- Reworded 'Link Title in the catalog' setting's description. [#21](https://github.com/TuxedoTako/4chan-xt/pull/21)
- Relative times and full time stamps are no longer mutually exclusive. Setting was moved to the Time Formatting section
  of the advanced settings because the other settings because the Main settings only supports boolean settings.
- Build script: added a transformer on the TypeScript output to keep the script from getting bigger when moving files
  from js to ts. If you think this is a waste of time on the build step you can use the `-no-format` flag.

### v2.3.5 (2024-01-09)

- Fixed poster IDs not appearing on new posts. [#20](https://github.com/TuxedoTako/4chan-xt/issues/20)

### v2.3.4 (2023-12-31)

- Fixed previewing posts from external archives inserting posts from other threads into the current thread.
  [#18](https://github.com/TuxedoTako/4chan-xt/issues/18)

### v2.3.3 (2023-12-30)

- Improved interaction between restoring from the archive and reply threading.
  - Known issue: parents from threads get put at the end instead of the correct place when reply threading is on.
- Previewing a deleted post from an external archive by hovering over a link no longer excludes it when restoring the
  thread from the archive. It now gets added direly when you do that.
  - Known issue: when reply threading is on, this moves the reply to the restored post, but doesn't scroll to it.
- Added a "Link Title in the catalog" setting for embeds as a workaround for
  [ccd0/4chan-x#3427](https://github.com/ccd0/4chan-x/issues/3427). Fetching titles in the catalog is off by default.
- Restored span around ➕︎ and ➖︎ icons in the index for user styles. [#17](https://github.com/TuxedoTako/4chan-xt/issues/17).

### v2.3.2 (2023-12-27)

- Fixed the settings import mistaking a 4chan XT config for a [loadletter/4chan-x](https://github.com/loadletter/4chan-x)
  one and failing. [#16](https://github.com/TuxedoTako/4chan-xt/issues/16)

### v2.3.1 (2023-12-26)

- Fixed classes on capcode. [#14](https://github.com/TuxedoTako/4chan-xt/issues/14)
- Fixed default FAQ link in the header. [#15](https://github.com/TuxedoTako/4chan-xt/issues/15)

### v2.3.0 (2023-12-25) (Merry Christmas)

- Added `.fourchan-xt` class. [#11](https://github.com/TuxedoTako/4chan-xt/issues/11)
- Added `window.fourchanXT` with the version number in `version` and a `buildDate` `Date` object.
- Version number is no longer prefixed with "XT ", and will now follow major.minor.bugfix.
- Fixed "Expand All Images" shortcut in the header. [#13](https://github.com/TuxedoTako/4chan-xt/issues/13)
- Ran the chrome extension version, and fixed a problem with the ajax function. How long has that been down? I use the
  user script version myself.

### XT v2.2.6 (2023-12-22)

- Fixed header shortcuts with text instead of icons. [#12](https://github.com/TuxedoTako/4chan-xt/issues/12)

### XT v2.2.5 (2023-12-21)

- Fixed posts scrolling under the header when navigated to by the id.
  [#10](https://github.com/TuxedoTako/4chan-xt/issues/10)
  - Now `scroll-margin-top` is used, which needed `overflow: clip;` instead of `:hidden`, which is why the minimum
    chrome version is bumped to 90.
- Disabled automatic retry when captcha failed. [ccd0/4chan-x\#3134](https://github.com/ccd0/4chan-x/issues/3134),
  [ccd0/4chan-x\#3424](https://github.com/ccd0/4chan-x/issues/3157).
  - I think. I honestly had trouble reproducing this issue.

### XT v2.2.4 (2023-12-19)

- Fixed Index, Archive and Catalog navbar links no longer bold on blue boards:
  [ccd0/4chan-x\#3424](https://github.com/ccd0/4chan-x/issues/3424).

### XT v2.2.3 (2023-11-08)

- Fixed error when "Force Noscript Captcha" is enabled.

### XT v2.2.2 (2023-10-29)

- Fixed trying to get thread JSON from unsupported archives.

### XT v2.2.1 (2023-10-28)

- Fixed thread not scrolling to last read post.
- Set default 'Exempt Archives from Encryption' to false. This setting will _not_ change automatically when updating.
- Enabled automatic updates. If you don't want updates, turn them off in your user script manager.

### XT v2.2.0 (2023-10-27)

- Added ability to restore deleted posts from an external archive. This can be found in the drop down menu at the top
  right. [#8](https://github.com/TuxedoTako/4chan-xt/issues/8)
- Also minify css in the minified build.

### XT v2.1.4 (2023-09-02)

- Fix DataBoard class, should solve [#7](https://github.com/TuxedoTako/4chan-xt/issues/7)
- Fix Settings.upgrade to work with version numbers prepended with XT

### XT v2.1.3 (2023-08-21)

- Embed x.com links.
- Settings no longer close when the mouse ends up outside of the modal when selecting text in an input or textarea.

### XT v2.1.2 (2023-07-22)

- Fix inlining/previewing of archive links like quote links. [#5](https://github.com/TuxedoTako/4chan-xt/issues/5)

### XT v2.1.1 (2023-07-16)

- Time formatting now falls back to browser locale instead of giving an error when the locale is not set.
- Update notification link now links to the changelog on the right branch on github.

### XT v2.1.0 (2023-06-24)

- Limited support for audio posts: they work in threads but not yet in the gallery. Might add if there's demand.
  - Can be disabled in the settings
- Small performance improvements
  - Removed unnecessary `Array.from`s from coffeescript to js migration
  - Time module: cache Intl.DateTimeFormat objects
  - callbackNodesDB: increase nr of callbacks because the setTimeout triggers a reflow, which in some of my tests took
    as long as the actual chunk of callbacks

### XT v2.0.0 (2023-04-30)

This is the first XT release, which means this is after the migration from coffeescript to typescript, but there are
some other changes as well. These changes aren't in the upstream PR.

- Optimized image filters: filters are in a Map with the hash as key, instead of iterating over all image filters
- I removed font awesome to make the script smaller, and used unicode icons instead. This might break some user scripts
  build in 4chan X that rely on them, and I only tested on windows.
- For even smaller user script size, there is a minified version available
- https://github.com/ccd0/4chan-x/pull/3352, fix for https://github.com/ccd0/4chan-x/issues/3349 was ported

## Original 4chan X changelog

For the original changelog, see [original 4chan X CHANGELOG.md](./original%204chan%20X%20CHANGELOG.md).
