import {
  SearchBox,
  buildSearchBox,
  buildResultList,
  buildFacet,
  buildPager,
  buildInstantResults,
  buildBreadcrumbManager,
  buildDateFilter,
  buildCategoryFacet,
  CategoryFacetOptions,
} from "@coveo/headless";
import { headlessEngine } from "../Engine";

export const searchBox: SearchBox = buildSearchBox(headlessEngine);

export const resultList = buildResultList(headlessEngine);

// Facets
export const facet1 = buildFacet(headlessEngine, {
  options: { field: "filetype" },
});

// export const facet2 = buildFacet(headlessEngine, {
//   options: { field: "source" },
// });

export const facet3 = buildFacet(headlessEngine, {
  options: { field: "author" },
});

// Search facet
export const facetBuilder = (fieldName: string, facetId: string) => {
  return buildFacet(headlessEngine, {
    options: {
      field: fieldName,
      facetId,
      numberOfValues: 5,
    },
  });
};

// Pagination
export const pager = buildPager(headlessEngine);

// Instant results
export const instantResults = buildInstantResults(headlessEngine, {
  options: { maxResultsPerQuery: 1 },
});

// date-time facet
export const dateFacet = buildDateFilter(headlessEngine, {
  options: {
    field: "date",
  },
});

// breadcrumbs controller
export const breadcrumbs = buildBreadcrumbManager(headlessEngine);

// category search facet
const options: CategoryFacetOptions = { field: "author" };
export const categoryFacet = buildCategoryFacet(headlessEngine, { options });
