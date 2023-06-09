import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { addTask, updateMe, useMe } from "@services/firebase/firestore";
import { State, Action } from "@/App.reducer";
import TrelloDialog from "./TrelloDialog";
import { Stack } from "@mui/material";
import React from "react";

export default function Dump({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const me = useMe();

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const token = hash.match(/token=(.*)/)?.[1];

    if (token && token !== me?.trelloToken) {
      updateMe({ trelloToken: token });
    }
  }, []);

  return (
    <Stack spacing={2}>
      <p>What would you like to work on today? Include one task per line.</p>

      <TextField
        id="tasks"
        label="Tasks"
        variant="outlined"
        multiline
        fullWidth
        value={state.tasks.join("\n")}
        onChange={(e) =>
          dispatch({ type: "setTasks", payload: e.target.value })
        }
      />

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <TrelloDialog />

        <Button
          variant="contained"
          onClick={() => {
            dispatch({ type: "setMode", payload: "estimate" });
            state.tasks.forEach((title: string) => addTask({ title }));
          }}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
