interface Config {
  /** remove extra whitespaces */
  trim?: boolean;
  /** the character to use when splitting the subject */
  delimiter?: string;
}

const capitalize = (subject: string, config?: Config) => {
  if (!config) config = {};
  if (!config.trim) config.trim = false;
  if (!config.delimiter) config.delimiter = '. ';

  if (config.trim) subject = subject.trim();
  if (subject.length < 1) return subject;

  return subject
    .split(config.delimiter)
    .map((value) => value.at(0)?.toUpperCase().concat(value.substring(1)))
    .join(config.delimiter);
};

export default capitalize;
