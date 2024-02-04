const BaseNode = require('./base-node');

/**
 * 開発を行ったことを表すノード
 */
class DevelopNode extends BaseNode {
  /**
   * @override
   * @private
   */
  doAction() {
    this.remainingLines = this.developer.develop(this.remainingLines);
    this.totalHours += 1;
  }
}

module.exports = DevelopNode;
