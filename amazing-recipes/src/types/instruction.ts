interface IInstruction {
  id: number;
  recipeId: number;
  description: string;
  image: string | null;
  video: string | null;
  createdAt: string;
  updatedAt: string;
}

export default IInstruction;
