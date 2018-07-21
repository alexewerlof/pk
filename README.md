[![npm](https://img.shields.io/npm/dt/pk.svg)](https://www.npmjs.com/package/pk)
[![npm](https://img.shields.io/npm/v/pk.svg)](https://www.npmjs.com/package/pk)
[![Build Status](https://travis-ci.org/userpixel/pk.svg?branch=master)](https://travis-ci.org/userpixel/pk)
[![GitHub issues](https://img.shields.io/github/issues/userpixel/pk.svg)](https://github.com/userpixel/pk/issues)
[![GitHub stars](https://img.shields.io/github/stars/userpixel/pk.svg)](https://github.com/userpixel/pk/stargazers)
[![GitHub license](https://img.shields.io/github/license/userpixel/pk.svg)](https://github.com/userpixel/pk)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/userpixel/pk.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fuserpixel%2Fpk)

![pk logo](logo.png)

# Introduction

`pk` is a small utility CLI for querying JSON files like `package.json` or `manifest.json` etc.

* Get the value of a particular field 💪 `pk scripts.start`
* Parse semver versions 🐍 `pk -s version`
* Minify json 🐭 `pk -m`
* Beautify json 🐘 `pk -j`
* Get the keys in an object 🔑 `pk -k scripts`
* Get the size of an array or number of keys in an object 🌮 `pk -c dependencies`
* Get a part of a json file ✂ `pk -j repository`
* Check if a path exists in the json and what type it is 🎁 `pk -t keywords`
* The default output is compatible with Unix text processing utils 👓 (`wc`, `sort`, `grep`, `uniq`, `comm`, `shuf`, `paste`, `column`, `pr`, `fold`, `cmp`, `diff`, [etc.](https://github.com/learnbyexample/Command-line-text-processing))
* Tiny, super quick, 100% Javascript 🦄
* Autocomplete (see 👇)
* Correction suggestion (typos in the path) 😅

By default it operates on _**p**ac**k**age.json_ where its name comes from but you can specify
any input file using the `-i FILE.json` option.

# Install

```shell
$ npm i -g pk
```

Now you can run it from the terminal.
Check out the command reference to see what you can do with it:

```shell
$ pk --help
```

# Install command line completion (optional)

`pk bashcomp`generates the bash auto complete command
You need to add this script to your bash initialization:

* On Linux:  `$ pk bashcomp >> ~/.bashrc`
* On Mac OS X:  `$ pk bashcomp >> ~/.bash_profile`
* Windows Subsystem for Linux: `$ pk bashcomp >> ~/.bashrc`

Then you need to restart a bash session for this to take effect.

# Examples

### Get the `main` field

```shell
$ pk main
index.js
```

If there is no main field nothing will be returned.

### Working with objects

`package.json`:

```js
{
    "scripts": {
         "start": "node server.js",
         "build": "webpack .",
    }
}
```

Get the list of all scripts along with their commands:

```shell
$ pk scripts
start   node server.js
build   webpack .
```

Just the script names (object keys `-k`):

```shell
$ pk scripts -k
start
build
```

Just the values:

```shell
$ pk scripts -v
node server.js
webpack .
```

pk is designed with Unix philosophy in mind and plays nice with other tools.
Want to see which script has the word "server" in it? Grep it:

```shell
$ pk scripts | grep server
start   node server.js
```

#### Nested objects

`package.json`:

```js
{
  ...
  config: {
    port: 8080
  }
}
```

Get a particular config (`port` in this case):

```shell
$ pk config.port
8080
```

You can also use autocomplete to see what is available.
Just press <kbd>TAB</kbd><kbd>TAB</kbd> after istalling the command line completion script.

### Working with arrays

`package.json`:

```js
{
    keywords: [ "node", "cli", "config", "CI" ]
}
```

Get a particular item:

```shell
$ pk keywords[2]
config
```

Get all items:

```shell
$ pk keywords
node
cli
config
CI
```

Get it in json format:

```shell
$ pk keywords -j
[
    "node",
    "cli",
    "config",
    "CI"
]
```

Or even minified:

```shell
$ pk keywords -j
["node","cli","config","CI"]
```

By default the output is unix compatible so you can pipe it:

```shell
$ pk keywords | sort
CI
cli
config
node
```

Get the type of something:

```shell
$ pk -t keywords
array
```

Or the type of an element:

```shell
$ pk -t keywords[0]
string
```

If a field doesn't exist, `undefined` will be printed:

```shell
$ pk -t license
undefined
```

### Minify a json file

There's no magic! It just uses native JSON module without padding.

`original.json`:

```js
{
    "name": "Alex"
    "city": "Stockholm"
}
```

Minify it and show the output:

```shell
$ pk -i original.json -m
{"name":"Alex","city":"Stockholm"}
```

Write the output to a file:

```shell
$ pk -i original.json -m > original.min.json
```

### Prettify a minified or badly formatted JSON

`original.json`:

```js
{"name": "Alex"
    "city": "Stockholm",      "keywords": ["javascript", "golang",
"vuejs"]
}
```

Show it pretty on screen:

```shell
$ pk -i original.json -j
{
    "name": "Alex"
    "city": "Stockholm",
    "keywords": [
        "javascript",
        "golang",
        "vuejs"
    ]
}
```

If the output is too big you may wanna browse it on the terminal:

```shell
$ pk -i original.json -j | less
```

Or just write it to a file:

```shell
$ pk -i original.json -j > original-prettified.json
```

Even overwrite the original file:

```shell
$ pk -i original.json -j > original.json
```

### Count the number of `devDependencies`

`package.json`:

```js
{
    "devDependencies": {
         "mocha": "*",
         "babel": "*",
         "micromustache": "*",
         "webpack": "*",
    }
}
```

```shell
$ pk devDependencies -c
4
```

`package-lock.json` is nutorious!

```shell
$ pk -i package-lock.json dependencies -c
2739
```

If you're referring to an array, it'll return the size of the array:

```shell
$ pk -c keywords
3
```

### Get part of a JSON file

`package.json`:
```js
{
    ...
    "repository": {
        "type": "git",
        "url": "git+https://github.com/userpixel/pk.git"
    }
}
```

Get the value of the repository:

```shell
$ pk -j repository
{
  "type": "git",
  "url": "git+https://github.com/userpixel/pk.git"
}
```

### Working with versions

`package.json`:

```js
{
    "version": "1.2.3"
}
```

Just get the version string:

```shell
$ pk version
1.2.3
```

Parse it as [semver](https://semver.org/):

```shell
$ pk -s version
major   1
minor   2
patch   3
```

You can actually omit "version" part if that's where it is:

```shell
$ pk -s
major   1
minor   2
patch   3
```

Yep you can get it in JSON format if you want:

```shell
$ pk -s version
{
  "major": 0,
  "minor": 2,
  "patch": 4
}
```

It understands watever [semver](https://www.npmjs.com/package/semver) can parse.
So if the version was "4.3.2-beta.2+build1000"

```shell
$ pk -s
major	4
minor	3
patch	2
build	["build1000"]
prerelease	["beta",2]
```
### Command Substitution 

pk is ideal for CI/CD scripts and that was the original motivation for its creation.
For example if you want to compress the current directory and version it you can:

```shell
$ zip -r `pk name`-`pk version`.zip .
```

This will zip the current directory to a file that is name `NAME-VERSION.zip`
where `NAME` and `VERSION` in the file name come from `"name"` and `"version"`
fields in the local `package.json`.

# More

There's more. See the help for the command reference

```shell
$ pk --help`.
```

# Update

```shell
# Check the version
$ pk --version

# Check if there's a new version
$ npm outdated -g pk

# Update it if needed
$ npm i -g pk@latest`
```

# Uninstall

```shell
$ npm un -g pk
```

# License

MIT

_Made in Sweden by [@alexewerlof](https://twitter.com/alexewerlof)_
