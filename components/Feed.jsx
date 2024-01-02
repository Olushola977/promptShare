'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) => {

  }

  const PromptCardList = ({data, handleTagCLick}) => {
    return (
      <div className='mt-16 prompt_layout'>
          {data && data.map((post) => (
            <PromptCard
              key={post?._id}
              post={post}
              handleTagCLick={handleTagCLick}
            />
          ))}
      </div>
    )
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a user or tag'
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={posts} handleTagCLick={() => {}} />
    </section>
  )
}

export default Feed