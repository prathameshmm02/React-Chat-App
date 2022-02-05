import React from "react";
import Message from "./Message";
import {
  getFirestore,
  collection,
  query,
  limit,
  orderBy,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import sendIcon from '../send_icon.svg';
import { getAuth } from "firebase/auth";
/**
 * Chat Messages Component
 */
export  default function Chat() {
  const db = getFirestore();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(q, { idField: "id" });

  console.log(messages)
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = getAuth().currentUser;
    await addDoc(collection(db, "messages"), {
      createdAt: serverTimestamp(),
      text: document.getElementById("chatBox").value,
      uid: uid,
      photoURL: photoURL
    })
    document.getElementById("chatBox").value = ""
  };

  return (
    <div>
      <h1>Chatty</h1>
      <div>
        {messages &&
          messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))
        }
      </div>
      <div>
        <input type="text" id="chatBox" />
        <button onClick={sendMessage}>
          <img src={sendIcon} alt="Send" />
        </button>
      </div>
    </div>
  );
}