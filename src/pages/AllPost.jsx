import { useEffect, useState } from "react";
import databaseServices from "../appwrite/configure_services";
import { Container, PostCard } from "../Components";
import { useSelector } from "react-redux";
function AllPost() {
  const userData = useSelector(state => state.userData);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    databaseServices.ownPosts(userData.$id).then((posts) => {
      if (posts) {
        console.log(posts);
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <div>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
