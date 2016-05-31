---
layout: post
title:  "Developing with Yeoman"
tags: development
blurb: I wanted to build a personal site and blog with Jekyll, and decided to develop with the Yeoman workflow.
---

I wanted to build a personal site and blog with [Jekyll], and decided to develop with [Yeoman], a workflow that so many people seem to be saying good things about. I had a couple of requirements when I began:

* Use Yeoman, Grunt, and Bower to generate my assets and manage my development tasks
* Create separate git repositories for my source code and the generated public site
* Manage my repositories with Github

## Setup

To create the skeleton for my site, I decided to use Rob Wierzbowski's [generator-jekyllrb] so I could quickly scaffold a Jekyll site and the appropriate directories.

The first thing I did was to create a new repository on Github, which I named `jessabean_source`. Then I cloned the repository to my computer and navigated into my local copy of `jessabean_source`:

<pre><code class="language-bash">git clone git@github.com:jessabean/jessabean_source.git
cd jessabean_source</code></pre>

Once inside the directory, I ran the generator-jekyllrb setup command:

<pre><code class="language-bash">yo jekyllrb</code></pre>

I chose the following config options in response to the generator's prompts:

* Compass for Sass compilation
* Redcarpet for Markdown
* No Pygments (I chose to use Lea Verou's [prism.js] instead)
* HTML5 Boilerplate
* Autoprefixer: HELL TO THE YES
* Number of blog posts on homepage: 0

I didn’t include any posts on my homepage, because I wanted to set my blog up in a subdirectory of my site, and use my index page to feature recent projects instead. More on that in a later post! Generator-jekyllrb created the following structure for my site:

* .jekyll
* .tmp
* **app/**
* **dist/**
* **node_modules/**
* .bowerrc
* .csslintrc
* .editorconfig
* .gitattributes
* .gitignore
* .jshintrc
* _config.build.yml
* _config.yml
* bower.json
* Gemfile
* Gruntfile.js
* package.json

I can also preview my site for local development by running `grunt server` and viewing my site in the browser at http://localhost:9000/

## Using Bower

Bower is an awesome package manager that allows you to manage CSS and Javascript vendor frameworks on your site, as well as choose the version for those frameworks. It’s very similar to RubyGems, but without the back end dependency. Extra sugar: if you don't care about a particular version of a library, you can specify that you want whatever the latest version is, and Bower will fetch it for you.

There were a few libraries I knew I’d want for my site. First I needed to include those libraries I wanted for my site in the `bower.json` file.

<pre><code class="language-javascript">{
  "name": "jessabean-source",
  "version": "2.0.0",
  "dependencies": {
    "jquery": "2.0.3",
    "normalize-css": "latest",
    "modernizr": "latest",
    "prismjs": "latest"
  }
}
</code></pre>

Then I installed the dependencies with `bower install`. Bower installed the specified JS and CSS files into individual directories inside `app/_bower_components`.

In order to compile the assets, Grunt requires you to declare those assets inside special comments in your HTML. For example, to include Modernizr, I put this inside the `head` tag of my layout file located at `app/_layouts/default.html`:

<pre><code class="language-markup">&lt;!-- build:js(app) /js/script.js --&gt;
&lt;script src="/_bower_components/modernizr/modernizr.js"&gt;&lt;/script&gt;
&lt;!-- endbuild --&gt;
</code></pre>

## Git Repository for Source Code

Another requirement I had for my site was to create separate repositories for my source code and the generated code. Because reasons.

All of the source code for my site was already set up in the repository for `jessabean_source`. There were just a few more things I wanted to configure. Because the tmp directory, node modules, and bower components are used solely for local development and not needed in production, I add them to my `.gitignore` file.

<pre><code class="language-javascript">app/_bower_components
dist
node_modules
.tmp
</code></pre>

All that shows up in my source code repository is the app itself and its accompanying config files. Nice and clean. You can see my source code repository at [jessabean_source].

## Git Repository for Public Code

To create a separate repository for my public site at [jessabean.github.io], I first added the `dist/` directory to the list of things in my `.gitignore`. This directory is where Grunt places the compiled version of my app code, and I didn’t want to include this in my source repository.

Then, I navigated into the `/dist` directory and deleted all of its contents, giving me a clean slate to build the new repository. I then created a repository called `jessabean.github.io` at Github, and cloned its contents into my current directory (`dist/`).

<pre><code class="language-bash">git clone git@github.com:jessabean/jessabean.github.io.git .
</code></pre>

Once the repository was set up, I needed to add content. To do this, I navigated up one level, back to my source code. I then compiled my app by running `grunt build`.

I could verify that changes had been made to my `jessabean.github.io` repository by changing into the `dist/` directory and seeing a ton of new files had been generated as unstaged commits.

All that was left was to wrap everything up into commits, push them up to my repositories, and boom. Website.

## Takeaways

Setup was fairly painless with Yeoman. LiveReload and Autoprefixer are some of my favorite aspects of the generator package--they are really, really handy tools! One thing I would like to investigate further is whether all the grunt tasks included by default under `node_modules` are  necessary. I suspect that they're not, but many of them are interdependent, so trying to delete one led me into a rabbit hole of despair that I quickly decided wasn't worth it.

There are other build components I want to explore. For instance, [prism.js] has a Bower component, but I couldn't figure out how to include the language support at first. I ended up including each of the language files I wanted (located in `_bower_components/prismjs/components/`) inside Grunt build comments in my scripts file. But it would be nicer if I could package them up inside of the bower.json file, or maybe build a Grunt task that will combine them all into a minified JS file, like the [prism.js] site's download page allows me to do.

[Jekyll]: http://jekyllrb.com/
[Yeoman]: http://yeoman.io/
[generator-jekyllrb]: https://github.com/robwierzbowski/generator-jekyllrb
[prism.js]: http://prismjs.com/
[jessabean_source]: https://github.com/jessabean/jessabean_source
[jessabean.github.io]: https://github.com/jessabean/jessabean.github.io