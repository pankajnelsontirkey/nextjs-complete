'use server';

import { uploadImage } from '@/lib/cloudinary';
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(prevState, formData) {
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

  let imageUrl = '';

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      'Image upload failed, post not created. Please try again later.'
    );
  }

  await storePost({ title, imageUrl, content, userId: 1 });

  revalidatePath('/', 'layout');
  redirect('/feed');
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/', 'layout');
}
