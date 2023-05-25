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

export const facet1 = buildFacet(headlessEngine, {
  options: { field: "ec_category" },
});

export const facet2 = buildFacet(headlessEngine, {
  options: { field: "ec_name" },
});

export const pager = buildPager(headlessEngine);

export const instantResults = buildInstantResults(headlessEngine, {
  options: { maxResultsPerQuery: 1 },
});
