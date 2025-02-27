/* eslint-disable jsx-a11y/accessible-emoji */
import * as React from "react";
import { useTooltip, TooltipPopup } from "@blinq-reach/tooltip";
import type { Position } from "@blinq-reach/tooltip";
import { Portal } from "@blinq-reach/portal";
import "@reach/tooltip/styles.css";

let name = "Triangle";

function Example() {
	return (
		<div>
			<TooltipWithTriangle label="Notifications">
				<button style={{ fontSize: 25 }} aria-label="Notifications">
					<span aria-hidden>🔔</span>
				</button>
			</TooltipWithTriangle>
			<TooltipWithTriangle label="Settings">
				<button style={{ fontSize: 25 }}>
					<span aria-hidden>⚙️</span>
				</button>
			</TooltipWithTriangle>

			<div style={{ float: "right" }}>
				<TooltipWithTriangle label="Notifications" aria-label="3 Notifications">
					<button style={{ fontSize: 25 }} aria-label="3 Notifications">
						<span>🔔</span>
						<span>3</span>
					</button>
				</TooltipWithTriangle>
			</div>
			<div style={{ marginTop: 600 }}>Hi</div>
		</div>
	);
}

Example.storyName = name;
export { Example };

// Center the tooltip, but collisions will win
const centered: Position = (triggerRect, tooltipRect) => {
	if (!triggerRect || !tooltipRect) {
		return {};
	}
	let triggerCenter = triggerRect.left + triggerRect.width / 2;
	let left = triggerCenter - tooltipRect.width / 2;
	let maxLeft = document.documentElement.clientWidth - tooltipRect.width;
	return {
		left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
		top: triggerRect.bottom + 8 + window.scrollY,
	};
};

function TooltipWithTriangle({ children, ...rest }: TooltipWithTriangleProps) {
	// get the props from useTooltip
	const [trigger, tooltip] = useTooltip();

	// destructure off what we need to position the triangle
	const { isVisible, triggerRect } = tooltip;

	return (
		<React.Fragment>
			{React.cloneElement(children, trigger)}

			{isVisible && (
				// the Triangle, we position it relative to the trigger, not the popup
				// so that collisions don't have a triangle pointing off to nowhere
				<Portal>
					<div
						style={{
							position: "absolute",
							left: triggerRect
								? triggerRect.left - 10 + triggerRect.width / 2
								: undefined,
							top: triggerRect
								? triggerRect.bottom + window.scrollY
								: undefined,
							width: 0,
							height: 0,
							borderLeft: "10px solid transparent",
							borderRight: "10px solid transparent",
							borderBottom: "10px solid black",
						}}
					/>
				</Portal>
			)}
			<TooltipPopup
				{...tooltip}
				{...rest}
				style={{
					background: "black",
					color: "white",
					border: "none",
					borderRadius: "3px",
					padding: "0.5em 1em",
				}}
				position={centered}
			/>
		</React.Fragment>
	);
}

interface TooltipWithTriangleProps {
	children: React.ReactElement;
	label: string;
}
