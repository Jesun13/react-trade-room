import React, { useEffect, useState } from "react";
import { Timer } from "./Timer";
import { getPadTime } from "../components/helpers/getPadTime";

export const Table = ({ users, timeLeft, isCouting, setTimeLeft }) => {
  const [time, setTime] = useState(1);

  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      isCouting &&
        setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, 1000);
    if (timeLeft === 0) {
      setTimeLeft(120);
    }
    return () => clearInterval(interval);
  }, [timeLeft, isCouting]);

  useEffect(() => {
    const switchTime = 120000 / users.length;
    const timeInterval = setInterval(() => {
      isCouting && setTime((time) => (time <= users.length ? time + 1 : 1));
    }, switchTime);
    if (time > users.length) {
      setTime(1);
    }
    return () => clearInterval(timeInterval);
  }, [time, isCouting]);

  return (
    <div className="container">
      <table className="table">
        <thead className="move">
          <th>ХОД</th>
          {users.length == 0 ? (
            <Timer minutes={minutes} seconds={seconds} />
          ) : (
            users.map((user) => (
              <th key={user.id}>
                {user.id === time && (
                  <Timer
                    minutes={minutes}
                    seconds={seconds}
                    userId={user.id}
                    time={time}
                  />
                )}
              </th>
            ))
          )}
        </thead>
        <thead className="thead">
          <th className="main">ПАРАМЕТРЫ ТРЕБОВАНИЯ</th>
          {users.map((user) => (
            <th className="trade_user" key={user.id}>
              {user.name}
            </th>
          ))}
        </thead>
        <tbody>
          <tr>
            <td className="main">
              Наличие комплексов мероприятий, повышающих стандарты качества
              изготовления
            </td>
            {users.map((user) => (
              <td className="trade_user" key={user.id}>
                {user.complexesOfMeasures}
              </td>
            ))}
          </tr>
          <tr>
            <td className="main"> Срок изготвления лота, дней</td>
            {users.map((user) => (
              <td className="trade_user" key={user.id}>
                {user.productionPeriod}
              </td>
            ))}
          </tr>
          <tr>
            <td className="main">Гарантийные обязательства, мес</td>
            {users.map((user) => (
              <td className="trade_user" key={user.id}>
                {user.warranty}
              </td>
            ))}
          </tr>
          <tr>
            <td className="main">Условия оплаты</td>
            {users.map((user) => (
              <td className="trade_user" key={user.id}>
                {user.paymentTerms}%
              </td>
            ))}
          </tr>
          <tr>
            <td className="main">Стоимость изготвления лота, руб (без НДС)</td>
            {users.map((user) => (
              <td className="trade_user cost" key={user.id}>
                {user.cost}
              </td>
            ))}
          </tr>
          <tr>
            <td className="main">Действия:</td>
            {users.map((user) => (
              <td className="trade_user" key={user.id}>
                {user.action}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
