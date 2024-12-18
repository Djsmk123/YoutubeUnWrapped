import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-100 to-transparent p-4 flex items-center justify-center">
      <div className="flex items-end justify-center gap-2 text-gray-600">
        <span>Made with</span>
        <Heart className="h-4 w-4 text-red-500 fill-current" />
        <span>by</span>
        <a
          href="https://stackblitz.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          SmkWinner
        </a>
        <a
          href="https://github.com/Djsmk123/YoutubeUnWrapped"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </footer>
  );
}