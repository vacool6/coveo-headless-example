import {
  FacetSearch as HeadlessFacetSearch,
  FacetSearchState,
  SpecificFacetSearchResult,
} from "@coveo/headless";
import { Facet as HeadlessFacet } from "@coveo/headless";
import { useState, useEffect } from "react";

interface FacetSearchProps {
  controller: HeadlessFacetSearch;
  facetState: FacetSearchState;
  isValueSelected: (facetSearchValue: SpecificFacetSearchResult) => boolean;
}

const Facet: React.FunctionComponent<FacetSearchProps> = (props) => {
  const { controller } = props;

  const onInput = (text: string) => {
    controller.updateText(text);
    controller.search();
  };

  return (
    <div>
      <input type="text" onInput={(e) => onInput(e.currentTarget.value)} />
      <ul>
        {props.facetState.values.map((facetValue) => (
          <li key={facetValue.rawValue}>
            <button
              type="button"
              onClick={() => props.controller.select(facetValue)}
              disabled={props.isValueSelected(facetValue)}
            >
              {facetValue.rawValue} ({facetValue.count} results)
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface FacetProps {
  controller: HeadlessFacet;
  facetTitle: string;
}

export const FacetSearch: React.FunctionComponent<FacetProps> = (props) => {
  const { controller, facetTitle } = props;

  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const facetStyle = {
    border: "2px solid lightblue",
    borderRadius: "5px",
    margin: "0 10px 10px",
    padding: "10px",
  };

  const facetContainer = {
    listStyleType: "none",
  };

  const buttonStyle = {
    cursor: "pointer",
    backgroundColor: "#fff",
    border: "none",
    padding: "none",
    width: "25px",
    height: "25px",
  };

  const onClearingFacet = () => {
    controller.deselectAll();
  };

  if (!state.values.length) {
    return null;
  }

  return (
    <div style={facetStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <h3>{facetTitle}</h3>
        <button
          style={buttonStyle}
          onClick={onClearingFacet}
          aria-label="clear"
        >
          Clear
        </button>
      </div>
      <Facet
        controller={controller.facetSearch}
        facetState={state.facetSearch}
        isValueSelected={(facetSearchValue) =>
          !!state.values.find(
            (facetValue) =>
              facetValue.value === facetSearchValue.displayValue &&
              controller.isValueSelected(facetValue)
          )
        }
      />
      <ul style={facetContainer}>
        {state.values.map((facetValue) => (
          <li key={facetValue.value}>
            <input
              type="checkbox"
              checked={controller.isValueSelected(facetValue)}
              onChange={() => controller.toggleSelect(facetValue)}
              disabled={state.isLoading}
              style={{ cursor: "pointer" }}
            />
            {facetValue.value} ({facetValue.numberOfResults}) results
          </li>
        ))}
      </ul>
    </div>
  );
};
