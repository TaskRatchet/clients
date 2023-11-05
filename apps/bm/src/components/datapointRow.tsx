import { useMutation } from "@tanstack/react-query";
import { deleteDatapoint } from "../bm";
import cnx from "../cnx";

export default function DatapointRow({
  goal,
  point,
}: {
  goal: string;
  point: {
    id: string;
    daystamp: string;
    comment: string;
    value: number;
  };
}) {
  const del = useMutation(() => deleteDatapoint(goal, point.id));

  return (
    <tr key={point.id} data-id={point.id}>
      <td>{point.daystamp}</td>
      <td>{point.comment}</td>
      <td>{point.value}</td>
      <td>
        <button
          type="button"
          class={cnx("icon-button", del.isLoading && "spin")}
          onClick={() => {
            if (confirm("Are you sure you want to delete this datapoint?")) {
              del.mutate();
            }
          }}
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}
