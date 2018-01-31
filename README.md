[![Build Status](https://travis-ci.org/userpixel/pk.svg?branch=master)](https://travis-ci.org/userpixel/pk)
[![GitHub issues](https://img.shields.io/github/issues/userpixel/pk.svg)](https://github.com/userpixel/pk/issues)
[![GitHub stars](https://img.shields.io/github/stars/userpixel/pk.svg)](https://github.com/userpixel/pk/stargazers)
[![GitHub license](https://img.shields.io/github/license/userpixel/pk.svg)](https://github.com/userpixel/pk)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/userpixel/pk.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fuserpixel%2Fpk)

![pk logo](logo.png)

# Introduction

`pk` is a simple but powerful CLI and API for dealing with json files (like `package.json` or `manifest.json` etc.).

**Note: right now it is in very early stage. If you're missing a feature you're welcome to file an issue.**

# Examples

### Get the main field

```shell
$ pk get main
index.js
```

If there is no main field nothing will be returned:

```shell
$ pk get main

```


### Get a particular config (`port` in this case)

```shell
$ pk get config.port
8080
```

### Set a particular config (`port` is a number in this case)

```shell
$ pk --set --number config.port 5000
```

### Get the package name

```shell
$ pk get name
my-package-name
```

### Get the list of scripts along with their commands

```shell
$ pk scripts
start   node server.js
build   webpack .
```

Just the script names:

```shell
$ pk get scripts --keys
start
build
```

### Get the list of scripts along with their commands in JSON format

```shell
$ pk get scripts -f json
{
    "start": "node server.js",
    "build": "webpack ."
}
```

### Get list of scripts along with their commands in minified JSON format

```shell
$ pk get scripts -f min
{"start":"node server.js","build":"webpack ."}
```

### Add a script

It'll fail if the script already exists.

```shell
$ pk set scripts --add lint "eslint ."
```

### Update a script

Creates the script if it doesn't exist.

```shell
$ pk set scripts --update lint "eslint src/"
```

### Set the lib directory

```shell
$ pk set directories --set lib ./lib
```

### List all entries in the directories field

```shell
$ pk get directories
```

### Delete a script

```shell
$ pk delete scripts.lint
```

Also works with `rm` or `del`:

```shell
$ pk rm scripts.lint
$ pk del scripts.lint
```

### Delete all dependencies

```shell
$ pk delete dependencies
```

### Set a package to private

```shell
$ pk set --boolean private true
```

### Change package name

```shell
$ pk set name "my-new-package-name"
```

### Add an author

TODO - similar to repo or keyword example depending on the format

### Add a keyword

```shell
$ pk append keywords "tools"
```

### Remove a keyword

```shell
$ pk delete keywords "tools"
```

### Change repo

```shell
$ pk set repository --object '{"type" : "git", "url" : "https://github.com/npm/npm.git"}'
```

or

```shell
$ pk set repository type=git --set url=https://github.com/npm/npm.git
```

### Change repo url

```shell
$ pk set repository.url https://github.com/npm/npm.git
```

### Change the description

### Check if we have optional dependencies

**Currently not supported**

```shell
$ pk has optionalDependencies
```

### check the type of the author field

**Currently not supported**

```shell
$ pk type author
object  #may also be string or undefined
```

### check if a particular field exists

**Currently not supported**

```shell
$ pk type optDependencies
undefined
```

### Count the number of dev dependencies

```shell
$ pk get devDependencies -c
```

### Remove all peer dependencies

```shell
$ pk rm peerDependencies
```

### Compute the next major version of the package

### Get major version of a package

**Currently not supported**

```shell
$ pk version major
```

### Get the keywords in a sorted order

```shell
$ pk get keywords | sort
```

# Reference

You can use any path as a key.

Type `pk --help` for a general reference and `pk COMMAND --help` for help on a specific command like: `pk get --help`.

# License

MIT
