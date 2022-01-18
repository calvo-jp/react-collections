import type { MultipartFile } from 'fastify-multipart';
import * as fs from 'fs';
import * as afs from 'fs/promises';
import * as path from 'path';
import * as stream from 'stream';
import * as util from 'util';
import { v4 as uuid } from 'uuid';

interface UploadedFile {
  type: string;
  name: string;
}

/** Image or video upload helper */
class UploadsManager {
  version = '0.0.1';

  constructor(private uploadsDir: string) {}

  /**
   *
   * @param multipart parsed multipart from request
   * @param whitelist allowed mimetypes
   *
   */
  async upload(
    multipart: MultipartFile,
    whitelist?: string[]
  ): Promise<UploadedFile | null> {
    if (whitelist && !whitelist.includes(multipart.mimetype)) return null;

    const extension = path.extname(multipart.filename);
    const basename = path.basename(multipart.filename, extension);

    // prettier-ignore
    const filename = [
      this.version,
      uuid(),
      basename.toLowerCase().replace(/--./g, (match) => {
        return match.substring(2).toUpperCase();
      }),
    ]
      .map((value) => "[" + value + "]")
      .join("")
      .concat(extension);

    const dest = fs.createWriteStream(path.join(this.uploadsDir, filename));
    const pipe = util.promisify(stream.pipeline);

    await pipe(multipart.file, dest);

    return {
      type: multipart.mimetype,
      name: filename,
    };
  }

  async delete(filename: string) {
    const fullpath = path.join(this.uploadsDir, filename);

    if (fs.existsSync(fullpath)) await afs.unlink(fullpath);
  }
}

export default UploadsManager;
