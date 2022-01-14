import recipe from './recipe';
import Db from './types/db';
import user from './user';

interface Menu {
  user: typeof user;
  recipe: typeof recipe;
}

const services = {
  init: (db: Db) => ({
    get<Id extends keyof Menu>(id: Id): ReturnType<Menu[Id]> {
      return {
        user,
        recipe,
      }[id](db) as any; // sh*t!
    },
  }),
};

export default services;
