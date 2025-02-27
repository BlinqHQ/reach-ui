import * as React from "react";
import { Rect } from "@blinq-reach/rect";

let name = "Pin element to another";

function Example() {
	let [pin, setPin] = React.useState(true);
	return (
		<div>
			<p>
				<button onClick={() => setPin(!pin)}>
					{pin ? "Stop Pinning" : "Start Pinning"}
				</button>
			</p>
			<Rect observe={pin}>
				{({ ref, rect }) => (
					<div>
						<textarea defaultValue="resize this" />
						<span
							ref={ref}
							contentEditable
							dangerouslySetInnerHTML={{
								__html: "Observing my rect, I'm also editable",
							}}
							style={{
								display: "inline-block",
								padding: 10,
								margin: 10,
								border: "solid 1px",
								background: "#f0f0f0",
							}}
						/>{" "}
						{rect && (
							<div
								style={{
									padding: 10,
									color: "white",
									opacity: pin ? 1 : 0.25,
									background: "red",
									borderRadius: "50%",
									position: "absolute",

									// here we use the rect information
									// to pin the div to the span
									left: rect.left + rect.width + "px",
									top: rect.top + "px",
								}}
							>
								Pinned
							</div>
						)}
					</div>
				)}
			</Rect>
		</div>
	);
}

Example.storyName = name;
export { Example };
