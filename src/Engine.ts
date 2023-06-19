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

const buildEngine = buildSearchEngine({
  configuration: {
    organizationId: "sameerkitalentdigitalcomchocolateladybugyn9b4y2h",
    accessToken: "xxa044ab89-9098-4f90-84cf-c640136d0d2d",
    organizationEndpoints: getOrganizationEndpoints(
      "sameerkitalentdigitalcomchocolateladybugyn9b4y2h"
    ),
    // search: {
    //   pipeline: "kids",
    //   searchHub: "kids",
    // },
    // search: {
    //   pipeline: "iTalent",
    //   searchHub: "iTalent",
    // },

    // search: {
    //   pipeline: "React",
    //   searchHub: "ReactJS",
    // },
    // search: {
    //   pipeline: "ReactTunes",
    //   searchHub: "ReactJS",
    // },
  },
});

export const headlessEngine = registerAdditionalFields(buildEngine);
