export const CommentFilter = ({}) => {
  return (
    <div>
      <label htmlFor="sortOrder">Sort by</label>
      <select id="sortOrder">
        <option value="asc">Most recent to oldest</option>
        <option value="desc">Oldest to most recent</option>
      </select>
      <button>Apply sorting</button>
    </div>
  );
};
