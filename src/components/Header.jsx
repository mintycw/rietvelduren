import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/svg/logo.svg";
import { IoMenu } from "react-icons/io5";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { IoMdArrowBack } from "react-icons/io";

function Header() {
	const { loggedIn, currentUser, logOut } = useContext(AuthContext);
	const [modalOpen, setModalOpen] = useState(false);

	const navigate = useNavigate();

	function handleButton(path) {
		navigate(path);
		setModalOpen(false);
	}

	return (
		<>
			<nav className="h-min w-screen">
				<div className="grid grid-cols-2 md:grid-cols-3">
					<div className="flex w-full justify-start pl-8 md:justify-center md:pl-0">
						<Link to="/">
							<img src={logo} alt="Gerrit Rietveld Logo" />
						</Link>
					</div>
					<ul className="flex w-full items-center justify-end pr-8 md:justify-between md:px-4 lg:px-20">
						<li className="hidden md:block">
							<Link to="/">Home</Link>
						</li>
						<li className="hidden md:block">
							<Link to="/keuzemodulen">Keuzemodules</Link>
						</li>
						<button
							onClick={() => setModalOpen(!modalOpen)}
							className="flex size-12 items-center justify-center rounded-md border border-grc-dark-blue text-grc-dark-blue md:hidden"
						>
							<IoMenu className="size-1/2" />
						</button>
					</ul>
					<div className="hidden items-center justify-center text-sm md:flex">
						{loggedIn && (
							<span>
								Ingelogd als{" "}
								<Link
									to="/admin/dashboard"
									className="font-bold hover:underline"
								>
									{currentUser}
								</Link>
								,
								<button
									onClick={() => logOut()}
									className="rounded px-2 text-xs hover:underline"
								>
									Uitloggen
								</button>
							</span>
						)}
					</div>
				</div>
				<hr className="border-[16px] border-grc-yellow md:border-[24px]" />
			</nav>
			{modalOpen && (
				<div className="fixed left-0 top-0 z-50 h-screen w-screen bg-grc-dark-blue text-white md:-z-50 md:hidden">
					<ul className="flex h-full flex-col items-center justify-center gap-5">
						<li className="absolute top-20 text-center text-4xl">
							<button
								onClick={() => setModalOpen(false)}
								className="flex w-full flex-row items-center justify-center gap-2 overflow-hidden text-center hover:underline"
							>
								<IoMdArrowBack /> Terug
							</button>
						</li>
						<li className="w-72 rounded-md bg-grc-slate py-2 text-center">
							<button onClick={() => handleButton("/")}>
								Home
							</button>
						</li>
						<li className="w-72 rounded-md bg-grc-slate py-2 text-center">
							<button
								onClick={() => handleButton("/keuzemodulen")}
							>
								Keuzemodules
							</button>
						</li>
						{loggedIn && (
							<li className="flex w-72 flex-col items-center justify-center gap-2">
								<span className="w-full text-center">
									Ingelogd als{" "}
									<Link to="/admin/dashboard">
										{" "}
										<span className="font-bold hover:underline">
											{currentUser},
										</span>
									</Link>
								</span>
								<button
									onClick={() => logOut()}
									className="w-48 rounded bg-grc-red py-2 hover:underline"
								>
									Uitloggen
								</button>
							</li>
						)}
					</ul>
				</div>
			)}
		</>
	);
}

export default Header;
