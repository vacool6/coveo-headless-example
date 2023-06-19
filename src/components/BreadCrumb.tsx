import { useState, useEffect } from "react";
import { BreadcrumbManager as HeadlessBreadcrumbManager } from "@coveo/headless";

interface BreadcrumbProps {
  controller: HeadlessBreadcrumbManager;
}

const BreadCrumb: React.FunctionComponent<BreadcrumbProps> = (props) => {
  const { controller } = props;

  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const breadcrumbContainerStyle = {
    listStyleType: "none",
  };
  const buttonStyle = {
    background: "transparent",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer",
    color: "white",
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ul style={breadcrumbContainerStyle}>
        {state.hasBreadcrumbs &&
          state.facetBreadcrumbs.map((facet) => (
            <li key={facet.facetId}>
              <b style={{ fontSize: "20px" }}> {facet.field} :- </b>
              {facet.values.map((breadcrumb) => (
                <span
                  style={{
                    backgroundColor: "gray",
                    padding: "5px",
                    margin: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {breadcrumb.value.value}
                  <button
                    style={buttonStyle}
                    onClick={() => breadcrumb.deselect()}
                  >
                    x
                  </button>
                </span>
              ))}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BreadCrumb;
