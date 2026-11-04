# Gayeonfolio 2026

Portfolio site of product designer Gayeon Kim, built with plain HTML, CSS, and JavaScript. There is no build step.

Run a local server to preview it, because JavaScript modules do not load from `file://`:

```sh
python3 -m http.server
```

## Structure

- `src/components`: one UI piece per file, each ready to become a React component
- `src/data`: copy and values shown on screen
- `src/lib`: helpers that do not depend on a component
- `src/styles`: shared tokens and one stylesheet per component

To add the About me video, put the file in the project and set its path in `ABOUT_VIDEO_SRC` in `src/data/content.js`.

## Moving to React

- `Hero.js` holds the view state, which becomes `useState`.
- Each component's `update` arguments become props.
- `createElement` markup becomes JSX, and `lib/createElement.js` can be deleted.
- `startTyping` moves into a `useEffect`, and its return value is the cleanup function.
- Stylesheets can stay as they are or become CSS Modules.
