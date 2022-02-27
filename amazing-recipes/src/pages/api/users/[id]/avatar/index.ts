import formidable from "formidable";
import { NextApiHandler } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (request, reply) => {
  switch (request.method) {
    case "PUT":
      const form = new formidable.IncomingForm();

      form.parse(request, (err, fields, files) => {
        console.log(files);
      });

      reply.status(200).end();
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
