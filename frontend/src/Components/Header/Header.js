import React, { useEffect, useState } from 'react';
import './Header.css';
import Topbar from '../Topbar/Topbar';
import Navbar from '../Navbar/Navbar';
import Landing from '../Landing/Landing';

export default function Header() {

  const [indexInfo , setIndexInfo] = useState({})

  useEffect(() => {
    fetch(`http://localhost:4000/v1/infos/index`)
    .then(res => res.json())
    .then(allInfos => {
      console.log(allInfos)
      setIndexInfo(allInfos)
    })
  },[])

  return (
    <header className="header">
      <Topbar indexInfo={indexInfo} />
      <Navbar />
      <Landing indexInfo={indexInfo}/>
    </header>
  );
}
