import { useEffect } from "react";
import "./App.css";
//
import ResultList from "./components/ResultList";
import SearchBox from "./components/SearchBox";
import Facet from "./components/Facet";
import Pager from "./components/Pager";
//
import {
  searchBox as SearchBoxController,
  resultList as ResultListController,
  facet1 as FacetController1,
  facet2 as FacetController2,
  facet3 as FacetController3,
  facet4 as FacetController4,
  pager as PagerController,
  instantResults as InstaController,
} from "./controllers/controllers";
//
import { headlessEngine } from "./Engine";

function App() {
  useEffect(() => {
    headlessEngine.executeFirstSearch();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <img src={require("./assets/barca.svg").default} alt="barcaLogo" />
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
            <Facet controller={FacetController1} title="File type" />
            <Facet controller={FacetController2} title="Sources" />
            <Facet controller={FacetController3} title="Author" />
            <Facet controller={FacetController4} title="Month" />
          </div>
          <div className="results-section column">
            <ResultList controller={ResultListController} />
            <Pager controller={PagerController} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
