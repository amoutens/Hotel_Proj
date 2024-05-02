import React, { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/');
      const data = await res.json();
    console.log(data);
    }
    fetchData();
  }, [])

  return (
    <>
    <p>aaa</p>
    </>
  )
}

export default App
