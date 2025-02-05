import {useState, useEffect} from 'react'
import databaseServices from '../appwrite/configure_services'
import {Link, useNavigate} from 'react-router-dom'
import { Container, PostCard } from '../Components';
import { useSelector } from 'react-redux';
function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector(state => state.userData);
    useEffect(() => {
        databaseServices.listPost()
            .then((posts) => {
                if(posts) {
                    setPosts(posts.documents)
                }   else {
                    console.log("add post route")
                }
            })
    }, [userData])

    if(posts.length < 1) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl text-white font-bold hover:text-gray-500">
                                Login and create post
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    console.log("posts is ", posts)
    console.log(posts)
  return (
    <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap justify-evenly'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 md:w-1/5 bg-white mx-4 rounded-2xl m-5'>
                            <PostCard {...post} height={150} width={200} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
  )
}

export default Home