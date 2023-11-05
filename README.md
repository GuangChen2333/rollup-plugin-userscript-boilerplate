# rollup-plugin-userscript-boilerplate

A Rollup.js plugin that enables automatic generation of userscript boilerplate from JSON

## Quick Start

### Installation

#### npm

```shell
npm install --save-dev rollup-plugin-userscript-boilerplate
```

#### pnpm

```shell
pnpm install --save-dev rollup-plugin-userscript-boilerplate
```

#### yarn

```shell
yarn add --dev rollup-plugin-userscript-boilerplate
```

### Usage

Create a `rollup.config.mjs` configuration file and import the plugin:

```js
import boilerplate from 'rollup-plugin-userscript-boilerplate';

export default {
    input: 'src/index.js',
    output: {
        dir: 'output',
        format: 'iife'
    },
    plugins: [
        boilerplate({
            // Metadata path
            metadata: "src/metadata.json",
            // Your source script (like iife format)
            source: "src/index.js",
            // Output path
            output: "output/dev.user.js"
        })
    ]
};
```

Create a `metadata.json` metadata file like this:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "match": [
    "https://example.com/",
    "https://example.net/"
  ]
}
```

It will generate the boilerplate to your path.

```js
// ==UserScript==
// @name    my-plugin
// @version 1.0.0
// @match   https://example.com/
// @match   https://example.net/
// @require file:///example/output/{SOURCE}.js
// ==/UserScript==
```