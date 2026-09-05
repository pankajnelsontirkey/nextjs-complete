import Link from 'next/link';

import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth
} from '@/app/lib/news';
import NewsList from '@/components/news-list';

export default async function FilteredNewsPage({ params }) {
  const { filter } = await params;

  const year = filter?.[0];
  const month = filter?.[1];

  let news;
  let links = getAvailableNewsYears();

  if (year && !month) {
    news = getNewsForYear(year);
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    news = getNewsForYearAndMonth(year, month);
    links = [];
  }

  let newsContent = <p>No news found for selected filter.</p>;

  if (news?.length) {
    newsContent = <NewsList news={news} />;
  }

  if (
    (year && !getAvailableNewsYears().includes(+year)) ||
    (month && !getAvailableNewsMonths(year).includes(+month))
  ) {
    throw new Error('Invalid filter!');
  }

  return (
    <>
      <header id='archive-header'>
        <nav>
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
        </nav>
      </header>
      {newsContent}
    </>
  );
}
