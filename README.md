GitBook Sample Plugin
==============

This is a model for GitBook plugins.

## How GitBook plugin works?

A plugin for GitBook is a node package that can be published on [NPM](http://www.npmjs.org). It has to follow the name convention: `gitbook-plugin-*name*`.

### package.json

#### name

The package name should begin with ```gitbook-plugin-```.

Examples: `gitbook-plugin-mixpanel`, `gitbook-plugin-googleanalytics`.

#### engine

The package.json should contain a `engine` field using [the standard norm](https://www.npmjs.org/doc/json.html#engines).

```
"engines": {
    "gitbook": "*"
}
```

For example if you want your plugin to supports only GitBook version supperior to 0.3.1:

```
"engines": {
    "gitbook": ">=0.3.1"
}
```

### entry point

The plugin entry point should return an object with some metadata.


# google_code_prettify
