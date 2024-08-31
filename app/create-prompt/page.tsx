"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Form from "@components/Form";
import type { Post } from "@types";

const CreatePrompt = () => {
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState<Post>({
        prompt: "",
        tag: "",
    });

    const createPrompt = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitting(true);

      try {
        const response = await fetch("/api/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...post,
            userId: session?.user.id
          }),
        });
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt}>

    </Form>
  );
};

export default CreatePrompt;
