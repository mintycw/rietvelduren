import React from "react";
import { Link } from "react-router-dom";
import banner from "../../assets/svg/banner.svg";
import bannerBackground from "../../assets/svg/bannerBackground.svg";

function PromotionBanner() {
	return (
		<div className="flex flex-col items-center justify-center px-5 py-6 pb-6 pt-0 md:my-0 md:flex-row-reverse md:justify-between md:px-10 md:pb-4 lg:px-20 lg:py-4 xl:px-28">
			<div className="flex w-fit items-center justify-end lg:w-full">
				<div className="top relative mb-24 h-[340px] w-[330px] md:mb-0 lg:h-[440px] lg:w-[430px] xl:h-[560px] xl:w-[550px] 2xl:h-[660px] 2xl:w-[650px]">
					<img
						src={banner}
						alt="Banner Foto"
						className="absolute left-0 z-10 py-5 md:py-0 lg:size-[395px] xl:size-[495px] 2xl:size-[595px]"
					/>
					<img
						src={bannerBackground}
						alt="Banner Achtergrond Foto"
						className="absolute bottom-0 right-0 z-0 lg:size-[333px] xl:size-[433px] 2xl:size-[533px]"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-6 md:w-1/2 md:pt-24 lg:w-2/3">
				<h1 className="min-h-20 overflow-hidden text-6xl xl:text-7xl">
					Wat ga jij kiezen?
				</h1>
				<p>
					Video-editen, wereldgerechten koken, bijzondere sporten
					beoefenen, nepnieuws leren herkennen: Rietvelduren (RVU)
					zijn anders dan anders! Je ontwikkelt je talenten, versterkt
					de band met school, leert omgaan met anderen en leert je
					uiten over wat er leeft en speelt in de samenleving waar je
					deel van uitmaakt.Kijk nu bij de keuzemodules en schrijf je
					in!
				</p>
				<Link
					to="/keuzemodulen"
					className="flex h-12 w-fit items-center justify-center rounded-md bg-grc-red px-2 text-sm uppercase text-white"
				>
					Naar keuzemodules
				</Link>
			</div>
		</div>
	);
}

export default PromotionBanner;
