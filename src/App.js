import './App.css';
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Loader from "./components/Loader";
import ImgCard from "./components/ImgCard";

function App() {
  const [data, setData] = useState();
  const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("Something Went Wrong! Try Again Later..")); // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Header />
      {!data ? <Loader /> : <ImgCard data={data} />}
    </div>
  );
}

export default App;
