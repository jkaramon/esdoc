'use strict';

var _utilJs = require('./../util.js');

/** @test {ManualDocBuilder} */
describe('Manual:', function () {
  it('has manual link in header', function () {
    var doc = (0, _utilJs.readDoc)('index.html');
    _utilJs.assert.includes(doc, '[data-ice="manualHeaderLink"]', 'Manual');
    _utilJs.assert.includes(doc, '[data-ice="manualHeaderLink"]', './manual/index.html', 'href');
  });

  /** @test {ManualDocBuilder#_buildManualNav} */
  it('has manual navigation', function () {
    var doc = (0, _utilJs.readDoc)('manual/index.html');
    (0, _utilJs.find)(doc, '[data-ice="nav"]', function (doc) {
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(1)', 'Overview');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(2)', 'Installation');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(3)', 'Usage');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(4)', 'Example');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(5)', 'Reference');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(6)', 'FAQ');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(7)', 'Changelog');

      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(1) a', 'manual/overview.html', 'href');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(2) a', 'manual/installation.html', 'href');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(3) a', 'manual/usage.html', 'href');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(4) a', 'manual/example.html', 'href');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(5) a', 'identifiers.html', 'href');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(6) a', 'manual/faq.html', 'href');
      _utilJs.assert.includes(doc, '[data-ice="navItem"]:nth-of-type(7) a', 'manual/changelog.html', 'href');
    });
  });

  /** @test {ManualDocBuilder#_buildManualIndex} */
  it('has each heading tags', function () {
    var doc = (0, _utilJs.readDoc)('manual/index.html');

    // overview
    (0, _utilJs.find)(doc, '[data-ice="manual"]:nth-of-type(1)', function (doc) {
      _utilJs.assert.includes(doc, '.manual-toc-title', 'Overview');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Feature');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2)', 'Demo');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(3)', 'License');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(4)', 'Author');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/overview.html#feature', 'href');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2) a', 'manual/overview.html#demo', 'href');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(3) a', 'manual/overview.html#license', 'href');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(4) a', 'manual/overview.html#author', 'href');
    });

    // installation
    (0, _utilJs.find)(doc, '[data-ice="manual"]:nth-of-type(2)', function (doc) {
      _utilJs.assert.includes(doc, '.manual-toc-title', 'Installation');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'indent 2');
      _utilJs.assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2)', 'indent 3');
      _utilJs.assert.includes(doc, '.indent-h3[data-ice="manualNav"]:nth-of-type(3)', 'indent 4');
      _utilJs.assert.includes(doc, '.indent-h4[data-ice="manualNav"]:nth-of-type(4)', 'indent 5');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/installation.html#indent-2', 'href');
      _utilJs.assert.includes(doc, '.indent-h2[data-ice="manualNav"]:nth-of-type(2) a', 'manual/installation.html#indent-3', 'href');
      _utilJs.assert.includes(doc, '.indent-h3[data-ice="manualNav"]:nth-of-type(3) a', 'manual/installation.html#indent-4', 'href');
      _utilJs.assert.includes(doc, '.indent-h4[data-ice="manualNav"]:nth-of-type(4) a', 'manual/installation.html#indent-5', 'href');
    });

    // usage
    (0, _utilJs.find)(doc, '[data-ice="manual"]:nth-of-type(3)', function (doc) {
      _utilJs.assert.includes(doc, '.manual-toc-title', 'Usage');
    });

    // example
    (0, _utilJs.find)(doc, '[data-ice="manual"]:nth-of-type(4)', function (doc) {
      _utilJs.assert.includes(doc, '.manual-toc-title', 'Example');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Minimum Config');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2)', 'Integration Test Code Into Documentation');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/example.html#minimum-config', 'href');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2) a', 'manual/example.html#integration-test-code-into-documentation', 'href');
    });

    // reference
    (0, _utilJs.find)(doc, '[data-ice="manual"]:nth-of-type(5)', function (doc) {
      _utilJs.assert.includes(doc, '.manual-toc-title', 'Reference');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Class');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2)', 'Interface');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(3)', 'Function');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(4)', 'Variable');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(5)', 'Typedef');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(6)', 'External');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'identifiers.html#class', 'href');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(2) a', 'identifiers.html#interface', 'href');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(3) a', 'identifiers.html#function', 'href');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(4) a', 'identifiers.html#variable', 'href');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(5) a', 'identifiers.html#typedef', 'href');
      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(6) a', 'identifiers.html#external', 'href');
    });

    // faq
    (0, _utilJs.find)(doc, '[data-ice="manual"]:nth-of-type(6)', function (doc) {
      _utilJs.assert.includes(doc, '.manual-toc-title', 'FAQ');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', 'Goal');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/faq.html#goal', 'href');
    });

    // changelog
    (0, _utilJs.find)(doc, '[data-ice="manual"]:nth-of-type(7)', function (doc) {
      _utilJs.assert.includes(doc, '.manual-toc-title', 'Changelog');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1)', '0.0.1');

      _utilJs.assert.includes(doc, '.indent-h1[data-ice="manualNav"]:nth-of-type(1) a', 'manual/changelog.html#0-0-1', 'href');
    });
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has overview', function () {
    var doc = (0, _utilJs.readDoc)('manual/overview.html');
    _utilJs.assert.includes(doc, '.github-markdown h1', 'Overview');
    _utilJs.assert.includes(doc, '.github-markdown [data-ice="content"]', 'ESDoc is a documentation generator for JavaScript(ES6).');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has installation', function () {
    var doc = (0, _utilJs.readDoc)('manual/installation.html');
    _utilJs.assert.includes(doc, '.github-markdown h1', 'Installation');
    _utilJs.assert.includes(doc, '.github-markdown [data-ice="content"]', 'npm install -g esdoc');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has usage', function () {
    var doc = (0, _utilJs.readDoc)('manual/usage.html');
    _utilJs.assert.includes(doc, '.github-markdown h1', 'Usage');
    _utilJs.assert.includes(doc, '.github-markdown [data-ice="content"]', 'esdoc -c esdoc.json');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has example', function () {
    var doc = (0, _utilJs.readDoc)('manual/example.html');
    _utilJs.assert.includes(doc, '.github-markdown h1', 'Example');
    _utilJs.assert.includes(doc, '.github-markdown [data-ice="content"] h2:nth-of-type(1)', 'Minimum Config');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has faq', function () {
    var doc = (0, _utilJs.readDoc)('manual/faq.html');
    _utilJs.assert.includes(doc, '.github-markdown h1', 'FAQ');
    _utilJs.assert.includes(doc, '.github-markdown [data-ice="content"]', 'ESDoc has two goals.');
  });

  /** @test {ManualDocBuilder#_buldManual} */
  it('has changelog', function () {
    var doc = (0, _utilJs.readDoc)('manual/changelog.html');
    _utilJs.assert.includes(doc, '.github-markdown h1', 'Changelog');
    _utilJs.assert.includes(doc, '.github-markdown [data-ice="content"] h2:nth-of-type(1)', '0.0.1');
  });
});