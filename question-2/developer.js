class Developer {
  #maxLinesParHour;
  #decreaseRate;
  #increaseRate;

  /**
   * コンストラクタ
   * @param {number} maxLinesParHour 1時間に最大何行書けるか
   * @param {number} linesParHour 現在1時間に何行書けるか
   * @param {number} decreaseRate 開発後に書ける行数が何行減るか
   * @param {number} increaseRate 睡眠後に書ける行数が何行増えるか
   */
  constructor(maxLinesParHour, linesParHour, decreaseRate, increaseRate) {
    this.#maxLinesParHour = maxLinesParHour;
    this.linesParHour = linesParHour;
    this.#decreaseRate = decreaseRate;
    this.#increaseRate = increaseRate;
  }

  /**
   * 開発する
   * @param {number} totalLines プログラムの総行数
   * @returns {number} 1時間開発を行った後のプログラムの残行数
   */
  develop(totalLines) {
    const remainingLines = Math.max(0, totalLines - this.linesParHour);
    this.linesParHour = Math.max(0, this.linesParHour - this.#decreaseRate);
    return remainingLines;
  }

  /**
   * 睡眠をとる
   */
  sleep() {
    this.linesParHour = Math.min(this.linesParHour + this.#increaseRate, this.#maxLinesParHour);
  }

  deepClone() {
    return new Developer(this.#maxLinesParHour, this.linesParHour, this.#decreaseRate, this.#increaseRate);
  }
}

module.exports = Developer;
