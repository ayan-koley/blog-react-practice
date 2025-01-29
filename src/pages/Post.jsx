import { useState, useEffect } from "react";
import { Button, Container } from "../Components";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseServices from "../appwrite/configure_services";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const { slug } = useParams();

  useEffect(() => {
    databaseServices.getPost(slug).then((post) => {
      if (post) {
        setPost(post);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);

  const deletePost = () => {
    const status = databaseServices.deletePost(post.$id);
    if (status) {
      databaseServices.deleteFile(post.featuredImage);
      navigate("/");
    }
  };

  const isAuthor = post && userData ? userData.$id == post.userId : false;
  console.log("isAuthor section", isAuthor)

  return post ? (
    <div className="py-8">
      <Container>
        <div className=" flex justify-center mb-4 relative border rounded-xl p-2 h-1/3">
          <img
            src={databaseServices.filePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
         
        </div>
        <div className="flex  items-center">
          <div className="w-1/2" >
            
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-white">{post.title}</h1>
        </div>
        <div className="browser-css text-white">{parse(post.content)}</div>
          </div>
          <div className="w-1/2">
            {isAuthor ? (
              <div className="flex flex-col w-1/4">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-green-500 p-3">Edit</Button> 
                </Link>
                <Button className="bg-red-500" onClick={deletePost}>Delete</Button>
                </div>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
