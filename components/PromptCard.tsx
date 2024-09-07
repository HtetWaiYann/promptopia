"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Post, PromptCardProps } from "@types";
import { usePathname, useRouter } from "next/navigation";

import defaultUserImage from "@public/assets/images/default_user.svg";
import tickIcon from "@public/assets/icons/tick.svg";
import copyIcon from "@public/assets/icons/copy.svg";

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) => {

  const [copiedPrompt, setCopiedPrompt] = useState<string>("");

  const handleCopy = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);

    setTimeout(() => setCopiedPrompt(""), 2000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div>
          <Image
            src={post.creator?.image ?? defaultUserImage}
            width={40}
            height={40}
            className="rounded-full object-contain"
            alt={post.creator?.username ?? "User Profile Image"}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {post.creator?.username}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {post.creator?.email}
          </p>
        </div>
        <div className="copy_btn" onClick={() => handleCopy(post.prompt)}>
            {copiedPrompt === post.prompt ? (
              <Image src={tickIcon} width={20} height={20} alt="Copied" />
            ) : (
              <Image src={copyIcon} width={20} height={20} alt="Copy" />
            )}
          </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>
    </div>
  );
};

export default PromptCard;
