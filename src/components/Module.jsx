import React from "react";
import { Link } from "react-router-dom";

function Module({ module }) {
	return (
		<Link
			to={{
				pathname: `/keuzemodulen/${module.ModuleId}`,
				state: { module }
			}}
			className="relative flex h-[350px] w-full max-w-[250px] items-center justify-center overflow-hidden sm:h-[450px] sm:max-w-[350px] md:h-[580px] md:max-w-[450px]"
		>
			<img
				src={module.image_url}
				alt="Foto van Activiteit"
				className="h-full w-full object-cover"
			/>
			<div className="absolute inset-0 flex flex-col items-start justify-end bg-black bg-opacity-30 px-5 pb-14 md:px-3 md:pb-7 lg:px-10 lg:pb-12 xl:px-12 xl:pb-16">
				<span className="mb-4 rounded-full bg-white px-9 py-1.5 md:px-7">
					{module.category}
				</span>
				<h2 className="overflow-y-hidden text-3xl text-white md:text-2xl lg:text-4xl">
					{module.title}
				</h2>
			</div>
		</Link>
	);
}

export default Module;
