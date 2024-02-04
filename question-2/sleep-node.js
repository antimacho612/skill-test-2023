const BaseNode = require('./base-node');

/**
 * 睡眠をとったことを表すノード
 */
class SleepNode extends BaseNode {
  /**
   * @override
   * @private
   */
  doAction() {
    this.developer.sleep();
    this.totalHours += 3;
  }
}

module.exports = SleepNode;
