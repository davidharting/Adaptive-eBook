import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import NewSession from "./features/session/NewSession";
import SelectBook from "./features/select-book/SelectBook";
import Read from "./features/read/Read";
import { setContent } from "./features/content/contentSlice";
import { RootState } from "./app/store";
import content from "./content.json";

import "bootstrap/dist/css/bootstrap.min.css";

type GameStatus = "CREATE_SESSION" | "PICK_BOOK" | "PLAYING";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Sadly typescript I must once again ask you to trust me
    // Trust that this JSON file does indeed contain an array of Contentful Entries
    // @ts-ignore
    dispatch(setContent(content));
  }, [dispatch]);

  const gameStatus: GameStatus = useSelector((state: RootState) => {
    if (state.session.id === null) {
      return "CREATE_SESSION";
    }
    if (state.selectBook.bookId === null) {
      return "PICK_BOOK";
    }
    return "PLAYING";
  });

  return (
    <Container className="d-flex justify-content-center align-items-center vw-100 vh-100">
      <main>
        {gameStatus === "CREATE_SESSION" && <NewSession />}
        {gameStatus === "PICK_BOOK" && <SelectBook />}
        {gameStatus === "PLAYING" && <Read />}
      </main>
    </Container>
  );
}

export default App;
