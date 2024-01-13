'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [msg, setMsg] = useState(null)
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    localStorage.setItem('searchText', JSON.stringify({ query: e.target.value }))
  };

  useEffect(() => {
    let url;

    const fetchPosts = async (url) => {
      const response = await fetch(url)

      if (response.status === 200) {
        const data = await response.json();
        setPosts(data);
      } else {
        setPosts([])
        const message = await response.json()
        setMsg(message)
      }

    };

    const savedSearchText = JSON.parse(localStorage.getItem('searchText'))

    if (savedSearchText?.query) {
      setSearchText(savedSearchText?.query)
      url = `/api/prompt/search/${savedSearchText.query}`
      fetchPosts(url)
    } else {
      fetchPosts('/api/prompt')
    }

  }, [searchText]);

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className='mt-16 prompt_layout'>
        {data.length === 0 && (
          <h2 className='text-gray-500 text-2xl'> {msg?.msg} </h2>
        )}
        {data && data.map((post) => (
          <PromptCard
            key={post?._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a user or tag'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => { }} />
    </section>
  );
};

export default Feed;