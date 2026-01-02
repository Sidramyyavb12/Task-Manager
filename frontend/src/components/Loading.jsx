const Loading = ({ fullScreen = false, size = 'default' }) => {
  const sizes = {
    small: 'w-6 h-6 border-2',
    default: 'w-12 h-12 border-3',
    large: 'w-16 h-16 border-4',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 z-50">
        <div className="text-center">
          <div
            className={`spinner mx-auto ${sizes[size]} border-primary-600`}
          ></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className={`spinner ${sizes[size]} border-primary-600`}></div>
    </div>
  );
};

export default Loading;