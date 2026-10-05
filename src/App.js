import logo from './logo.svg';
import './App.css';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import Header from "./components/Header";
import { ThemeContext } from "./context/ThemeContext";
function App() {
  return (
    <main >
      <Header></Header>
    </main>
  );
}

export default App;
