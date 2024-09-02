import searchIcon from '@public/icons/search.png'
import Image from 'next/image'

const SearchBar = ({ searchInput, onChange, onKeyDown, inputRef, onClick }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Type the location"
          value={searchInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={inputRef}
        ></input>
        <Image src={searchIcon} alt="search icon" className="search-icon" />
      </div>
      <button className="search-button" onClick={onClick}>
        Search
      </button>
    </div>
  )
}
export default SearchBar
