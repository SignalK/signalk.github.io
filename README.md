# SignalK.org

This is the repository for the [Signal K](http://signalk.org) website.

## Making Changes

The website is hosted by GitHub Pages and most content is authored in Markdown format. HTML is also acceptable. Each
page has at the beginning a section called _front matter_. This is YAML between three dashes and looks like:

```
---
layout: page
title: Some Page
---
```

Every page needs at least a layout and a title. It is also useful to add a description to be helpful to search engines.
Valid layouts can be found in the `_layouts` directory. Generally, you will want to use `onecolumn`, but `post` and
`rsidebar` can also be used. If you specify `rsidebar`, you will also need to create content for the sidebar and a
front matter variable `sidebar` which points to the sidebar file. This file should be placed in the `_includes`
directory. See `installation.md` or `overview.md` for an example of how this works.

To create a new published subdirectory, add it to `collections` in `_config.yml`. Published subdirectories should be
named with a leading underscore.

If you rename a page or move its content elsewhere, be a good web citizen and add a redirect from the old location to
the new. For instance, if you want to move the content of `overview.md` to `getting_started.md`, don't just remove
`overview.md`, rather remove its content and add a `redirect` variable to its front matter pointing to the new page. See
`specification.md` for an example of this.

When creating links to local resources, such as between pages, prefix them with `{{site.path}}` and use absolute, rather
than relative paths. This ensures links continue to work in staging.
