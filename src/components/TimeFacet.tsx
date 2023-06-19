import {
  buildDateRange,
  DateFilter as HeadlessDateFilter,
} from "@coveo/headless";
import { useEffect, useState, FunctionComponent } from "react";
import { parseDate } from "../utils/parseDate";

interface DateFilterProps {
  controller: HeadlessDateFilter;
}

function formattedDateValue(date?: string | Date) {
  if (!date) {
    return "";
  }
  return parseDate(date).format("YYYY-MM-DD");
}

const DateFilter: FunctionComponent<DateFilterProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);
  let startRef: HTMLInputElement;
  let endRef: HTMLInputElement;

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const { range } = state;

  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "10px",
        borderColor: "#6195e8",
        display: "flex",
        flexDirection: "column",
        height: "12.5rem",
        justifyContent: "space-around",
        padding: "0 4px",
      }}
    >
      <h3 style={{ color: "blue", margin: "0 4px" }}>Select range</h3>
      <input
        key="start"
        type="Date"
        ref={(ref) => (startRef = ref!)}
        defaultValue={formattedDateValue(range?.start)}
        placeholder="Start"
        style={{ height: "2.5rem", padding: "0 10px" }}
      />
      <input
        key="end"
        type="Date"
        ref={(ref) => (endRef = ref!)}
        defaultValue={formattedDateValue(range?.end)}
        placeholder="End"
        style={{ height: "2.5rem", padding: "0 10px" }}
      />
      <button
        key="apply"
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "4px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => {
          if (!startRef.value || !endRef.value) {
            return window.alert("Select date range to filter");
          }

          if (!startRef.validity.valid || !endRef.validity.valid) return;

          controller.setRange(
            buildDateRange({
              start: startRef.valueAsDate!,
              end: endRef.valueAsDate!,
            })
          );
        }}
      >
        Apply
      </button>
    </div>
  );
};

export default DateFilter;
