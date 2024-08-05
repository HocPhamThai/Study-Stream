import React from 'react';
import { Transition } from '@headlessui/react';
import { Dialog } from '@headlessui/react';

const TaskDetailModal = ({ isOpen, onClose, task }) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-300"
      enterFrom="transform translate-x-full"
      enterTo="transform translate-x-0"
      leave="transition ease-in duration-300"
      leaveFrom="transform translate-x-0"
      leaveTo="transform translate-x-full"
    >
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-y-0 right-0 w-full sm:w-1/3 bg-black/80 text-white shadow-lg p-4 overflow-y-auto"
      >
        <div className="relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-300"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
          <p className="text-gray-300">Due: {formatTime(task.endDate)}</p>
          <p className="text-gray-300">Start: {formatDateTime(task.startDate)}</p>
          <p className="text-gray-300">End: {formatDateTime(task.endDate)}</p>
          <p className="text-gray-300 whitespace-pre-wrap">{task.description}</p>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskDetailModal;
