import type { BudgetCategory } from "./budgetItem.types";

type BudgetCategoryOption = {
  label: string;
  value: BudgetCategory;
};

export const BUDGET_CATEGORY_OPTIONS: BudgetCategoryOption[] = [
  { value: "ACCOMMODATION", label: "Alojamiento" },
  { value: "TRANSPORT", label: "Transporte" },
  { value: "FOOD", label: "Comida" },
  { value: "ACTIVITIES", label: "Actividades" },
  { value: "SHOPPING", label: "Compras" },
  { value: "OTHER", label: "Otros" },
];
