import React from "react";

function FormInput({ label, input = "text", required = false }) {
	return (
		<label className="mb-4 flex w-full flex-col">
			{label}
			<input
				required={required}
				type={input}
				className="h-10 w-full rounded border border-grc-gray p-1"
			/>
		</label>
	);
}

export default FormInput;
