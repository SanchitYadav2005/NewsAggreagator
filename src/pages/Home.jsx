import React from 'react'
import Navbar from '../components/Navbar'
import NewsFeed from '../components/NewsFeed';
import Footer from '../components/Footer';
import { useState } from 'react';

function Home() {
    const [category, setCategory] = useState("general"); // Default category
    
  return (
    <div>
        <Navbar setCategory={setCategory} />
      <NewsFeed category={category} />
      <Footer/>
    </div>
  )
}

export default Home