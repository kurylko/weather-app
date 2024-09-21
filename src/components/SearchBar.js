import searchIcon from '@public/icons/search.png'
import Image from 'next/image'

const SearchBar = ({
  searchInput,
  onChange,
  onKeyDown,
  inputRef,
  onClick,
  predictions,
  onPredictionClick,
}) => {
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
      {predictions?.length > 0 && (
        <ul className="autocomplete-dropdown">
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              className="autocomplete-item"
              onClick={() => onPredictionClick(prediction)}
            >
              {prediction.description}
            </li>
          ))}
        </ul>
      )}
      <button className="search-button" onClick={onClick}>
        Search
      </button>
    </div>
  )
}
export default SearchBar
