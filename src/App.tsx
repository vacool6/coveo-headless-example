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
            <Facet controller={FacetController1} title="Category" />
            <Facet controller={FacetController2} title="Names" />
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
