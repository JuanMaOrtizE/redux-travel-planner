import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createTripSchema,
  type CreateTripFormValues,
} from "./createTrip.schema";
import { useCreateTripMutation } from "./tripsApi";
import { mapCreateTripFormToRequest } from "./createTrip.mapper";

export default function CreateTripForm() {
  const [createTrip] = useCreateTripMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTripFormValues>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      currency: "USD",
      budgetLimit: "",
    },
  });

  async function handleCreateTripSubmit(values: CreateTripFormValues) {
    const request = mapCreateTripFormToRequest(values);
    try {
      await createTrip(request).unwrap();
    } catch {
      // El estado de error de la mutation se mostrará en la siguiente tarea.
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleCreateTripSubmit)}>
      <div>
        <label htmlFor="title">Título</label>

        <input id="title" type="text" {...register("title")} />

        {errors.title?.message && <p role="alert">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description">Descripción (opcional)</label>
        <textarea id="description" rows={4} {...register("description")} />
        {errors.description?.message && (
          <p role="alert">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="startDate">Fecha inicial</label>
        <input id="startDate" type="date" {...register("startDate")} />
        {errors.startDate?.message && (
          <p role="alert">{errors.startDate.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="endDate">Fecha final</label>
        <input id="endDate" type="date" {...register("endDate")} />
        {errors.endDate?.message && (
          <p role="alert">{errors.endDate.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="currency">Moneda</label>
        <select id="currency" {...register("currency")}>
          <option value="USD">USD</option>
          <option value="COP">COP</option>
          <option value="EUR">EUR</option>
        </select>
        {errors.currency?.message && (
          <p role="alert">{errors.currency.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="budgetLimit">Presupuesto máximo (opcional)</label>
        <input
          id="budgetLimit"
          type="text"
          inputMode="decimal"
          placeholder="2500.00"
          {...register("budgetLimit")}
        />
        {errors.budgetLimit?.message && (
          <p role="alert">{errors.budgetLimit.message}</p>
        )}
      </div>
      <button type="submit">Crear viaje</button>
    </form>
  );
}
