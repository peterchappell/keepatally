# Keep a tally

This is a demo project to play with and learn about Firebase.

## Development

This project is built using Firebase, React and Webpack (among other things).

To work locally, you'll need to do an `npm install` and then you can just run `npm run dev`.

This will:

* Run webpack with a watcher (`webpack --progress --colors --watch`)
* Run `firebase serve`

But it's flaky to run the two together... so maybe run these two things in
two separate terminal windows

* `npm run watch` // to run webpack in watch module
* `npm run serve` // to run the firebase server

## Production build

Use `npm run prod` to do a production build.

### Tests

There are a few (not near enough) tests set up using jest. So in another
terminal you can run:

`npm run test -- --watch`

And there is also a linting check you can run with

`npm run test:lint`
