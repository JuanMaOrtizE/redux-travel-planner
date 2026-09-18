import type { CreateBudgetItemBody } from "./budgetItem.types";
import type { CreateBudgetItemFormValues } from "./createBudgetItem.schema";

export function mapCreateBudgetItemFormToBody(
  values: CreateBudgetItemFormValues,
): CreateBudgetItemBody {
  const body: CreateBudgetItemBody = {
    category: values.category,
    description: values.description,
    estimatedAmount: values.estimatedAmount,
  };

  if (values.activityId) {
    body.activityId = values.activityId;
  }

  if (values.actualAmount) {
    body.actualAmount = values.actualAmount;
  }

  return body;
}
