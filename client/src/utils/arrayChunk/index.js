const arrayChunk = (array, size) => {
  let arr = [...array];
  let len = arr.length;
  let max = Math.ceil(len / size);
  let idx = 0;

  const chunks = [];

  for (; idx < max; idx++) chunks.push(arr.splice(0, size));

  return chunks;
};

module.exports = arrayChunk;
