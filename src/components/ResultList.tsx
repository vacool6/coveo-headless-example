import { useState, useEffect } from "react";
import { ResultList as ResultListController, Result } from "@coveo/headless";

interface ResultListProps {
  dataField: String;
  controller: ResultListController;
}

const sportsResultsTemplate = (result: any, srcType: any, dataField: any) => {
  console.log(result);
  return (
    <li key={result.uniqueId}>
      <div>
        <div className="result-item-header">
          <h2>
            {/* <a href={dataField} target="_blank" rel="noreferrer"> */}
            <a href={result[dataField]} target="_blank" rel="noreferrer">
              {result.title}
            </a>
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
  const { controller, dataField } = props;
  const [state, setState] = useState(controller.state);

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
            return sportsResultsTemplate(result, result.raw.source, dataField);
          } else {
            return sportsResultsTemplate(result, result.raw.source, dataField);
          }
        })}
      </ul>
    </div>
  );
};

export default ResultList;
