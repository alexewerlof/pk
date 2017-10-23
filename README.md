# Introduction

`pk` is a simple but powerful command line utility for dealing with NPM's `package.json` files.
It comes with a powerful API as well. Everything that can be done by the CLI can also be done using the API.

# Examples

### Get the main field

```shell
$ pk main
index.js
```

### Get a particular config (`port` in this case)

```shell
$ pk config.port
8080
```

### Get a particular config (`port` is a number in this case)

```shell
$ pk --set --number config.port 5000
```

### Get the package name

```shell
$ pk name
my-package-name
```

### Get list of scripts along with their commands

```shell
$ pk scripts
start   node server.js
build   webpack .
```

### Get list of script names

```shell
$ pk scripts --keys
start
build
```

### Add a script

```shell
$ pk scripts --add lint "eslint ."
```

### Update a script

```shell
$ pk scripts --update lint "eslint src/"
```

### Set the lib directory

```shell
$ pk directories --set lib ./lib
```

### List all directories fields

```shell
$ pk directories
```

### Delete a script

```shell
$ pk scripts --delete lint
```

### Set a package to private

```shell
$ pk --set --boolean private true
```

### Change package name

```shell
$ pk --set name "my-new-package-name"
```

### Add an author

### Add a keyword

```shell
$ pk --append keywords "tools"
```

### Remove a keyword

```shell
$ pk --delete keywords "tools"
```

### Change repo

```shell
$ pk repository --set --object '{"type" : "git", "url" : "https://github.com/npm/npm.git"}'
```

### Change repo url

```shell
$ pk repository.url --set https://github.com/npm/npm.git
```

### Get the description

### Change the description

### Check if we have optional dependencies

### Get the number of dev dependencies

### Remove all peer dependencies

### Compute the next major version of the package

```shell
$ pk --version --increment --major
$ pk --version --increment --major --preid canary
```

# Reference

You can use any path as a key.

## CRUD Operations

* `--help` show help and version number
* `--lint` checks the `package.json` to make sure it complies to the spec (skip it with `--skip-lint`)
* `--silent` don't show any error message (the exit code will still be non-zero)
* `--set` for objects. Create the key if it doesn't exist and update its value.
* `--append` for arrays. (alias: `--add`)
* `--get` Reads the value of a key. (You don't have to specify it as it's the default operation).
* `--rename` updates a key and copies its values over (only if it exists)
* `--delete` for objects and arrays
* `--count` count the number of items in an array field or keys in an object field
* `--has` checks if an array has an element (or an object has a key)
* `--is`  checks if a value for a provided key is equal to the provided value
* `--keys` lists only the keys of an object (defaults to root)
* `--values` lists only the values of an object (defaults to root)
* `--file` an alternative input file. Default is (PWD)`/package.json`
* `--json` output the results as valid JSONs
* `--tabs` use tabs to separate fields in an output table
* `--pretty` make the table formatted data easier to read
* `--version` version operations
    * `--major` get/set major version
    * `--minor` get/set minor version
    * `--patch` get/set patch version
    * `--preid` get/set the optional prerelease id in the version
    * `--increment` add the version by a specified amount (defaults to 1)
    * `--decrement` reduces the version by a specified amount (defaults to 1)

## Types:

This utility knows the types for the standard `package.json` keys.
It supports all the types that are supported in json.

* `--string` (default)
* `--boolean`
* `--number`
* `--object`
* `--array`
* `--null`

In case of `--object` or `--array` the value is parsed by json so you might want to quote it on the CLI

# Linting rules

0. All required fields are present and have the right type
1. The name is valid
2. The version is valid

# License

MIT