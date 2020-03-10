import React from "react";
// import renderer from "react-test-renderer";
// import { act } from "react-dom/test-utils";
import { render, fireEvent, cleanup } from "$test/utils";
import { axe } from "jest-axe";
import {
  Slider,
  SliderHandle,
  SliderInput,
  SliderMarker,
  SliderTrack,
  SliderTrackHighlight,
  // SLIDER_HANDLE_ALIGN_CENTER,
  // SLIDER_HANDLE_ALIGN_CONTAIN,
  // SLIDER_ORIENTATION_HORIZONTAL,
  // SLIDER_ORIENTATION_VERTICAL
} from "@reach/slider";

const getCurrentValue = (el: HTMLElement) =>
  Number(el.getAttribute("aria-valuenow"));

describe("<Slider />", () => {
  it("should not have basic a11y issues", async () => {
    const { container } = render(<BasicSlider />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
  it("should match the snapshot", () => {
    const { asFragment } = render(<BasicSlider />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("highlights markers as value is exceeded", () => {
    const min = 0;
    const max = 100;
    const { getByRole, getByTestId } = render(
      <SliderInput aria-label="highlighter" min={min} max={max}>
        <SliderTrack>
          <SliderTrackHighlight />
          <SliderHandle />
          <SliderMarker data-testid="handle-1" value={20} />
          <SliderMarker data-testid="handle-2" value={40} />
          <SliderMarker data-testid="handle-3" value={60} />
          <SliderMarker data-testid="handle-4" value={80} />
        </SliderTrack>
      </SliderInput>
    );

    // markers get this attribute to style highlights
    const highlightAtt = "data-reach-slider-marker-highlight";
    const handle = getByRole("slider");

    expect(getByTestId("handle-2").getAttribute(highlightAtt)).toBe(null);

    fireEvent.keyDown(handle, { key: "PageUp", code: 33 });
    fireEvent.keyDown(handle, { key: "PageUp", code: 33 });
    fireEvent.keyDown(handle, { key: "PageUp", code: 33 });
    fireEvent.keyDown(handle, { key: "PageUp", code: 33 });
    fireEvent.keyDown(handle, { key: "PageUp", code: 33 });

    expect(getByTestId("handle-2").getAttribute(highlightAtt)).not.toBe(null);
  });
  it("moves the handle", () => {
    const min = 0;
    const max = 100;
    const keyStep = (max - min) / 100;
    const tenSteps = (max - min) / 10;

    const { getByRole } = render(
      <SliderInput aria-label="mover" min={min} max={max}>
        <SliderTrack>
          <SliderTrackHighlight />
          <SliderHandle />
        </SliderTrack>
      </SliderInput>
    );
    const handle = getByRole("slider");
    const startingValue = getCurrentValue(handle);

    fireEvent.click(handle);

    fireEvent.keyDown(handle, { key: "ArrowRight", code: 39 });
    fireEvent.keyDown(handle, { key: "ArrowRight", code: 39 });

    expect(getCurrentValue(handle)).toEqual(startingValue + keyStep * 2);

    fireEvent.keyDown(handle, { key: "ArrowLeft", code: 37 });
    fireEvent.keyDown(handle, { key: "ArrowLeft", code: 37 });

    expect(getCurrentValue(handle)).toEqual(startingValue);

    fireEvent.keyDown(handle, { key: "End", code: 35 });
    expect(getCurrentValue(handle)).toEqual(max);

    fireEvent.keyDown(handle, { key: "Home", code: 36 });
    expect(getCurrentValue(handle)).toEqual(min);

    fireEvent.keyDown(handle, { key: "Home", code: 36 });
    expect(getCurrentValue(handle)).toEqual(min);

    fireEvent.keyDown(handle, { key: "PageUp", code: 33 });
    fireEvent.keyDown(handle, { key: "PageUp", code: 33 });
    expect(getCurrentValue(handle)).toEqual(min + tenSteps * 2);

    fireEvent.keyDown(handle, { key: "PageDown", code: 34 });
    expect(getCurrentValue(handle)).toEqual(min + tenSteps);
  });
});

function BasicSlider() {
  return <Slider aria-label="basic slider" />;
}
