"use client";

import { Suspense, useEffect, useState } from "react";

import Form from "@components/Form";
import type { Post } from "@types";
import { useRouter, useSearchParams } from "next/navigation";


const UpdatePrompt = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    promptId && fetchPost();
  }, [promptId]);

  const updatePrompt = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!post.prompt || !post.tag || !promptId) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...post,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPost({ prompt: "", tag: "" });
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    ></Form>
  );
};

export default function UpdatePromptWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePrompt />
    </Suspense>
  );
}
