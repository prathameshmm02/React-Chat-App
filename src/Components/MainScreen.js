import React, { useState } from "react";
import Chat from "./Chat";
import ChatList from "./ChatList";
import { getAuth, updateProfile } from "firebase/auth";
import { Button } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function MainScreen() {
  const [chatID, setChatID] = useState("newChat");
  return (
    <div>
      <main>
        <ChatList setChatID={setChatID} />
        <Chat id={chatID} />
      </main>
      <DisplayName />
    </div>
  );
}
function signOutUser() {
  const auth = getAuth();
  auth.signOut();
}

function DisplayName() {
  const [open, setOpen] = useState(getAuth().currentUser.displayName === null);

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState("");

  const createUser = () => {
    updateProfile(getAuth().currentUser, {
      displayName: name,
    });
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Your Name</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={createUser} disabled={!name}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
