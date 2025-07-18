import { useCallback, useEffect, useState } from "react"

export const UseCallbackShowcase = () => {
  const [theme, setTheme] = useState('light')
  const [count, setCount] = useState(1);

  const getPosts = useCallback(async () => {
    console.log('running callback')
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${count}`);
    return await postResponse.json()
  }, [count])

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


const ListResults = ({ getPosts }) => {
  const [post, setPost] = useState(null)

  useEffect(() => {
    const loadPost = async () => {
      setPost(await getPosts())
    }

    loadPost()
  }, [getPosts])

  return (
    <div>
      { post && <>
      <h2> userID: {post.userId}</h2>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      </>
    }
    </div>
  )
}
