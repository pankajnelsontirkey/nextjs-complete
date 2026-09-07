import Link from 'next/link';
import { Suspense } from 'react';

import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth
} from '@/app/lib/news';
import NewsList from '@/components/news-list';

async function FiltersHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();
  const availableMonths = getAvailableNewsMonths(year);

  let links = availableYears;

  if (year && !month) {
    links = availableMonths;
  }

  if (year && month) {
    links = [];
  }

  if (
    (year && !availableYears.includes(year)) ||
    (month && !availableMonths.includes(month))
  ) {
    throw new Error('Invalid filter!');
  }

  return (
    <header id='archive-header'>
      <nav>
        {links?.length ? (
          <ul>
            {links.map((link) => {
              const href = year
                ? `/archive/${year}/${link}`
                : `/archive/${link}`;

              return (
                <Link key={link} href={href}>
                  {link}
                </Link>
              );
            })}
          </ul>
        ) : null}
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }) {
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent = <p>No news found for selected filter.</p>;

  if (news?.length) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
}

export default async function FilteredNewsPage({ params }) {
  const { filter } = await params;

  const year = filter?.[0];
  const month = filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading filters...</p>}>
        <FiltersHeader year={year} month={month} />
      </Suspense>
      <Suspense fallback={<p>Loading filtered news...</p>}>
        <FilteredNews year={year} month={month} />
      </Suspense>
    </>
  );
}
