# SignalK.org

This is the repository for the [Signal K](http://signalk.org) website.

## Contributing

The website is built with [Astro](https://astro.build) and hosted on GitHub Pages.

To run it locally, you need to have [Node.js](https://nodejs.org) installed.

```sh
git clone https://github.com/SignalK/signalk.github.io
cd signalk.github.io
npm install
npm start
```

This will start the server on [localhost:4321](http://localhost:4321).

After you make changes, you can automatically fix some errors and check for others by running:

```
npm run fix
```

### Creating a new blog post

To create a new blog post, run:

```sh
script/generate "Title of the new post"
```

This will create a new file in `_posts` with the current date and a template for the post. Write a draft, and open up a pull request to get reviewed.
