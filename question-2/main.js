const Developer = require('./developer');
const DevelopNode = require('./develop-node');
const SleepNode = require('./sleep-node');

process.stdin.resume();
process.stdin.setEncoding('utf8');

const args = [];

const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdin,
});
reader.on('line', (input) => args.push(input));
reader.on('close', main);

function main() {
  const [totalLines, maxLinesParHour, decreaseRate, increaseRate] = args[0].split(' ').map((numStr) => Number(numStr));
  const minHour = resolve(totalLines, maxLinesParHour, decreaseRate, increaseRate);
  console.log(minHour);
}

function resolve(totalLines, maxLinesParHour, decreaseRate, increaseRate) {
  const developer = new Developer(maxLinesParHour, maxLinesParHour, decreaseRate, increaseRate);

  const startNode = new DevelopNode(totalLines, developer, 0);
  if (startNode.remainingLines === 0) {
    return startNode.totalHours;
  }

  let minHours = Infinity;
  let currentLevelNodes = [startNode];
  let counter = 0;
  while (currentLevelNodes.length) {
    const nextLevelNodes = [];
    currentLevelNodes.forEach((node) => {
      if (node.isLeaf) {
        // 葉まで到達し、作業時間合計が現時点での最短作業時間を下回る場合は更新
        if (node.totalHours < minHours) {
          minHours = node.totalHours;
        }
      } else if (node.totalHours >= minHours) {
        // 現時点での最短作業時間を更新できないルートは探索をやめる
        return;
      } else {
        nextLevelNodes.push(...createChildNodes(node));
      }
    });

    currentLevelNodes = nextLevelNodes;
  }

  return minHours;
}

/**
 * 親ノードの情報をもとに子ノードを生成する
 * @param {BaseNode} node 親ノード
 * @returns {BaseNode[]} 子ノード
 */
function createChildNodes(node) {
  if (node.isLeaf) {
    return [];
  }

  // 開発者が残行数を1時間で書ききれる場合は睡眠をとる必要がない
  if (node.developer.linesParHour >= node.remainingLines) {
    return [new DevelopNode(node.remainingLines, node.developer.deepClone(), node.totalHours)];
  }

  // 開発者がコードを書けない状態の場合は必ず睡眠をとる
  if (node.developer.linesParHour === 0) {
    return [new SleepNode(node.remainingLines, node.developer.deepClone(), node.totalHours)];
  }

  return [
    new DevelopNode(node.remainingLines, node.developer.deepClone(), node.totalHours),
    new SleepNode(node.remainingLines, node.developer.deepClone(), node.totalHours),
  ];
}
