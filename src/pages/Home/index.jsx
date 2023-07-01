import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { login } from "../../store/slices/authSlice";

import { useFetch } from "../../hooks/useFetch";

import Navbar from "../../components/Navbar";

const allowExchanges = ["buenbit", "lemoncash", "binance"];

const Home = () => {
  const {
    data: users,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");
  const { data: coinPrice } = useFetch("https://criptoya.com/api/usdt/ars/0.1");

  const [userId, setUserId] = useState(null);
  const { isAuth } = useSelector((state) => state.auth);
  const [cotization, setCotization] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cotization);
  }, [cotization]);

  useEffect(() => {
    if (coinPrice) {
      const newCotizations = [];
      for (const [key, value] of Object.entries(coinPrice)) {
        const name = key;
        if (allowExchanges.includes(name)) {
          const totalBid = value.totalBid;
          const date = new Date(value.time);
          newCotizations.push({ name, totalBid, date });
        }
      }
      setCotization(newCotizations);
    }
  }, [coinPrice]);

  useEffect(() => {
    const fetchUser = (userId) =>
      fetch("https://jsonplaceholder.typicode.com/users/" + userId)
        .then((response) => response.json())
        .then((data) => {
          dispatch(login(data));
        });

    if (userId) {
      fetchUser(userId);
    }
  }, [userId, dispatch]);

  if (error) return <div>error...</div>;

  if (loading) return <div>loading...</div>;

  return (
    <>
      <Navbar />
      <div style={{ padding: "30px" }}>
        {!isAuth &&
          users.map((user) => (
            <div
              style={{ padding: "15px", cursor: "pointer" }}
              key={user.id}
              onClick={() => setUserId(user.id)}
            >
              {user.name}
            </div>
          ))}
        <div>
          {cotization.length > 1 && (
            <>
              <h2>{cotization[0].time}</h2>
              {cotization.map(({ name, totalBid }) => (
                <div key={name}>{`${name}: ${totalBid}`}</div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
