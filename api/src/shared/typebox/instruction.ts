import { Type } from '@sinclair/typebox';

const TInstruction = Type.Object({
  id: Type.Number(),
  description: Type.String({ minLength: 5, maxLength: 100 }),
  image: Type.Union([Type.String(), Type.Null()]),
  video: Type.Union([Type.String(), Type.Null()]),
  recipeId: Type.Number(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});

export default TInstruction;
