import type { BudgetItem } from "../../generated/prisma/client.js";
import type { BudgetCategory } from "../../generated/prisma/enums.js";

export type BudgetItemResponse = {
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

export function toBudgetItemResponse(
  budgetItem: BudgetItem,
): BudgetItemResponse {
  return {
    id: budgetItem.id,
    tripId: budgetItem.tripId,
    activityId: budgetItem.activityId,
    category: budgetItem.category,
    description: budgetItem.description,
    estimatedAmount: budgetItem.estimatedAmount.toFixed(2),
    actualAmount:
      budgetItem.actualAmount === null
        ? null
        : budgetItem.actualAmount.toFixed(2),
    createdAt: budgetItem.createdAt.toISOString(),
    updatedAt: budgetItem.updatedAt.toISOString(),
  };
}
