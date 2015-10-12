'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.patchBabylonAST = patchBabylonAST;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _coreJs = require('core-js');

var _coreJs2 = _interopRequireDefault(_coreJs);

var _estraverseFb = require('estraverse-fb');

var _estraverseFb2 = _interopRequireDefault(_estraverseFb);

var _babylon = require('babylon');

var babylon = _interopRequireWildcard(_babylon);

var _PluginPluginJs = require('../Plugin/Plugin.js');

var _PluginPluginJs2 = _interopRequireDefault(_PluginPluginJs);

/**
 * parse JavaScript(ES7) with babylon.
 * @param {string} code - target javascript.
 * @returns {AST} result AST.
 */
function _parse(code) {
  var options = {
    allowHashBang: true,
    sourceType: 'module',
    ecmaVersion: Infinity,
    features: {
      // stage 0
      'es7.comprehensions': true,
      'es7.classProperties': true,
      'es7.functionBind': true,

      // stage 1
      'es7.asyncFunctions': true,
      'es7.decorators': true,
      'es7.exportExtensions': true,
      'es7.objectRestSpread': true,
      'es7.trailingFunctionCommas': true,

      // stage 2
      'es7.exponentiationOperator': true
    },
    plugins: {
      jsx: true,
      flow: true
    }
  };

  var babylonAST = babylon.parse(code, options);
  var ast = babylonAST.program;
  patchBabylonAST(ast);
  return ast;
}

/**
 * path babylon ast to obtain Espree compatible.
 * - change ``innerComments`` to ``leadingComments``
 * - change ``CommentBlock`` to ``Block``
 * - change anonymous ``ClassExpression/FunctionExpression`` export to ``ClassDeclaration/FunctionDeclaration``.
 * - ignore unknown node type(``ClassProperty``, ``ExportDefaultSpecifier``, ``ExportNamespaceSpecifier`` and ``BindExpression``).
 * @param {AST} ast - target babylon AST.
 */

function patchBabylonAST(ast) {
  function patch(node, parent) {
    // decorator
    if (node.decorators && node.decorators[0].leadingComments && !node.leadingComments) {
      node.leadingComments = [node.decorators[0].leadingComments[0]];
    }

    // for innerComments
    if (node.innerComments) {
      var _node$leadingComments;

      node.leadingComments = node.leadingComments || [];
      (_node$leadingComments = node.leadingComments).push.apply(_node$leadingComments, _toConsumableArray(node.innerComments));
    }

    // for leadingComments
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (node.leadingComments || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var comment = _step.value;

        if (comment.type === 'CommentBlock') comment.type = 'Block';
      }

      // for trailingComments
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (node.trailingComments || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var comment = _step2.value;

        if (comment.type === 'CommentBlock') comment.type = 'Block';
      }

      // for anonymous class and function
      // babylon decide anonymous class to 'ClassExpression'.
      // but espree decide to 'ClassDeclaration'.
      // same function.
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var exportType = ['ExportDefaultDeclaration', 'ExportNamedDeclaration'];
    switch (node.type) {
      case 'ClassExpression':
        if (!node.id && exportType.includes(parent.type)) node.type = 'ClassDeclaration';
        break;
      case 'FunctionExpression':
        if (!node.id && exportType.includes(parent.type)) node.type = 'FunctionDeclaration';
        break;
    }

    // unknown node type
    var unknownNodeTypes = ['ExportDefaultSpecifier', 'ExportNamespaceSpecifier', 'BindExpression'];
    if (unknownNodeTypes.includes(node.type)) {
      node.type = 'Identifier';
    }
  }

  var ESTRAVERSE_KEYS = {
    Super: [],
    JSXElement: [],
    ClassProperty: [],
    ExportDefaultSpecifier: [], // todo
    ExportNamespaceSpecifier: [], // todo
    BindExpression: [] // todo
  };

  _estraverseFb2['default'].traverse(ast, {
    enter: function enter(node, parent) {
      patch(node, parent);
    }
  });
}

/**
 * ECMAScript Parser class.
 *
 * @example
 * let ast = ESParser.parse('./src/foo.js');
 */

var ESParser = (function () {
  function ESParser() {
    _classCallCheck(this, ESParser);
  }

  _createClass(ESParser, null, [{
    key: 'parse',

    /**
     * parse ECMAScript source code.
     * @param {string} filePath - source code file path.
     * @returns {AST} AST of source code.
     */
    value: function parse(filePath) {
      var code = _fsExtra2['default'].readFileSync(filePath, { encode: 'utf8' }).toString();

      code = _PluginPluginJs2['default'].onHandleCode(code);

      if (code.charAt(0) === '#') {
        code = code.replace(/^#!/, '//');
      }

      var parser = function parser(code) {
        return _parse(code);
      };

      parser = _PluginPluginJs2['default'].onHandleCodeParser(parser);

      var ast = parser(code);

      ast = _PluginPluginJs2['default'].onHandleAST(ast);

      return ast;
    }
  }]);

  return ESParser;
})();

exports['default'] = ESParser;