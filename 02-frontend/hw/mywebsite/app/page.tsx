export default function Home() {
  return (
    <main className="min-h-screen bg-pink-50 px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">

        <h1 className="text-5xl font-bold text-pink-700 mb-8">
          Risha Bansal
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Hi! I'm a second year student majoring in Data Science
          and Economics! I love to travel, try new matcha/cafe
          shops, and read. I wanted to join SWEF so I could
          improve my coding skills.
        </p>

        <ul className="flex justify-center gap-4">
          <li>
            <a
              href="https://github.com/RishaBansal02"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
            >
              GitHub
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com/in/risha-bansal-20a68a23b/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
            >
              LinkedIn
            </a>
          </li>
        </ul>

      </div>
    </main>
  );
}
