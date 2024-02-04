/**
 * ノード
 * @abstract
 */
class BaseNode {
  /**
   * コンストラクタ
   * @param {number} remainingLines 残行数
   * @param {Developer} developer 開発者
   * @param {number} totalHours ここまでの合計作業時間
   */
  constructor(remainingLines, developer, totalHours) {
    if (this.constructor === BaseNode) throw new Error("Abstract classes can't be instantiated.");

    this.remainingLines = remainingLines;
    this.developer = developer;
    this.totalHours = totalHours;

    this.doAction();
  }

  /**
   * 葉ノードかどうかを返却する
   * @returns {boolean} 葉ノードの場合はtrue
   */
  get isLeaf() {
    return this.remainingLines === 0;
  }

  /**
   * 各ノードのルールに従って行動する
   * @abstract
   * @private
   */
  doAction() {
    throw new Error("Method 'doAction' must be implemented.");
  }

  /**
   * 子ノードを取得する
   * @abstract
   * @returns {BaseNode[]} 子ノード
   */
  getChildNodes() {
    throw new Error("Method 'getChildNodes' must be implemented.");
  }
}

module.exports = BaseNode;
