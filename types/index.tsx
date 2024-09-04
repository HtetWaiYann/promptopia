export interface Post {
    prompt: string;
    tag: string;
    creator?: string;
    _id?: string;
}

export interface FormProps {
    type: string;
    submitting: boolean;
    post: Post;
    setPost: (post: Post) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface PromptCardListProps {
    data: Post[];
    handleTagClick: (tag: string) => void;
}