import { useParams } from "react-router-dom";

export default function TripDetailPage() {
  const { tripId } = useParams<{ tripId: string }>();

  return <p>ID del viaje: {tripId}</p>;
}
