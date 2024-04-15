export const SortIcon = () => {
  return (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const NextIcon = () => {
  return (
    <div className="icon">
      <p>Next</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
      >
        <path
          d="M8.107 -0.0078125L6.6934 1.40619L10.986 5.69919H-2V7.69919H10.896L6.7105 11.6758L8.0875 13.125L14.8316 6.71879L8.107 -0.0078125Z"
          fill="#505A5F"
        />
      </svg>
    </div>
  );
};

export const PreviewIcon = () => {
  return (
    <div className="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
      >
        <path
          d="M6.893 13.125L8.3066 11.711L4.014 7.418L17 7.418V5.418L4.104 5.418L8.2895 1.4414L6.9125 -0.0078001L0.1684 6.3984L6.893 13.125Z"
          fill="#505A5F"
        />
      </svg>
      <p>Preview</p>
    </div>
  );
};
