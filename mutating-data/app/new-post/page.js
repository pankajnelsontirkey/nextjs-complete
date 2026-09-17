import { redirect } from 'next/navigation';

import PostForm from '@/components/post-form';
import { storePost } from '@/lib/posts';

export default function NewPostPage() {
  async function createPost(prevState, formData) {
    'use server';
    const { title, image, content } = Object.fromEntries(formData);

    let errors = [];

    if (!title || title.trim().length === 0) {
      errors.push('Title is required!');
    }
    if (!content || content.trim().length === 0) {
      errors.push('Content is required!');
    }
    if (!image || image.size === 0) {
      errors.push('Image is required!');
    }

    if (errors.length > 0) {
      return { errors };
    }

    await storePost({ title, imageUrl: '', content, userId: 1 });

    redirect('/feed');
  }

  return <PostForm action={createPost} />;
}
