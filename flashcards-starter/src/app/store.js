import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from "../features/topics/topicsslice";
import quizzesReducer from "../features/quizzes/quizzesslice";
import cardsReducer from "../features/cards/cardsslice";

export default configureStore({
  reducer: {
    topics: topicsReducer,
    quizzes: quizzesReducer,
    cards: cardsReducer
  },
});
