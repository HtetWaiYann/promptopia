"use client";

import { useState, useEffect } from "react";

import Profile from "@components/Profile";
import { Creator, Post } from "@types";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<Creator | null>(null);
  const userId = params.id;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    const fetchUserInfo = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    };

    if (userId) {
      fetchUserInfo();
      fetchPosts();
    }
  }, []);

  return (
    <Profile
      name={`${user?.username || ""}'s`}
      desc={`"Welcome to ${user?.username} personalized profile page"`}
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

export default ProfilePage;
