/// <reference types="vitest-axe/extend-expect" />
/// <reference types="vitest-dom/extend-expect" />

import * as React from "react";
import {
	cleanup,
	render,
	fireEvent,
	userEvent,
} from "@reach-internal/test/utils";
import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	TabsKeyboardActivation,
	TabsOrientation,
} from "@blinq-reach/tabs";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(cleanup);

describe("<Tabs />", () => {
	describe("rendering", () => {
		it("sets the button type to button by default", () => {
			const { getByText } = render(
				<div>
					<Tabs>
						<TabList>
							<Tab>Tab 1</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<p>Panel 1</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>
			);

			expect(getByText("Tab 1")).toHaveAttribute("type", "button");
		});

		it("renders as any HTML element", () => {
			const { getByTestId } = render(
				<Tabs data-testid="wrap" as="section">
					<TabList>
						<Tab>Tab 1</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<p>Panel 1</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			);
			expect(getByTestId("wrap").tagName).toBe("SECTION");
		});

		it("renders as a custom component", () => {
			const Wrapper = React.forwardRef<any, any>((props, ref) => (
				<div ref={ref} data-testid="wrap" {...props} />
			));
			const { getByTestId } = render(
				<Tabs as={Wrapper}>
					<TabList>
						<Tab>Tab 1</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<p>Panel 1</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			);
			expect(getByTestId("wrap").tagName).toBe("DIV");
		});

		describe("<TabList />", () => {
			it("renders as any HTML element", () => {
				const { getByTestId } = render(
					<Tabs>
						<TabList as="ul" data-testid="list">
							<Tab as="li">Tab 1</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<p>Panel 1</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				);
				expect(getByTestId("list").tagName).toBe("UL");
			});
			it("renders as a custom component", () => {
				const List = React.forwardRef<any, any>((props, ref) => (
					<ul data-testid="list" ref={ref} {...props} />
				));
				const { getByTestId } = render(
					<Tabs>
						<TabList as={List}>
							<Tab as="li">Tab 1</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<p>Panel 1</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				);
				expect(getByTestId("list").tagName).toBe("UL");
			});
		});

		describe("<Tab />", () => {
			it("renders as any HTML element", () => {
				const { getByText } = render(
					<Tabs>
						<TabList as="ul">
							<Tab as="li">Tab 1</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<p>Panel 1</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				);
				expect(getByText("Tab 1").tagName).toBe("LI");
			});
			it("renders as a custom component", () => {
				const ListItem = React.forwardRef<any, any>((props, ref) => (
					<li ref={ref} {...props} />
				));
				const { getByText } = render(
					<Tabs>
						<TabList as="ul">
							<Tab as={ListItem}>Tab 1</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<p>Panel 1</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				);
				expect(getByText("Tab 1").tagName).toBe("LI");
			});
		});

		describe("<TabPanel />", () => {
			it("renders as any HTML element", () => {
				const { getByText } = render(
					<Tabs>
						<TabList>
							<Tab>Tab 1</Tab>
						</TabList>
						<TabPanels>
							<TabPanel as="p">Panel 1</TabPanel>
						</TabPanels>
					</Tabs>
				);
				expect(getByText("Panel 1").tagName).toBe("P");
			});
			it("renders as a custom component", () => {
				const Panel = React.forwardRef<any, any>((props, ref) => (
					<p ref={ref} {...props} />
				));
				const { getByText } = render(
					<Tabs>
						<TabList>
							<Tab>Tab 1</Tab>
						</TabList>
						<TabPanels>
							<TabPanel as={Panel}>Panel 1</TabPanel>
						</TabPanels>
					</Tabs>
				);
				expect(getByText("Panel 1").tagName).toBe("P");
			});

			it("is hidden or not based on selected state", () => {
				const { getByText } = render(
					<Tabs>
						<TabList>
							<Tab>Tab 1</Tab>
							<Tab>Tab 2</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>Panel 1</TabPanel>
							<TabPanel>Panel 2</TabPanel>
						</TabPanels>
					</Tabs>
				);
				expect(getByText("Panel 1")).toBeVisible();
				expect(getByText("Panel 2")).not.toBeVisible();
			});
			it("can interact with elements on initial load", () => {
				const Comp = () => {
					let input = React.useRef<HTMLInputElement>(null);
					React.useEffect(() => {
						input.current!.focus();
					}, []);
					return (
						<Tabs>
							<TabList>
								<Tab>Tab 1</Tab>
								<Tab>Tab 2</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<input type="text" ref={input} />
								</TabPanel>
								<TabPanel>Panel 2</TabPanel>
							</TabPanels>
						</Tabs>
					);
				};
				const { getByRole } = render(<Comp />);
				expect(getByRole("textbox")).toHaveFocus();
			});
		});

		describe("<TabPanels />", () => {
			it("renders as any HTML element", () => {
				const { getByTestId } = render(
					<Tabs>
						<TabList>
							<Tab>Tab 1</Tab>
						</TabList>
						<TabPanels data-testid="panels" as="section">
							<TabPanel>
								<p>Panel 1</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				);
				expect(getByTestId("panels").tagName).toBe("SECTION");
			});
			it("renders as a custom component", () => {
				const Panels = React.forwardRef<any, any>((props, ref) => (
					<section data-testid="panels" ref={ref} {...props} />
				));
				const { getByTestId } = render(
					<Tabs>
						<TabList>
							<Tab>Tab 1</Tab>
						</TabList>
						<TabPanels as={Panels}>
							<TabPanel>
								<p>Panel 1</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				);
				expect(getByTestId("panels").tagName).toBe("SECTION");
			});
		});
	});

	describe("user events", () => {
		it("selects the correct tab with keyboard navigation", () => {
			const { getByText, getByRole } = render(
				<div>
					<Tabs>
						<TabList>
							<Tab>Tab 1</Tab>
							<Tab>Tab 2</Tab>
							<Tab>Tab 3</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<p>Panel 1</p>
							</TabPanel>
							<TabPanel>
								<p>Panel 2</p>
							</TabPanel>
							<TabPanel>
								<p>Panel 3</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>
			);

			let tabList = getByRole("tablist");

			fireEvent.click(getByText("Tab 1"));

			fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 });
			expect(getByText("Tab 2")).toHaveFocus();
			expect(getByText("Panel 2")).toBeVisible();
			expect(getByText("Panel 1")).not.toBeVisible();

			fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 });
			expect(getByText("Tab 3")).toHaveFocus();
			expect(getByText("Panel 3")).toBeVisible();
			expect(getByText("Panel 2")).not.toBeVisible();

			fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 });
			expect(getByText("Tab 1")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 });
			expect(getByText("Tab 3")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 });
			fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 });
			expect(getByText("Tab 1")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "End", code: 35 });
			expect(getByText("Tab 3")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "Home", code: 36 });
			expect(getByText("Tab 1")).toHaveFocus();
		});

		it("focuses the correct tab with keyboard navigation (vertical orientation)", () => {
			const { getByText, getByRole } = render(
				<div>
					<Tabs orientation={TabsOrientation.Vertical}>
						<TabList>
							<Tab>Tab 1</Tab>
							<Tab>Tab 2</Tab>
							<Tab>Tab 3</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<p>Panel 1</p>
							</TabPanel>
							<TabPanel>
								<p>Panel 2</p>
							</TabPanel>
							<TabPanel>
								<p>Panel 3</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>
			);

			let tabList = getByRole("tablist");

			fireEvent.click(getByText("Tab 1"));

			fireEvent.keyDown(tabList, { key: "ArrowDown", code: 40 });
			expect(getByText("Tab 2")).toHaveFocus();
			expect(getByText("Panel 2")).toBeVisible();
			expect(getByText("Panel 1")).not.toBeVisible();

			fireEvent.keyDown(tabList, { key: "ArrowDown", code: 40 });
			expect(getByText("Tab 3")).toHaveFocus();
			expect(getByText("Panel 3")).toBeVisible();
			expect(getByText("Panel 2")).not.toBeVisible();

			fireEvent.keyDown(tabList, { key: "ArrowDown", code: 40 });
			expect(getByText("Tab 1")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "ArrowUp", code: 38 });
			expect(getByText("Tab 3")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "ArrowUp", code: 38 });
			fireEvent.keyDown(tabList, { key: "ArrowUp", code: 38 });
			expect(getByText("Tab 1")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "End", code: 35 });
			expect(getByText("Tab 3")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "Home", code: 36 });
			expect(getByText("Tab 1")).toHaveFocus();
		});

		it.todo("focuses the correct tab with manual keyboard navigation", () => {
			const { getByRole, getByText } = render(
				<div>
					<Tabs keyboardActivation={TabsKeyboardActivation.Manual}>
						<TabList>
							<Tab>Tab 1</Tab>
							<Tab>Tab 2</Tab>
							<Tab>Tab 3</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<p>Panel 1</p>
							</TabPanel>
							<TabPanel>
								<p>Panel 2</p>
							</TabPanel>
							<TabPanel>
								<p>Panel 3</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>
			);

			let tabList = getByRole("tablist");

			expect(tabList).toBeTruthy();

			userEvent.click(getByText("Tab 1"));

			fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 });
			expect(getByText("Tab 2")).toHaveFocus();
			expect(getByText("Panel 1")).toBeVisible();
			expect(getByText("Panel 2")).not.toBeVisible();

			fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 });
			expect(getByText("Tab 3")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 });
			expect(getByText("Tab 1")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 });
			expect(getByText("Tab 3")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 });
			fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 });
			expect(getByText("Tab 1")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "End", code: 35 });
			expect(getByText("Tab 3")).toHaveFocus();

			fireEvent.keyDown(tabList, { key: "Home", code: 36 });
			expect(getByText("Tab 1")).toHaveFocus();
		});

		it("correctly calls focus and blur events on Tab component", () => {
			const onBlur = vi.fn();
			const onFocus = vi.fn();

			const { getAllByRole } = render(
				<Tabs>
					<TabList>
						<Tab onFocus={onFocus} onBlur={onBlur}>
							Tab 1
						</Tab>
						<Tab onFocus={onFocus} onBlur={onBlur}>
							Tab 2
						</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<p>Panel 1</p>
						</TabPanel>
						<TabPanel>
							<p>Panel 2</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			);

			let tabs = getAllByRole("tab");

			fireEvent.focus(tabs[0]);

			expect(onFocus).toHaveBeenCalledTimes(1);

			fireEvent.blur(tabs[0]);
			fireEvent.focus(tabs[1]);

			expect(onFocus).toHaveBeenCalledTimes(2);
			expect(onBlur).toHaveBeenCalledTimes(1);
		});
	});
});
