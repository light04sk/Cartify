const Pagination = ({ page, lastPage, pageHandler }) => {
  const getPages = (curr, total) => {
    const pages = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i); // ✅ was pushing 1 instead of i
      }
    } else {
      if (curr <= 3) {
        pages.push(1, 2, 3, "...", total);
      } else if (curr >= total - 2) {
        pages.push(1, "...", total - 2, total - 1, total);
      } else {
        pages.push(1, "...", curr - 1, curr, curr + 1, "...", total);
      }
    }
    return pages;
  };

  return (
    <div className="mt-10 space-x-4">
      <button
        disabled={page === 1}
        onClick={() => pageHandler(page - 1)}
        className={`${page === 1 ? "bg-blue-300" : "bg-blue-500"} text-white px-3 py-1 rounded-md cursor-pointer`}
      >
        Prev
      </button>
      {getPages(page, lastPage).map((item, idx) => (
        <span
          key={idx}
          className={`cursor-pointer ${item === page ? "font-bold text-blue-600" : "text-black"}`}
          onClick={() => typeof item === "number" && pageHandler(item)}
        >
          {item}
        </span>
      ))}
      <button
        disabled={page === lastPage}
        onClick={() => pageHandler(page + 1)}
        className={`${page === lastPage ? "bg-blue-300" : "bg-blue-500"} text-white px-3 py-1 rounded-md cursor-pointer`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
