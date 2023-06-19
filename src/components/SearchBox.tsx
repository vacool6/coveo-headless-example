import {
  SearchBox as SearchBoxController,
  InstantResults as InstantResultsController,
} from "@coveo/headless";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface SearchBoxProps {
  controllerSearchbox: SearchBoxController;
  controllerInstantResults: InstantResultsController;
}

export const SearchBox: React.FC<SearchBoxProps> = (props) => {
  const { controllerSearchbox, controllerInstantResults } = props;
  //
  const [search, setSearch] = useState("");
  const redirect = useNavigate();
  const params = useParams();
  //
  const [searchboxState, setStateSearchbox] = useState(
    controllerSearchbox.state
  );
  const [instantResultsState, setStateInstantResults] = useState(
    controllerInstantResults.state
  );

  const handleChange = (event: any) => {
    controllerSearchbox.updateText(event.target.value);
    setSearch(`/${event.target.value}`);
  };

  const handleSearch = () => {
    controllerSearchbox.submit();
    redirect(`${search}`);
  };

  const handleClear = () => {
    controllerSearchbox.clear();
    controllerSearchbox.submit();
    redirect(`/`);
  };

  useEffect(
    () =>
      controllerSearchbox.subscribe(() =>
        setStateSearchbox(controllerSearchbox.state)
      ),
    [controllerSearchbox]
  );
  useEffect(
    () =>
      controllerInstantResults.subscribe(() =>
        setStateInstantResults(controllerInstantResults.state)
      ),
    [controllerInstantResults]
  );

  useEffect(() => {
    if (params.query) {
      controllerSearchbox.updateText(params.query);
      controllerSearchbox.submit();
    }
  }, [controllerSearchbox, params.query]);

  return (
    <>
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>

      <div className="search-box">
        <input
          value={searchboxState.value}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              controllerSearchbox.submit();
            } else if (e.key === "Escape") {
              controllerSearchbox.clear();
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
        <div className="search-results">
          {searchboxState.suggestions.length > 0 && (
            <div className="search-queries">
              {searchboxState.suggestions.map((suggestion) => {
                return (
                  <p
                    key={suggestion.rawValue}
                    onMouseEnter={() =>
                      controllerInstantResults.updateQuery(suggestion.rawValue)
                    }
                    onClick={() =>
                      controllerSearchbox.selectSuggestion(suggestion.rawValue)
                    }
                    dangerouslySetInnerHTML={{
                      __html: suggestion.highlightedValue,
                    }}
                  ></p>
                );
              })}
            </div>
          )}
          {instantResultsState.results.length > 0 && (
            <div className="search-instant-results">
              {instantResultsState.results.map((result) => {
                return (
                  <>
                    <h3>{result.title}</h3>
                    <p>{result.excerpt}</p>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBox;
