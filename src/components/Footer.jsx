import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<div className="relative flex h-dvh min-h-[600px] w-screen flex-col justify-around bg-grc-dark-blue px-5 pt-24 text-center md:h-min md:min-h-0 md:px-16 md:pb-14 md:pt-20 lg:px-32">
			<div className="flex h-full w-full flex-col justify-between md:flex-row md:items-start">
				<span className="text-2xl text-white md:h-52">
					Gerrit Rietveld College
				</span>
				<div className="grid gap-7 md:ml-6 md:mr-auto">
					<span className="uppercase text-grc-red">Rietvelduren</span>
					<ul className="*:text-white md:text-start">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/keuzemodulen">Keuzemodules</Link>
						</li>
						<li>
							<Link>Contact</Link>
						</li>
					</ul>
				</div>
				<div className="flex items-center justify-center gap-2 text-white">
					<button className="flex size-12 items-center justify-center rounded-full bg-grc-red duration-300 hover:brightness-50">
						<FaFacebookF />
					</button>
					<button className="flex size-12 items-center justify-center rounded-full bg-grc-red duration-300 hover:brightness-50">
						<FaTwitter />
					</button>
					<button className="flex size-12 items-center justify-center rounded-full bg-grc-red duration-300 hover:brightness-50">
						<FaInstagram />
					</button>
				</div>
			</div>
			<div className="mb-8 mt-16 flex h-28 flex-col items-center justify-center border-t border-grc-slate md:mb-0 md:mt-0 md:items-start">
				<div className="mt-8 flex shrink-0 flex-col overflow-y-hidden *:text-grc-gray md:flex-row md:gap-2">
					<span>Copyright &copy; 2024</span>
					<span>Gerrit Rietveld College</span>
				</div>
			</div>
		</div>
	);
}

export default Footer;
