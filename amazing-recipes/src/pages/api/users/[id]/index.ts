import { NextApiHandler } from "next";
import services from "services";
import * as yup from "yup";

const handler: NextApiHandler = async (request, reply) => {
  const collection = await services.use("user");

  const id = request.query.id as string;

  switch (request.method) {
    case "GET":
      const user = await collection.read.one(id);

      if (user === null) reply.status(404).end();
      else return reply.status(200).json(user);

      break;
    case "PATCH":
      const schema = yup.object().shape({
        name: yup.string().min(5).max(25).optional(),
        email: yup.string().email().optional(),
      });

      try {
        const body = await schema.validate(request.body);

        const user = await collection.update(id, body);

        reply.status(200).json(user);
      } catch (error) {
        // TODO: catch NoResult and DuplicateEmail
        reply.status(400).json(error);
      }

      break;
    case "DELETE":
      await collection.delete(id);
      reply.status(204).end();
      break;
    default:
      reply.status(405).end();
      break;
  }
};

export default handler;
