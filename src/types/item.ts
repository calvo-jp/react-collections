interface IItem {
  id: string;
  amount: number;
  description: string;
  createdAt: number;
  isIncome?: boolean;
}

export default IItem;
