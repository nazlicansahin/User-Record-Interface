import Link from 'next/link';

export default function Home() {
  // list tables with tailwind css
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Welcome to your home page!
          </h1>
          <p className="mt-3 text-2xl">
            The best place to save your favorite things and manage your tasks.
          </p>
          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <Link href="/users">
              <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Users &rarr;</h3>
                <p className="mt-4 text-xl">
                  The user list page.
                </p>
              </div>
            </Link>
            <Link href="/books">
              <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Books &rarr;</h3>
                <p className="mt-4 text-xl">
                  Your favorite books.
                </p>
              </div>
            </Link>
            <Link href="/countries">
              <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Countries &rarr;</h3>
                <p className="mt-4 text-xl">
                  Countries that you want to visit.
                </p>
              </div>
            </Link>
            <Link href="/tasks">
              <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Tasks &rarr;</h3>
                <p className="mt-4 text-xl">
                  The task list for improve your skills.
                </p>
              </div>
            </Link>
            <Link href="/musics">
              <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Musics &rarr;</h3>
                <p className="mt-4 text-xl">
                  Your favorite musics.
                </p>
              </div>
            </Link>
          </div>
        </main>
      </div>

    </>
  )
}
