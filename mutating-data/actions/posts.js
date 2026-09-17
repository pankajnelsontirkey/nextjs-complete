'use server';

import { uploadImage } from '@/lib/cloudinary';
import { redirect } from 'next/navigation';

import { storePost } from '@/lib/posts';

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

  redirect('/feed');
}
