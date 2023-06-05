import {
  buildSearchEngine,
  loadFieldActions,
  SearchEngine,
  getOrganizationEndpoints,
} from "@coveo/headless";

const FIELDS = ["filetype", "source", "author", "year"];

const registerAdditionalFields = (headlessEngine: SearchEngine) => {
  const fieldActions = loadFieldActions(headlessEngine);
  headlessEngine.dispatch(fieldActions.registerFieldsToInclude(FIELDS));
  return headlessEngine;
};

// API_KEY: xxa044ab89-9098-4f90-84cf-c640136d0d2d
// Sameer
const buildEngine = buildSearchEngine({
  configuration: {
    organizationId: "sameerkitalentdigitalcomchocolateladybugyn9b4y2h",
    accessToken: "xxa044ab89-9098-4f90-84cf-c640136d0d2d",
    organizationEndpoints: getOrganizationEndpoints(
      "sameerkitalentdigitalcomchocolateladybugyn9b4y2h"
    ),
    // search: {
    //   pipeline: "iTunes",
    //   searchHub: "MainSearch",
    // },
  },
});

// Vinay
// const buildEngine = buildSearchEngine({
//   configuration: {
//     organizationId: "saivinaykitalentdigitalcomsalmondamselflyvhu98oxp",
//     accessToken: "xx9043460b-0863-46e2-915f-39a2927ec44e",
//     organizationEndpoints: getOrganizationEndpoints(
//       "saivinaykitalentdigitalcomsalmondamselflyvhu98oxp"
//     ),
//   },
// });

export const headlessEngine = registerAdditionalFields(buildEngine);
