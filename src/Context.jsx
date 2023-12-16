import React, { useEffect, useState } from 'react';

const Context = React.createContext();

function ContextProvider({ children }) {
  const [data, setData] = useState([]);
 // const url= "https://martin-wrede.github.io/reactwebsite-ghpages/media/data2.json"

// const url = "./data2.json";

// New absolute path (works correctly)
    const url = "/targetx-website/data2.json";
 //  const url = "/data2.json";
 
  useEffect(() => {
  const getData = async() => {
    try{
      const response = await fetch(url);
      if(!response.ok){
        throw new Error(response.status)
      } 
      const data = await response.json()
  //   console.log(data)
      setData(data)
     } catch(error){
    console.error(error)
    }
  }
  
    getData();
  }, []);

  return (
    <Context.Provider value={{ data }}>
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
