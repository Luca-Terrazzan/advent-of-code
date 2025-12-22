function flatten(input, maxDepth = 5) {
  const collector = [];

  function _flatten(input, collector, maxDepth) {
    if (maxDepth === 0) {
      throw 'Max depth reached!';
    }
    if (!Array.isArray(input)) {
      collector.push(input);
      return;
    }
    for (item of input) {
      _flatten(item, collector, maxDepth - 1);
    }
  }
  _flatten(input, collector, maxDepth);

  return collector;
}


console.log(flatten([1, 2, 3, ['a', 'b', [6, 6]]]))