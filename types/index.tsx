export interface Post {
    prompt: string;
    tag: string;
}

export interface FormProps {
    type: string;
    submitting: boolean;
    post: Post;
    setPost: (post: Post) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}