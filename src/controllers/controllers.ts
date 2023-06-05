import {
  SearchBox,
  buildSearchBox,
  buildResultList,
  buildFacet,
  buildPager,
  buildInstantResults,
} from "@coveo/headless";
import { headlessEngine } from "../Engine";

export const searchBox: SearchBox = buildSearchBox(headlessEngine);

export const resultList = buildResultList(headlessEngine);

// Facets
export const facet1 = buildFacet(headlessEngine, {
  options: { field: "filetype" },
});

export const facet2 = buildFacet(headlessEngine, {
  options: { field: "source" },
});

export const facet3 = buildFacet(headlessEngine, {
  options: { field: "author" },
});

export const facet4 = buildFacet(headlessEngine, {
  options: { field: "year" },
});

// Pagination
export const pager = buildPager(headlessEngine);

// Instant results
export const instantResults = buildInstantResults(headlessEngine, {
  options: { maxResultsPerQuery: 1 },
});
