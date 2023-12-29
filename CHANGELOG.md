## 4chan XT changelog

4chan XT uses a different user script namespace, so to migrate you need to export settings from 4chan X, and import them
in XT.

### Unreleased

- Added as "Link Title in the catalog" setting a workaround for [ccd0/4chan-x#3427](https://github.com/ccd0/4chan-x/issues/3427).

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
  extension version myself.

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

### XT v2.0.0

#### 2023-04-30

This is the first XT release, which means this is after the migration from coffeescript to typescript, but there are
some other changes as well. These changes aren't in the upstream PR.

- Optimized image filters: filters are in a Map with the hash as key, instead of iterating over all image filters
- I removed font awesome to make the script smaller, and used unicode icons instead. This might break some user scripts
  build in 4chan X that rely on them, and I only tested on windows.
- For even smaller user script size, there is a minified version available
- https://github.com/ccd0/4chan-x/pull/3352, fix for https://github.com/ccd0/4chan-x/issues/3349 was ported

For the original changelog, see [original 4chan X CHANGELOG.md](./original%204chan%20X%20CHANGELOG.md).
