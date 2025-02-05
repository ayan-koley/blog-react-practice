import React from "react";
import databaseService from "../appwrite/configure_services";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, height, width }) {
  return (
    <Link to={`/post/${$id}`}>
      <div>
        <div className="h-1/2">
          <img
            src={databaseService.filePreview({fileId: featuredImage, height, width})}
            className="rounded-2xl"
          />
        </div>
        <div className="flex justify-center pt-2">
        <h2>{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
