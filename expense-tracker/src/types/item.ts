type ItemType = 'income' | 'expense';

interface IItem {
  id: string;
  amount: number;
  description: string;
  createdAt: number;
  type: ItemType;
}

export default IItem;
