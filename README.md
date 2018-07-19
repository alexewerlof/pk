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
It has just 2 dependencies that are extremely popular and have no other dependencies. 

# Install

The simplest way to run it is using `npx`.

```shell
$ npx pk
```

You can also install it globally:

```shell
$ npm i -g pk
```

Now you can run it from the terminal. See the command reference for example:

```shell
$ pk --help
```

To update it, do `npm i -g pk@latest`

# Examples

### Get the main field


```shell
# By default it operates on the `./package.json`.
$ pk main
index.js
```

If there is no main field nothing will be returned:

```shell
$ pk main

```

### Get a particular config (`port` in this case)

```shell
# package.json:
# {
#   ...
#   config: {
#     port: 8080
#   }
# }
$ pk config.port
8080
```

### Get an array element

Get the second keyword:

```shell
# package.json
# {
#   keywords: [ "node", "cli", "config", "CI" ]
# }
$ pk keywords[2]
config
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

In JSON format:

```shell
$ pk scripts --json
{
    "start": "node server.js",
    "build": "webpack ."
}
```

And minified JSON:

```shell
$ pk scripts --min
{"start":"node server.js","build":"webpack ."}
```

### check the type of the keywords field

```shell
$ pk --type keywords
array
```

If `keywords` doesn't exist, `undefined` will be printed:

```shell
# many switches have a short hand: -t is the same as --type
$ pk -t keywords
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

See the [command reference](./COMMANDS.txt) or use `pk --help`.

# License

MIT


Count the number of dependencies in package-lock
pk -i package-lock.json dependencies -c

Check the version number detail according to semver
pk -s

Autocompletion script
Linux: pk bashcomp >> ~/.bashrc
Mac: pk bashcomp >> ~/.bash_profile

Minify the whole file
pk -i some-file.json -m

get the list of scripts
pk scripts -k

get package name
pk name

Check the type of a particular field
pk keywords -t

get the version number
pk version

get the number of devDependencies
pk devDependencies -c

format the file to human readable json
pk -i some-file.json -j

get a part of the json file
pk repository -j
