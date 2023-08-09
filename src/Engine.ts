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
    organizationId: `${process.env.REACT_APP_ORG_ID}`,
    accessToken: `${process.env.REACT_APP_ACCESS_TOKEN}`,
    organizationEndpoints: getOrganizationEndpoints(
      `${process.env.REACT_APP_ORG_ID}`
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
