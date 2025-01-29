import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import databaseServices from '../appwrite/configure_services'
import { Container, PostForm } from '../Components';



function EditPost() {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const {slug} = useParams();

    useEffect(() => {
        databaseServices.getPost(slug)
            .then((post) => {
                if(post) {
                    setPost(post)
                }   else {
                    console.log("You send wrong Post id in slug")
                    navigate("/")
                }
            })
        
    }, [slug, navigate])
    console.log(post);
  return (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
        </div>
  )
}

export default EditPost