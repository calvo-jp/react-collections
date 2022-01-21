const arrayChunk = (array, size) => {
  const chunks = [];
  const copy = [...array];

  let len = array.length;
  let max = Math.ceil(len / size);
  let idx = 0;

  for (; idx < max; idx++) chunks.push(copy.splice(0, size));

  return chunks;
};

module.exports = arrayChunk;
