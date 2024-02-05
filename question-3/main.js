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
  const [dataCount, penalty] = args[0].split(' ').map((numStr) => Number(numStr));

  if (penalty === 0) {
    console.log(0);
    return;
  }

  const points = args.slice(1).map((pointStr) => pointStr.split(' ').map((numStr) => Number(numStr)));

  const leastSquaresErrors = {};

  // TODO: 未完成
  for (let i = 0; i < dataCount; i++) {
    leastSquaresErrors[i] = [];

    for (let j = i; j < dataCount; j++) {
      leastSquaresErrors[i].push(calculateLeastSquaresError(points.slice(i, j + 1)));
    }
  }
}

function calculateLeastSquaresError(points) {
  if (points.length === 1) return 0;

  const [sumX, sumY, sumXY, sumX2] = points.reduce(
    (acc, [x, y]) => {
      acc[0] += x;
      acc[1] += y;
      acc[2] += x * y;
      acc[3] += x ** 2;

      return acc;
    },
    [0, 0, 0, 0]
  );

  const n = points.length;
  const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
  const b = (sumY - a * sumX) / n;

  let sumSquaredErrors = 0;
  points.forEach(([x, y]) => {
    const predictedY = a * x + b;
    const error = y - predictedY;
    sumSquaredErrors += error ** 2;
  });

  return sumSquaredErrors;
}
