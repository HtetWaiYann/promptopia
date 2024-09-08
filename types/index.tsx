export interface Post {
    prompt: string;
    tag: string;
    creator?: Creator;
    _id?: string;
}

export interface Creator {
    image: string;
    username: string;
    email: string;
    _id: string;
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

export interface PromptCardProps {
    post: Post;
    handleTagClick: (tag: string) => void;
    handleEdit: (post: Post) => void;
    handleDelete: (post: Post) => void;
}

export interface ProfileProps {
    name: string;
    desc: string;
    data: Post[];
    handleEdit: (post: Post) => void;
    handleDelete: (post: Post) => void;
}