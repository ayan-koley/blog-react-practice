import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import databaseServices from "../../appwrite/configure_services";
import { Input, Button, Select, RTE } from "../index";
import { useNavigate } from "react-router-dom";
import databaseServicess from "../../appwrite/configure_services";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const submit = async (data) => {
    console.log(data);
    if (post) {
      const file = await databaseServices.uploadFile(data.image[0]);
      if (file) {
        await databaseServices.deleteFile(post.featuredImage);
      }
      const updatePost = await databaseServices.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (updatePost) {
        navigate(`/post/${post.$id}`);
      }
    } else {
      const file = await databaseServices.uploadFile(data.image[0]);
      if (file) {

        data.featuredImage = file.$id;
        data.userId = userData.$id;
        console.log(data);
        const newPost = await databaseServices.createPost({
          ...data
        });
        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s/g, "-")
    }
    return "";
  }, []);

  // process of transform title into slug
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
      return () => {
        return subscription.unsubscribe();
      };
    });
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 text-white px-2 p-2"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 text-white px-2 p-2"
                    value={post && post.$id}
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 text-white"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseServicess.filePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 text-white"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
    </form>
  )
}

export default PostForm;
