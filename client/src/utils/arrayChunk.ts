const arrayChunk = <T extends unknown[]>(array: T, size: number) => {
  const chunks: T[] = [];

  var len = array.length;
  var max = Math.ceil(len / size);
  var idx = 0;

  for (; idx < max; idx++)
    // @ts-expect-error
    chunks.push(array.splice(0, size));

  return chunks;
};

export default arrayChunk;
