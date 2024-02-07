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
  const [length, maxRepeatLength] = args[0].split(' ');
  const total = 2 ** length;

  let errorPatterns = 0;
  for (let i = length - maxRepeatLength; i >= 0; i--) {
    errorPatterns += 2 ** i * 2;

    // TODO: 残った右側の文字列の対処
    const rightRemaining = length - (maxRepeatLength + i);
    if (rightRemaining > 1) {
      //
    }
  }

  console.log((total - errorPatterns) / total);
}
