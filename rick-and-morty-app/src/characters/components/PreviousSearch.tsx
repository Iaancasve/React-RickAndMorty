interface Props {
  searches: string[];
  onLabelClicked: (term: string) => void;
}

export const PreviousSearches = ({ searches, onLabelClicked }: Props) => {
  return (
    <div className="previous-searches">
      {searches.map((term) => (
        <button 
          key={term} 
          onClick={() => onLabelClicked(term)}
          className="search-tag"
        >
          {term}
        </button>
      ))}
    </div>
  );
};