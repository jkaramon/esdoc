import path from 'path';
import _ from 'core-js';
import estraverse from 'estraverse-fb';
import * as babylon from 'babylon';




/**
 * Plugin system for your plugin.
 */
class Plugin {
  /**
   * create instance.
   */
  constructor()  {
    this._plugins = null;
  }

  /**
   * initialize with plugin property.
   * @param {Array<{name: string, option: object}>} plugins - expect config.plugins property.
   */
  init(plugins = []) {
    this._plugins = copy(plugins);
  }

  /**
   * exec plugin handler.
   * @param {string} handlerName - handler name(e.g. onHandleCode)
   * @param {PluginEvent} ev - plugin event object.
   * @param {boolean} [giveOption=false] - if true, event has plugin option.
   * @private
   */
  _execHandler(handlerName, ev, giveOption = false) {
    for (let item of this._plugins) {
      let plugin;
      if (item.name.match(/^[.\/]/)) {
        const pluginPath = path.resolve(item.name);
        plugin = require(pluginPath);
      } else {
        module.paths.push('./node_modules');
        plugin = require(item.name);
        module.paths.pop();
      }

      if (!plugin[handlerName]) continue;

      if (giveOption) ev.data.option = item.option;

      plugin[handlerName](ev);
    }
  }

  /**
   * handle start.
   */
  onStart() {
    const ev = new PluginEvent();
    this._execHandler('onStart', ev, true);
  }

  /**
   * handle config.
   * @param {ESDocConfig} config - original esdoc config.
   * @returns {ESDocConfig} handled config.
   */
  onHandleConfig(config) {
    const ev = new PluginEvent({config});
    this._execHandler('onHandleConfig', ev);
    return ev.data.config;
  }

  /**
   * handle code.
   * @param {string} code - original code.
   * @returns {string} handled code.
   */
  onHandleCode(code) {
    const ev = new PluginEvent({code});
    this._execHandler('onHandleCode', ev);
    return ev.data.code;
  }

  /**
   * handle code parser.
   * @param {function(code: string)} parser - original js parser.
   * @returns {function(code: string)} handled parser.
   */
  onHandleCodeParser(parser) {
    const ev = new PluginEvent();
    ev.data.parser = parser;
    this._execHandler('onHandleCodeParser', ev);
    return ev.data.parser;
  }

  /**
   * handle AST.
   * @param {AST} ast - original ast.
   * @returns {AST} handled AST.
   */
  onHandleAST(ast) {
    const ev = new PluginEvent({ast});
    this._execHandler('onHandleAST', ev);
    return ev.data.ast;
  }

  /**
   * handle tag.
   * @param {Tag} tag - original tag(s).
   * @returns {Tag} handled tag.
   */
  onHandleTag(tag) {
    const ev = new PluginEvent({tag});
    this._execHandler('onHandleTag', ev);
    return ev.data.tag;
  }

  /**
   * handle HTML.
   * @param {string} html - original HTML.
   * @returns {string} handled HTML.
   */
  onHandleHTML(html) {
    const ev = new PluginEvent({html});
    this._execHandler('onHandleHTML', ev);
    return ev.data.html;
  }

  /**
   * handle complete
   */
  onComplete() {
    const ev = new PluginEvent();
    this._execHandler('onComplete', ev);
  }
}

/**
 * Plugin Event class.
 */
export class PluginEvent {
  /**
   * create instance.
   * @param {Object} data - event content.
   */
  constructor(data = {}) {
    this.data = copy(data);
  }
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Instance of Plugin class.
 */
export default new Plugin();
