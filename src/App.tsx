import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

//
import ResultList from "./components/ResultList";
import SearchBox from "./components/SearchBox";
import Facet from "./components/Facet";
import Pager from "./components/Pager";
import BreadCrumb from "./components/BreadCrumb";
import DateFilter from "./components/TimeFacet";
import { FacetSearch } from "./components/FacetSearch";
//
import {
  searchBox as SearchBoxController,
  resultList as ResultListController,
  facet1 as FacetController1,
  facet3 as FacetController3,
  pager as PagerController,
  instantResults as InstaController,
  breadcrumbs as BreadCrumbController,
  facetBuilder,
  dateFacet as dateFacetController,
} from "./controllers/controllers";
//
import { headlessEngine } from "./Engine";

function App() {
  useEffect(() => {
    headlessEngine.executeFirstSearch();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="app">
              <header className="app-header">
                <img
                  src={require("./assets/barca.svg").default}
                  alt="barcaLogo"
                />
                <div className="search-section">
                  <SearchBox
                    controllerSearchbox={SearchBoxController}
                    controllerInstantResults={InstaController}
                  />
                </div>
              </header>
              <div className="app-body">
                <div className="main-section">
                  <div className="facet-section column">
                    <FacetSearch
                      controller={facetBuilder("source", "1")}
                      facetTitle="Source"
                    />
                    <Facet controller={FacetController1} title="File type" />
                    <Facet controller={FacetController3} title="Author" />
                    <DateFilter controller={dateFacetController} />
                  </div>
                  <div className="results-section column">
                    <BreadCrumb controller={BreadCrumbController} />
                    <ResultList controller={ResultListController} />
                    <Pager controller={PagerController} />
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />

      <Route
        path="/:query"
        element={
          <>
            <div className="app">
              <header className="app-header">
                <img
                  src={require("./assets/barca.svg").default}
                  alt="barcaLogo"
                />
                <div className="search-section">
                  <SearchBox
                    controllerSearchbox={SearchBoxController}
                    controllerInstantResults={InstaController}
                  />
                </div>
              </header>
              <div className="app-body">
                <div className="main-section">
                  <div className="facet-section column">
                    <FacetSearch
                      controller={facetBuilder("source", "1")}
                      facetTitle="Source"
                    />
                    <Facet controller={FacetController1} title="File type" />
                    <Facet controller={FacetController3} title="Author" />
                    <DateFilter controller={dateFacetController} />
                  </div>
                  <div className="results-section column">
                    <BreadCrumb controller={BreadCrumbController} />
                    <ResultList controller={ResultListController} />
                    <Pager controller={PagerController} />
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </Routes>
  );
}

export default App;
