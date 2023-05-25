
async function getbook(bookId) {
    const res = await fetch(`http://localhost:3000/api/books/${bookId}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return( res.json() );
  }


export default async function Hello(props) {
    // get id from url
    const bookId = props.params.id;
    //const bookId = props.pathname.split("/").pop();

    const bookData = await getbook(bookId);
    console.log(bookData);
    const [book] = await Promise.all([bookData]);
    // return a book card with book data with tailwind css
    return (
        <>
            
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full" src="https://source.unsplash.com/random" alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{book.bookName}</div>
                    <p className="text-gray-700 text-base"> 
                    {book.authorName} 
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{book.authorEmail}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{book.pages}</span>
                </div>
            </div>
            
        </>
    )
}

