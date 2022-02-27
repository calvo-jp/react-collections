import { NextApiHandler } from "next";
import services from "services";
import * as yup from "yup";

const handler: NextApiHandler = async (request, reply) => {
  const collection = await services.use("user");

  switch (request.method) {
    case "GET":
      const users = await collection.read.all();
      reply.status(200).json(users);
      break;

    case "POST":
      const schema = yup.object().shape({
        name: yup.string().min(5).max(25).required(),
        email: yup.string().email().required(),
        password: yup.string().min(5).max(50).required(),
      });

      try {
        const body = await schema.validate(request.body, {
          stripUnknown: true,
          abortEarly: true,
        });

        const user = await collection.create(body);
        reply.status(201).json(user);
      } catch (error) {
        reply.status(400).json(error);
      }

      break;
    default:
      reply.status(405).end();
      break;
  }
};

export default handler;
