import { useState, useEffect } from "react";
import { ResultList as ResultListController, Result } from "@coveo/headless";

interface ResultListProps {
  controller: ResultListController;
}

const sportsResultsTemplate = (result: Result, srcType: any) => {
  return (
    <li key={result.uniqueId}>
      <div>
        <div className="result-item-header">
          <h2>
            <a href={result.title}>{result.title}</a>
          </h2>
          {srcType === "Sports" ? (
            <button className="result-button">Add to cart</button>
          ) : (
            <button className="result-button">More info</button>
          )}
        </div>
        <p>{result.excerpt}</p>
      </div>
    </li>
  );
};

const defaultResultsTemplate = (result: Result) => {
  return <p>{result.title}</p>;
};

const ResultList: React.FC<ResultListProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  console.log(state);
  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );
  if (!state.results.length) {
    return <div>No results</div>;
  }

  return (
    <div className="result-list">
      <ul>
        {state.results.map((result) => {
          if (result.raw.source === "Sports") {
            return sportsResultsTemplate(result, result.raw.source);
          } else {
            return sportsResultsTemplate(result, result.raw.source);
          }
        })}
      </ul>
    </div>
  );
};

export default ResultList;
