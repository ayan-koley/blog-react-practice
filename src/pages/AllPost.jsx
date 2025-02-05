import { useEffect, useState } from "react";
import databaseServices from "../appwrite/configure_services";
import { Container, PostCard } from "../Components";
import { useSelector } from "react-redux";
function AllPost() {
  const userData = useSelector(state => state.userData.userData);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    databaseServices.ownPosts(userData.$id).then((posts) => {
      if (posts) {
        console.log("post is ", posts);
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <div>
      <Container>
        <div className="flex flex-wrap justify-evenly">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 md:w-1/5 bg-white mx-4 rounded-2xl m-5">
              <PostCard {...post} height={150} width={200} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
