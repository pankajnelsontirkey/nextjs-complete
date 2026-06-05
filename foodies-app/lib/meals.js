import fs from 'node:fs';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // throw new Error('Failed to load meals.');

  return db.prepare('SELECT * FROM meals').all();
}

export /* async */ function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}_${Date.now()}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: `${process.env.S3_APP_PREFIX}/${fileName}`,
      Body: Buffer.from(bufferedImage),
      ContentType: meal.image.type
    })
  );

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES(
      @title,
      @summary,
      @instructions,
      @creator, 
      @creator_email,
      @image,
      @slug
      )
    `
  ).run(meal);
}
