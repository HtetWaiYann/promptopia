"use client";
import { useState, useEffect, SetStateAction } from "react";
import PromptCard from "./PromptCard";
import { Post, PromptCardListProps } from "@types";

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard
          key={index}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  const filteredPosts = posts.filter((post) => {
    const formattedSearchText = searchText.toLowerCase();
    return (
      post.prompt.toLowerCase().includes(formattedSearchText) ||
      post.tag.toLowerCase().includes(formattedSearchText) ||
      post.creator?.username.toLowerCase().includes(formattedSearchText)
    );
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="search_input peer"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={setSearchText} />
    </section>
  );
};

export default Feed;
