import * as React from "react";
import {
	Combobox,
	ComboboxInput,
	ComboboxList,
	ComboboxOption,
	ComboboxPopover,
} from "@blinq-reach/combobox";
import "@reach/combobox/styles.css";

let name = "Open on focus";

function Example() {
	let [term, setTerm] = React.useState("");
	let [selection, setSelection] = React.useState("");

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setTerm(event.target.value);
	}

	function handleSelect(value: string) {
		setSelection(value);
		setTerm(value);
	}

	return (
		<div>
			<h2>Clientside Search</h2>
			<p>Selection: {selection}</p>
			<Combobox openOnFocus onSelect={handleSelect} aria-label="choose a city">
				<ComboboxInput
					onChange={handleChange}
					value={term}
					style={inputStyle}
				/>
				<ComboboxPopover style={popupStyle}>
					<ComboboxList>
						<ComboboxOption value="Apple" />
						<ComboboxOption value="Banana" />
						<ComboboxOption value="Orange" />
						<ComboboxOption value="Pineapple" />
						<ComboboxOption value="Kiwi" />
					</ComboboxList>
				</ComboboxPopover>
			</Combobox>
		</div>
	);
}

Example.storyName = name;
export { Example };

////////////////////////////////////////////////////////////////////////////////

const inputStyle = {
	width: 400,
	fontSize: "100%",
	padding: "0.33rem",
};

const popupStyle = {
	boxShadow: "0px 2px 6px hsla(0, 0%, 0%, 0.15)",
	border: "none",
};
