import "./App.css";
import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import User from "./components/Users";
import { Table } from "./components/Table";

function App() {
  const [count, setCount] = useState(4);
  const [users, setUsers] = useState([User[0], User[1], User[2], User[3]]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isCouting, setIsCouting] = useState(false);

  const handleAdd = () => {
    if (count < User.length) {
      setUsers([...users, User[count]]);
      setCount(count + 1);
    } else {
      alert("Пользователи закончились");
    }
  };

  const handleRemove = () => {
    if (count !== 0) {
      setUsers((prevState) => {
        const idx = users.length - 1;
        return [...prevState.slice(0, idx), ...prevState.slice(idx + 1)];
      });
      setCount(count - 1);
    } else if (count < 0) {
      alert("Вы можете только добавить пользователя");
    }
  };

  const handleStart = () => {
    if (timeLeft === 0) setTimeLeft(120);
    setIsCouting(true);
  };
  const handleStop = () => {
    setIsCouting(false);
  };

  const handleRestart = () => {
    setTimeLeft(120);
    setIsCouting(false);
  };

  return (
    <div className="App">
      <Header />
      <Table
        users={users}
        timeLeft={timeLeft}
        isCouting={isCouting}
        setTimeLeft={setTimeLeft}
      />
      <div className="btn_start">
        {isCouting ? (
          <button onClick={handleStop} >Стоп</button>
        ) : (
          <button onClick={handleStart} >Старт</button>
        )}
        <button onClick={handleRestart}>Рестарт</button>
      </div>
      <div className="btn_add">
        <button onClick={handleAdd}>Добавить пользователя</button>
        <button onClick={handleRemove}> Удалить пользователя</button>
      </div>
    </div>
  );
}

export default App;
