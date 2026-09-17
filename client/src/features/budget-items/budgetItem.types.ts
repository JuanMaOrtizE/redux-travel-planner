export type BudgetCategory =
  | "ACCOMMODATION"
  | "TRANSPORT"
  | "FOOD"
  | "ACTIVITIES"
  | "SHOPPING"
  | "OTHER";

export type BudgetItem = {
  id: string;
  tripId: string;
  activityId: string | null;
  category: BudgetCategory;
  description: string;
  estimatedAmount: string;
  actualAmount: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListBudgetItemsResponse = {
  data: { budgetItems: BudgetItem[] };
};

export type CreateBudgetItemBody = {
  activityId?: string | null;
  category: BudgetCategory;
  description: string;
  estimatedAmount: string;
  actualAmount?: string | null;
};

export type CreateBudgetItemRequest = {
  tripId: string;
  body: CreateBudgetItemBody;
};

export type CreateBudgetItemResponse = {
  data: { budgetItem: BudgetItem };
};

export type UpdateBudgetItemBody = {
  activityId?: string | null;
  category?: BudgetCategory;
  description?: string;
  estimatedAmount?: string;
  actualAmount?: string | null;
};

export type UpdateBudgetItemRequest = {
  tripId: string;
  budgetItemId: string;
  body: UpdateBudgetItemBody;
};

export type UpdateBudgetItemResponse = {
  data: { budgetItem: BudgetItem };
};

export type DeleteBudgetItemRequest = {
  tripId: string;
  budgetItemId: string;
};
