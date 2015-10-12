'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utilJs = require('./../util.js');

/** @test {CoverageBuilder} */
describe('Coverage:', function () {

  /** @test {CoverageBuilder#exec} */
  it('has coverage.json', function () {
    var json = _fs2['default'].readFileSync('./test/fixture/esdoc/coverage.json', { encoding: 'utf8' }).toString();
    var coverage = JSON.parse(json);
    _utilJs.assert.equal(coverage.coverage, '89.58%');
    _utilJs.assert.equal(coverage.expectCount, 144);
    _utilJs.assert.equal(coverage.actualCount, 129);
    _utilJs.assert.deepEqual(coverage.files, {
      "src/ForTestDoc/AbstractDoc.js": {
        "expectCount": 3,
        "actualCount": 0,
        "undocumentLines": [1, 2, 4]
      },
      "src/ForTestDoc/ClassDoc.js": {
        "expectCount": 1,
        "actualCount": 0,
        "undocumentLines": [3]
      },
      "src/ForTestDoc/ClassDocBuilder.js": {
        "expectCount": 2,
        "actualCount": 0,
        "undocumentLines": [1, 2]
      },
      "src/MyClass.js": {
        "expectCount": 43,
        "actualCount": 38,
        "undocumentLines": [225, 230, 144, 145, 146]
      },
      "src/MyError.js": {
        "expectCount": 1,
        "actualCount": 1,
        "undocumentLines": []
      },
      "src/MyEvent.js": {
        "expectCount": 1,
        "actualCount": 1,
        "undocumentLines": []
      },
      "src/Export.js": {
        "expectCount": 23,
        "actualCount": 23,
        "undocumentLines": []
      },
      "src/MyExpressionExtend.js": {
        "expectCount": 2,
        "actualCount": 2,
        "undocumentLines": []
      },
      "src/MyInterface.js": {
        "expectCount": 3,
        "actualCount": 3,
        "undocumentLines": []
      },
      "src/ExtendNest.js": {
        "expectCount": 2,
        "actualCount": 2,
        "undocumentLines": []
      },
      "src/ReactJSX.js": {
        "expectCount": 2,
        "actualCount": 2,
        "undocumentLines": []
      },
      "src/OtherClass/SuperMyClass.js": {
        "expectCount": 19,
        "actualCount": 19,
        "undocumentLines": []
      },
      "src/Z001_MyDuplicationPropertyClass.js": {
        "expectCount": 5,
        "actualCount": 5,
        "undocumentLines": []
      },
      "src/Z002_MyComputedMethodClass.js": {
        "expectCount": 10,
        "actualCount": 10,
        "undocumentLines": []
      },
      "src/nMyAnonymous.js": {
        "expectCount": 4,
        "actualCount": 4,
        "undocumentLines": []
      },
      "src/Z003_MyInvalidLintClass.js": {
        "actualCount": 5,
        "expectCount": 5,
        "undocumentLines": []
      },
      "src/myFunction.js": {
        "expectCount": 10,
        "actualCount": 8,
        "undocumentLines": [50, 55]
      },
      "src/myVariable.js": {
        "expectCount": 8,
        "actualCount": 6,
        "undocumentLines": [22, 23]
      }
    });
  });

  /** @test {CoverageBuilder#exec} */
  it('creates coverage badge', function () {
    var json = _fs2['default'].readFileSync('./test/fixture/esdoc/coverage.json', { encoding: 'utf8' }).toString();
    var coverage = JSON.parse(json);
    var badge = _fs2['default'].readFileSync('./test/fixture/esdoc/badge.svg', { encoding: 'utf8' }).toString();
    var ratio = Math.floor(100 * coverage.actualCount / coverage.expectCount) + '%';
    (0, _utilJs.assert)(badge.includes(ratio));
  });
});