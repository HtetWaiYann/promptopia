"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Profile from "@components/Profile";
import { Post } from "@types";

const ProfilePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user?.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  
  const handleDelete = (post: Post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      try {
        fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        }).then(() => {
          setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
