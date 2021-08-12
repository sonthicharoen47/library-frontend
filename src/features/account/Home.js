import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.account);

  if (!user) {
    return (
      <section>
        <h2>User not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>{user.fname}</h2>
      <p>welcome to my web</p>
    </section>
  );
};

export default Home;
