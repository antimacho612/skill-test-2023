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
  const itemCount = Number(args[0].split(' ')[0]);
  const graph = new Graph(itemCount);
  args.slice(1).forEach((condition) => {
    const [destination, source, weight] = condition.split(' ').map((numStr) => Number(numStr));
    graph.addEdge(source - 1, destination - 1, weight);
  });

  const distance = resolvePriceRelations(graph, 0);

  if (!distance) {
    console.log(-1);
    return;
  }

  const base = Math.abs(Math.min(0, ...distance)) + 1;
  console.log(distance.map((d) => d + base).join('\n'));
}

function resolvePriceRelations(graph, sourceVertex) {
  const distance = new Array(graph.vertices).fill(Infinity);
  distance[sourceVertex] = 0;

  for (let i = 0; i < graph.vertices; i++) {
    for (const { source, destination, weight } of graph.edges) {
      if (Number.isFinite(distance[source]) && distance[source] - weight < distance[destination]) {
        distance[destination] = distance[source] - weight;
      }
    }
  }

  for (const { source, destination, weight } of graph.edges) {
    if (distance[source] - weight < distance[destination]) {
      return undefined;
    }
  }

  return distance.map((d) => -d);
}

class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.edges = [];
  }

  addEdge(source, destination, weight) {
    this.edges.push({ source, destination, weight });
  }
}
