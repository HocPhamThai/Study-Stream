import React from 'react'

function UserPagination({ currentPage, totalPages, goToNextPage, goToPreviousPage, goToPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className=" inline-flex items-stretch -space-x-px justify-end">
      <li>
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
        >
          <span className="sr-only">Previous</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
      {pageNumbers.map(number => (
        <li key={number}>
          <button
            onClick={() => goToPage(number)}
            className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${currentPage === number
              ? 'text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 '
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
              }`}
          >
            {number}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
        >
          <span className="sr-only">Next</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ul>
  );
}

export default UserPagination
