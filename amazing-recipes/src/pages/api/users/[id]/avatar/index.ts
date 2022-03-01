import formidable from "formidable";
import fs from "fs/promises";
import { NextApiHandler } from "next";
import path from "node:path";
import services from "services";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (request, reply) => {
  const collection = await services.use("user");

  switch (request.method) {
    case "PUT":
      const form = new formidable.IncomingForm();

      form.parse(request, async (err, _, file) => {
        if (err) return reply.status(400).json(err);

        // @types/formidable unfortunately has wrong types
        if (!file.avatar) return reply.status(400).end();

        const avatar = file.avatar as formidable.File;

        const buffer = await fs.readFile(avatar.filepath);

        fs.writeFile(".", buffer);
        fs.unlink(avatar.filepath);
      });

      break;
    case "DELETE":
      reply.status(503).end();
      break;
    default:
      reply.status(405).end();
      break;
  }
};

export default handler;
