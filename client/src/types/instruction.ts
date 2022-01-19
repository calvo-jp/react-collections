interface IInstruction {
  id: number;
  recipeId: number;
  description: string;
  image?: string;
  video?: string;
  createdAt: string;
  updatedAt: string;
}

export default IInstruction;
