 function SortSelect({ sortType, setSortType }) {
  return (
    <label className="sort-label">
      Sort:
      <select
        onChange={(e) => setSortType(e.target.value)}
        value={sortType}
      >
        <option value="default">No sorting</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="airline">Airlines (A-Z)</option>
      </select>
    </label>
  );
}

export default SortSelect