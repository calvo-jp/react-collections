/**
 * @description Removes properties with null values in objects. Also, supports array.
 */
const removeNull = (subject: any): any => {
  if (Array.isArray(subject)) return subject.map(removeNull);

  if (isPlainObject(subject)) {
    const filtered: Record<string, any> = {};

    for (const [key, value] of Object.entries(subject)) {
      if (value === null) continue;

      filtered[key] = removeNull(value);
    }

    return filtered;
  }

  return subject;
};

const isPlainObject = (subject: any): subject is {} => {
  return Object(subject) === subject && subject.constructor === Object;
};

const utils = {
  removeNull,
  isPlainObject,
};

export default utils;
