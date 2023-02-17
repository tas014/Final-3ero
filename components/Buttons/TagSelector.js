export default function TagSelector({onSort}) {
    return (
      <select onChange={e => onSort(e)}>
        <option value="All">Showing All</option>
        <option value="Alphabetical">Alphabetical</option>
        <option value="Liked">Liked</option>
      </select>
    )
  }