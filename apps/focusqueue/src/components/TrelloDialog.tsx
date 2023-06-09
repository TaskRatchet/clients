import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/App";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { authenticate, getBoards, getCards } from "@services/trello";
import { useMe } from "@services/firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import React from "react";

export default function TrelloDialog() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Record<string, boolean>>({});
  const [, dispatch] = useContext(AppContext);
  const me = useMe();
  const { data, isLoading, refetch } = useQuery(
    ["boards"],
    () => {
      return typeof me?.trelloToken == "string"
        ? getBoards(me.trelloToken)
        : [];
    },
    { placeholderData: [] }
  );

  useEffect(() => {
    refetch();
  }, [me?.trelloToken]);

  if (data === undefined) {
    return null;
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          if (typeof me?.trelloToken !== "string") {
            authenticate();
          }
          setOpen(true);
        }}
      >
        Import from Trello
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Boards to Import</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <FormGroup>
              {data.map((board) => (
                <FormControlLabel
                  key={board.id}
                  control={
                    <Checkbox
                      checked={!!items?.[board.id]}
                      onChange={(e) =>
                        setItems({ ...items, [board.id]: e.target.checked })
                      }
                    />
                  }
                  label={board.name}
                />
              ))}
            </FormGroup>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={async () => {
              setOpen(false);
              if (typeof me?.trelloToken !== "string") return;
              const cards = await getCards(
                me?.trelloToken,
                Object.keys(items).filter((id) => items[id])
              );
              dispatch({
                type: "appendTasks",
                payload: cards.map((c) => c.name),
              });
            }}
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
