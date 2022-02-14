const sha256 = async (message: string) => {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(message));

  return Array.from(new Uint8Array(buffer))
    .map((b) => '00' + b.toString(16))
    .join('');
};

export default sha256;
