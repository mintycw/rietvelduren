import React from "react";
import PromotionBanner from "./PromotionBanner";
import RecentModules from "./RecentModules";

function Landing() {
	return (
		<div className="flex flex-col">
			<PromotionBanner />
			<RecentModules />
		</div>
	);
}

export default Landing;
