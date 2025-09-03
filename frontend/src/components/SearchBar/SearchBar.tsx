import { useSelector, useDispatch } from 'react-redux';

import commonStyles from "../../styles/common.module.css";
import { setSearch, setAuthor } from "../../redux/postsSlice";
import type { AppDispatch, RootState } from "../../redux/store";

export const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { search, author } = useSelector((state: RootState) => state.posts);
  
  return (
    <div style={{ width: 'auto', display: 'flex', gap: '10px', marginBottom: '2rem' }} >
      <input
          name='search'
          id='search'
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search..."
          className={commonStyles.input}
        />
      <input
          name='author'
          id='author'
          value={author}
          onChange={(e) => dispatch(setAuthor(e.target.value))}
          placeholder="Filter by author"
          className={commonStyles.input}
        />
      </div>
  )
}