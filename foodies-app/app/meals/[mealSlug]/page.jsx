export default async function MealPage({ params }) {
  const { mealSlug } = await params;
  return (
    <>
      <h1>Meal Page</h1>
      <p>Meal: {mealSlug}</p>
    </>
  );
}
