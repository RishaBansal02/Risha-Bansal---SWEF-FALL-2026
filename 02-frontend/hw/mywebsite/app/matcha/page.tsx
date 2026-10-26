export default function MatchaPage() {
  return (
    <main className="min-h-screen bg-pink-50 px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-pink-700 mb-8">
          My Love for Matcha
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          I love exploring different matcha cafes and
          trying new drinks. It's a fun activity to do with friends while walking around Boston!
        </p>

        <h2 className="text-2xl font-bold text-pink-700 mb-4">
          My Favorite Matcha Drinks
        </h2>

        <ul className="text-gray-700">
          <li>Strawberry Matcha</li>
          <li>Iced Matcha Latte</li>
          <li>Vanilla Matcha</li>
        </ul>
      </div>
    </main>
  );
}