/**
 *
 * @param {Array} array
 * @param {number} size
 *
 */
const arrayChunk = (array, size) => {
  let arr = [...array];
  let len = arr.length;

  if (len < size) return [arr];

  let max = Math.ceil(len / size);
  let idx = 0;

  const chunks = [];

  for (; idx < max; idx++) chunks.push(arr.splice(0, size));

  return chunks;
};

module.exports = arrayChunk;
