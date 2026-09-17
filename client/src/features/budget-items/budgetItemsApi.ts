import { api } from "../../services/api";
import type {
  CreateBudgetItemRequest,
  CreateBudgetItemResponse,
  DeleteBudgetItemRequest,
  ListBudgetItemsResponse,
  UpdateBudgetItemRequest,
  UpdateBudgetItemResponse,
} from "./budgetItem.types";

export const budgetItemsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBudgetItems: builder.query<ListBudgetItemsResponse, string>({
      query: (tripId) => `trips/${tripId}/budget-items`,
      providesTags: (_result, _error, tripId) => [
        { type: "BudgetItems", id: tripId },
      ],
    }),
    createBudgetItem: builder.mutation<
      CreateBudgetItemResponse,
      CreateBudgetItemRequest
    >({
      query: ({ tripId, body }) => ({
        url: `trips/${tripId}/budget-items`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, error, { tripId }) =>
        error ? [] : [{ type: "BudgetItems", id: tripId }],
    }),
    updateBudgetItem: builder.mutation<
      UpdateBudgetItemResponse,
      UpdateBudgetItemRequest
    >({
      query: ({ tripId, budgetItemId, body }) => ({
        url: `trips/${tripId}/budget-items/${budgetItemId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, error, { tripId }) =>
        error ? [] : [{ type: "BudgetItems", id: tripId }],
    }),
    deleteBudgetItem: builder.mutation<void, DeleteBudgetItemRequest>({
      query: ({ tripId, budgetItemId }) => ({
        url: `trips/${tripId}/budget-items/${budgetItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, error, { tripId }) =>
        error ? [] : [{ type: "BudgetItems", id: tripId }],
    }),
  }),
});

export const {
  useGetBudgetItemsQuery,
  useCreateBudgetItemMutation,
  useUpdateBudgetItemMutation,
  useDeleteBudgetItemMutation,
} = budgetItemsApi;
