# Coffee feed

## Developing

Once you've installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

If you want to use `Redis` to store cached data then use env variable `USE_REDIS=true`. By default, in dev mode local storage (e.g. js object) is used

## Production

### Building

To create a production version of the app:

```bash
npm run build
```

### Launch

```bash
npm run start:prod
```

`Redis` is used by default. After executing the command the app will be running on `3000` port
