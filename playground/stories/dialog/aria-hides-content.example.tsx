import * as React from "react";
import { action } from "@storybook/addon-actions";
import { Dialog } from "@blinq-reach/dialog";
import "@reach/dialog/styles.css";

let name = "Aria Hides Content";

function Example() {
	const [showDialog, setShowDialog] = React.useState(false);
	React.useEffect(() => {
		let rootElem = document.getElementById("root");
		if (!rootElem) {
			return;
		}
		let logMutation = action("Root Node Attribute Mutated");
		let observer = new MutationObserver((mutationsList) => {
			for (var mutation of mutationsList) {
				logMutation(
					mutation.attributeName +
						": " +
						(mutation.target as Element).getAttribute("aria-hidden")
				);
			}
		});
		observer.observe(rootElem, { attributes: true });
		return () => {
			observer.disconnect();
		};
	}, []);
	return (
		<div>
			<button onClick={() => setShowDialog(true)}>Show Dialog</button>
			<Dialog
				aria-label="Announcement"
				isOpen={showDialog}
				onDismiss={() => setShowDialog(false)}
			>
				<p>
					The root node should have aria-hidden="true" set when opened and unset
					when closed.
				</p>
			</Dialog>
		</div>
	);
}

Example.storyName = name;
export { Example };
