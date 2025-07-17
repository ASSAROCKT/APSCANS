import React, { useState, useEffect, useCallback } from 'react';

// Header Component
function Header({ goToHome }) {
  return (
    <header className="bg-black text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Website Name/Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <button onClick={goToHome} className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition duration-300 ease-in-out">
            Aphrodite Scans
          </button>
        </div>

        {/* Navigation and Socials */}
        <nav className="flex flex-wrap justify-center md:justify-end items-center space-x-6">
          {/* About Page Link */}
          <a href="#about" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
            About
          </a>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {/* Discord */}
            <a href="https://discord.gg/x22HkcVKHT" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              <i className="fab fa-discord text-2xl"></i>
            </a>
            {/* Ko-fi */}
            <a href="https://ko-fi.com/aphroditescans" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              <i className="fas fa-mug-hot text-2xl"></i>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Main App component
function App() {
  const [allMangaData, setAllMangaData] = useState([]); // Now an array for all series
  const [selectedManga, setSelectedManga] = useState(null); // To store the currently selected manga object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'series', 'reader'
  const [selectedChapterKey, setSelectedChapterKey] = useState(null);

  // Function to fetch all manga data
  const fetchAllMangaData = async () => {
    try {
      setLoading(true);
      const urls = [
        'https://raw.githubusercontent.com/ASSAROCKT/aphroditescans/refs/heads/main/Tsumi%20to%20Batsu%20no%20Spica.json',
        'https://raw.githubusercontent.com/ASSAROCKT/aphroditescans/refs/heads/main/Olympia%20of%20Infidelity.json'
      ];

      const fetchPromises = urls.map(url =>
        fetch(url).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} from ${url}`);
          }
          return response.json();
        })
      );

      const data = await Promise.all(fetchPromises);
      setAllMangaData(data);
    } catch (e) {
      console.error("Error fetching manga data:", e);
      setError("Failed to load manga data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllMangaData();
  }, []);

  // Function to navigate to the series page for a specific manga
  const goToSeries = useCallback((manga) => {
    setSelectedManga(manga);
    setCurrentPage('series');
  }, []);

  // Function to navigate to the reader page for a specific chapter of the selected manga
  // This function is passed down to ReaderPage to allow internal chapter navigation
  const goToReader = useCallback((chapterKey) => {
    setSelectedChapterKey(chapterKey);
    setCurrentPage('reader');
  }, []);

  // Function to navigate back to the home page
  const goToHome = useCallback(() => {
    setCurrentPage('home');
    setSelectedManga(null); // Clear selected manga when going home
    setSelectedChapterKey(null);
  }, []);

  // Render loading, error, or content based on state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-xl font-semibold">Loading manga data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-500">
        <div className="text-xl font-semibold">{error}</div>
      </div>
    );
  }

  if (allMangaData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-400">
        <div className="text-xl font-semibold">No manga data available.</div>
      </div>
    );
  }

  // Render different pages based on currentPage state
  let content;
  switch (currentPage) {
    case 'home':
      content = <HomePage allMangaData={allMangaData} goToSeries={goToSeries} />;
      break;
    case 'series':
      content = selectedManga ? (
        <SeriesPage mangaData={selectedManga} goToReader={goToReader} goToHome={goToHome} />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-500">
          <div className="text-xl font-semibold">No series selected.</div>
          <button
            onClick={goToHome}
            className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
          >
            Back to Home
          </button>
        </div>
      );
      break;
    case 'reader':
      content = selectedManga && selectedChapterKey ? (
        <ReaderPage
          mangaData={selectedManga}
          selectedChapterKey={selectedChapterKey}
          goToSeries={() => goToSeries(selectedManga)}
          goToReader={goToReader} // Pass goToReader to ReaderPage
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-500">
          <div className="text-xl font-semibold">No chapter selected or series data missing.</div>
          <button
            onClick={() => goToSeries(selectedManga)}
            className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
          >
            Back to Series
          </button>
        </div>
      );
      break;
    default:
      content = <HomePage allMangaData={allMangaData} goToSeries={goToSeries} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 font-inter text-white">
      <Header goToHome={goToHome} />
      {content}
    </div>
  );
}

// HomePage Component
function HomePage({ allMangaData, goToSeries }) {
  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-64px)]">
      <h1 className="text-4xl font-bold text-indigo-400 mb-8 text-center">All Series</h1>
      <div className="flex flex-col space-y-8">
        {allMangaData.map((manga, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center max-w-4xl mx-auto w-full border border-gray-700"
          >
            <img
              src={manga.cover}
              alt={`${manga.title} Cover`}
              className="w-36 h-auto rounded-lg shadow-md mb-4 md:mb-0 md:mr-8 object-cover flex-shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/144x216/333333/FFFFFF?text=No+Cover";
              }}
            />
            <div className="text-center md:text-left flex-grow">
              <h3 className="text-2xl font-bold text-white mb-2">{manga.title}</h3>
              <p className="text-gray-300 text-sm mb-2">
                <span className="font-semibold">Author:</span> {manga.author} | <span className="font-semibold">Artist:</span> {manga.artist}
              </p>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{manga.description}</p>
              <button
                onClick={() => goToSeries(manga)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Go To Series Page
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// SeriesPage Component
function SeriesPage({ mangaData, goToReader, goToHome }) {
  const sortedChapterKeys = Object.keys(mangaData.chapters).sort((a, b) => {
    return parseFloat(b) - parseFloat(a);
  });

  const firstChapterKey = Object.keys(mangaData.chapters).sort((a, b) => parseFloat(a) - parseFloat(b))[0];

  return (
    <div className="container mx-auto p-4">
      {/* Manga Details Section */}
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-start max-w-5xl mx-auto mb-8 border border-gray-700">
        <img
          src={mangaData.cover}
          alt={`${mangaData.title} Cover`}
          className="w-48 h-auto rounded-lg shadow-md mb-6 md:mb-0 md:mr-8 object-cover flex-shrink-0"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/192x288/333333/FFFFFF?text=No+Cover";
          }}
        />
        <div className="flex-grow">
          <h1 className="text-4xl font-bold text-indigo-400 mb-2">{mangaData.title}</h1>
          <p className="text-gray-300 text-lg mb-4">
            <span className="font-semibold">Artist:</span> {mangaData.artist} | <span className="font-semibold">Author:</span> {mangaData.author}
          </p>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => goToReader(firstChapterKey)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
            >
              <i className="fas fa-play mr-2"></i> Start Reading
            </button>
          </div>
          <p className="text-gray-300 text-base">{mangaData.description}</p>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 max-w-5xl mx-auto border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goToHome}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
          >
            &larr; Back to Home
          </button>
          <h2 className="text-3xl font-bold text-indigo-400 text-center flex-grow">Chapters</h2>
          <div className="w-24"></div> {/* Spacer to balance the back button */}
        </div>

        {/* Chapter List Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider rounded-tl-lg">
                  Chapter
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Group
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider rounded-tr-lg">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {sortedChapterKeys.map((chapterKey) => {
                const chapter = mangaData.chapters[chapterKey];
                const lastUpdatedDate = new Date(parseInt(chapter.last_updated) * 1000).toLocaleDateString();
                const groupName = Object.keys(chapter.groups)[0] || 'N/A';

                return (
                  <tr
                    key={chapterKey}
                    onClick={() => goToReader(chapterKey)}
                    className="hover:bg-gray-800 cursor-pointer transition duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {chapterKey}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {chapter.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {groupName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {lastUpdatedDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ReaderPage Component
function ReaderPage({ mangaData, selectedChapterKey, goToSeries, goToReader }) {
  const chapters = mangaData.chapters;
  const chapterKeys = Object.keys(chapters).sort((a, b) => parseFloat(a) - parseFloat(b));
  const currentChapterIndex = chapterKeys.indexOf(selectedChapterKey);

  // Define callbacks unconditionally
  const goToPreviousChapter = useCallback(() => {
    if (currentChapterIndex > 0) {
      const prevChapterKey = chapterKeys[currentChapterIndex - 1];
      goToReader(prevChapterKey);
    }
  }, [currentChapterIndex, chapterKeys, goToReader]);

  const goToNextChapter = useCallback(() => {
    if (currentChapterIndex < chapterKeys.length - 1) {
      const nextChapterKey = chapterKeys[currentChapterIndex + 1];
      goToReader(nextChapterKey);
    }
  }, [currentChapterIndex, chapterKeys, goToReader]);

  // Define useEffect unconditionally
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        goToPreviousChapter();
      } else if (event.key === 'ArrowRight') {
        goToNextChapter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToPreviousChapter, goToNextChapter]);

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedChapterKey]);

  // Conditional return *after* hooks are defined
  if (!mangaData || !selectedChapterKey || !chapters[selectedChapterKey]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-500">
        <div className="text-xl font-semibold">Chapter not found or data missing.</div>
        <button
          onClick={goToSeries}
          className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
        >
          Back to Chapters
        </button>
      </div>
    );
  }

  const currentChapter = chapters[selectedChapterKey];
  // Get image URLs from the first group found for the chapter
  const imageUrls = currentChapter.groups[Object.keys(currentChapter.groups)[0]] || [];


  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <button
          onClick={goToSeries}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out mb-4 md:mb-0"
        >
          &larr; Back to Chapters
        </button>
        <h2 className="text-3xl font-bold text-indigo-400 text-center flex-grow">
          Chapter {selectedChapterKey}: {currentChapter.title}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={goToPreviousChapter}
            disabled={currentChapterIndex === 0}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out ${
              currentChapterIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'
            }`}
          >
            Previous
          </button>
          <button
            onClick={goToNextChapter}
            disabled={currentChapterIndex === chapterKeys.length - 1}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out ${
              currentChapterIndex === chapterKeys.length - 1 ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-700">
        {imageUrls.length > 0 ? (
          imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Page ${index + 1}`}
              className="w-full h-auto max-w-full rounded-md mb-2 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/600x800/555555/FFFFFF?text=Image+Load+Error`;
              }}
            />
          ))
        ) : (
          <p className="text-gray-400 text-lg">No images found for this chapter.</p>
        )}
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={goToPreviousChapter}
          disabled={currentChapterIndex === 0}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out ${
            currentChapterIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'
          }`}
        >
          Previous
        </button>
        <button
          onClick={goToNextChapter}
          disabled={currentChapterIndex === chapterKeys.length - 1}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out ${
            currentChapterIndex === chapterKeys.length - 1 ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
