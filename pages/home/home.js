

import Layout from '../../components/MyLayout.js'
import Link from 'next/link'

import "../style.scss"

function getPosts () {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js'},
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
  ]
}

const PostLink = ({ post }) => (
  <li>
    <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
      <a>{post.title}</a>
    </Link>

  </li>
)

export default () => (
  <Layout>
    <h1 className="example">bingyan-task</h1>
    <ul>
      {getPosts().map((post) => (
        <PostLink key={post.id} post={post}/>
      ))}
    </ul>

  </Layout>
)