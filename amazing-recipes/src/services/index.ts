import database from "config/database";
import user from "./user";

const items = {
  user,
};

const services = {
  async use(id: keyof typeof items) {
    const client = await database.connect();
    return items[id](client);
  },
};

export default services;
