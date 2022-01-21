import { TSchema, Type } from '@sinclair/typebox';

const TPaginated = <T extends TSchema>(type: T) => {
  return Type.Object({
    page: Type.Number(),
    pageSize: Type.Number(),
    search: Type.Optional(Type.String()),
    rows: Type.Array(type),
    totalRows: Type.Number(),
    hasNext: Type.Boolean(Type.String()),
  });
};

export default TPaginated;
