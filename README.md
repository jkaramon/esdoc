[![Build Status](https://travis-ci.org/esdoc/esdoc.svg?branch=master)](https://travis-ci.org/esdoc/esdoc)
[![Coverage Status](https://coveralls.io/repos/esdoc/esdoc/badge.svg)](https://coveralls.io/r/esdoc/esdoc)
[![Document](https://doc.esdoc.org/github.com/esdoc/esdoc/badge.svg)](https://doc.esdoc.org/github.com/esdoc/esdoc)


# About this fork

ESDoc is great and very useful doc generator for ES6. But for current React based project I am missing
in generated documentation some of the ES-next constructs. So I started with implementing a new plugin based
on esdoc-es7-plugin, but I was unable to extend easily esdoc publisher (probably because of my poor understanding),
so I forked esdoc repo and patched publisher directly.

So, this is quick and dirty solution for documenting *ES-next* and *React* specific constructs.
For now, I changed parser to babylon and provided a parsing of the *PropTypes* and displaying it in class doc.


# ESDoc

ESDoc is a documentation generator for JavaScript(ES6).

<img class="screen-shot" src="https://esdoc.org/image/top.png" width="500px" style="max-width: 500px; border: 1px solid rgba(0,0,0,0.1); box-shadow: 1px 1px 1px rgba(0,0,0,0.5);">


# Feature
- Generates detailed document.
- Measures document coverage.
- Integrate test codes into documentation.
- [ESDoc Hosting Service](https://doc.esdoc.org)

# Demo
- [ESDoc](https://esdoc.org/esdoc) is self-hosting &#x1F604;

# Install

```
npm install -g esdoc
esdoc -h
```

# Usage

```
esdoc -c esdoc.json
```

# Example
```
├── esdoc.json
└── src/MyClass.js
```

``src/MyClass.js``

```javascript
/**
 * this is MyClass.
 */
export default class MyClass {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  method(param){}
}
```

``esdoc.json``

```json
{
  "source": "./src",
  "destination": "./esdoc"
}
```

exec esdoc

```
esdoc -c esdoc.json
open ./esdoc/index.html
```

# Document
please visit [esdoc.org](https://esdoc.org) to see more documentation.

# License
MIT

# Author
[Ryo Maruyama@h13i32maru](https://twitter.com/h13i32maru)
