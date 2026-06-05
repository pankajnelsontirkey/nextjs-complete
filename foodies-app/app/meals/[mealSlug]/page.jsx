import Image from 'next/image';

import { IMAGES_ROOT } from '@/constants';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';
import classes from './page.module.css';

export default async function MealPage({ params }) {
  const { mealSlug } = await params;
  const meal = await getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br/ >');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={`${IMAGES_ROOT}/${meal.image}`} fill alt={meal.image} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions
          }}
        ></p>
      </main>
    </>
  );
}
