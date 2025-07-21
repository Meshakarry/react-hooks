import { useCallback, useEffect, useState } from "react"

const ListResults = ({ getPosts }) => {
  const [post, setPost] = useState(null)

  useEffect(() => {
    let ignore = false;

    const loadPost = async () => {
      if (!ignore) {
        const posts = await getPosts();
        console.log(posts, 'posts')
        setPost(posts)
      }
    }

    loadPost()

    return () => {
      ignore = true;
    }
  }, [getPosts])

  return (
    <div>
    {post && !Array.isArray(post) && (
      <>
        <h2>userID: {post.userId}</h2>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </>
    )}
    {Array.isArray(post) && <p>Unexpected response: Multiple posts returned.</p>}
    {!post && <p>Enter a valid post number (1–100).</p>}
  </div>
  )
}

export const UseCallbackShowcase = () => {
  const [theme, setTheme] = useState('light')
  const [count, setCount] = useState(1);

  const getPosts = useCallback(async () => {
    console.log('running callback', count);
    
    const postId = parseInt(count);
    if (!postId || postId < 1 || postId > 100) return null;
  
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return await response.json();
  }, [count]);
  

  // const getPosts = async () => {
  //   console.log('running callback')
  //   const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${count}`);
  //   return await postResponse.json()
  // }

  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.background = '#222'
    } else {
      document.body.style.background = '#fff'

    }
  }, [theme])

  return (
  <div className="container">
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Change Theme</button>
    <input type="number" onChange={(e) => setCount(e.target.value)}></input>
    <ListResults getPosts={getPosts} />
  </div>
  )
}
