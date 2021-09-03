export function MenuFooter() {
  return (
    <div className="flex-shrink-0 px-2 py-4 space-y-2">
      <button
        type="button"
        className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-900 rounded-md bg-purple-300 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-purple-300"
      >
        <span aria-hidden="true">
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </span>
        <span>Preferências</span>
      </button>
    </div>
  );
}

export default MenuFooter;
