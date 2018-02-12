[![npm](https://img.shields.io/npm/dt/pk.svg)](https://www.npmjs.com/package/pk)
[![Build Status](https://travis-ci.org/userpixel/pk.svg?branch=master)](https://travis-ci.org/userpixel/pk)
[![GitHub issues](https://img.shields.io/github/issues/userpixel/pk.svg)](https://github.com/userpixel/pk/issues)
[![GitHub stars](https://img.shields.io/github/stars/userpixel/pk.svg)](https://github.com/userpixel/pk/stargazers)
[![GitHub license](https://img.shields.io/github/license/userpixel/pk.svg)](https://github.com/userpixel/pk)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/userpixel/pk.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fuserpixel%2Fpk)

![pk logo](logo.png)

# Introduction

`pk` is a simple CLI for querying JSON files like `package.json` or `manifest.json` etc.

**Note: right now it is in very early stage. If you're missing a feature you're welcome to file an issue.**

# Install

The simplest way to run it is using `npx`.

```shell
$ npx pk
```

You can also install it globally:

```shell
$ npm i -g pk
```

Now you can run it from your sell. See the command reference for example:

```shell
$ pk
```

To update it, do `npm i -g pk@latest`

# Examples

### Get the main field

```shell
$ pk main
index.js
```

If there is no main field nothing will be returned:

```shell
$ pk main

```

### Get a particular config (`port` in this case)

```shell
$ pk config.port
8080
```

### Get the list of scripts along with their commands

```shell
$ pk scripts
start   node server.js
build   webpack .
```

Just the script names:

```shell
$ pk scripts --keys
start
build
```

### Get the list of scripts along with their commands in JSON format

```shell
$ pk scripts --json
{
    "start": "node server.js",
    "build": "webpack ."
}
```

### Get list of scripts along with their commands in minified JSON format

```shell
$ pk scripts --min
{"start":"node server.js","build":"webpack ."}
```

### check the type of the keywords field

```shell
$ pk --type keywords
undefined
```

### Count the number of dev dependencies

```shell
$ pk devDependencies -c
```

### Get the keywords in a sorted order

```shell
$ pk keywords | sort
```

# Reference

See the [command reference](./COMMANDS.md) or use `pk --help`.

# License

MIT
