import React, {
	useReducer,
	useEffect,
	useContext,
	useState,
	useCallback
} from "react";
import { Link, useParams } from "react-router-dom";
import { ContentContext } from "../../contexts/ContentProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import InputType from "./InputType";
import reducer, { initialState } from "./reducer";

import arrow from "../../assets/svg/backArrow.svg";
import { LuHeading1, LuText, LuList, LuListOrdered } from "react-icons/lu";
import { RxBorderAll } from "react-icons/rx";

function Upsert() {
	const { userGroup, loggedIn } = useContext(AuthContext);
	const { postModule, getModule, updateModule, deleteModule } =
		useContext(ContentContext);

	// Initialize the state and dispatch using useReducer
	const [state, dispatch] = useReducer(reducer, initialState);

	// State to control whether borders are shown
	const [showBorder, setShowBorder] = useState(false);

	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [spots, setSpots] = useState(0);
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [imageLinkExists, setImageLinkExists] = useState(false);
	const [signUpAllowed, setSignUpAllowed] = useState(false);

	const [isEditing, setIsEditing] = useState(false);

	const { id } = useParams();

	const [loading, setLoading] = useState(id ? true : false);

	useEffect(() => {
		if (id) {
			setIsEditing(!!id); // Sets editing mode based on whether `id` is presen
			getModule(id)
				.then((module) => {
					setTitle(module.title);
					setImagePreview(module.image_url);
					setCategory(module.category);
					setSpots(module.spots);
					setSignUpAllowed(module.signUpAllowed);
					setImageLinkExists(true);
					if (state.length === 0) {
						dispatch({ type: "init", payload: module.content });
					}
					setLoading(false);
				})
				.catch(() => {
					setLoading(false);
				});
		}
	}, [id]);

	// Memoized callback to add items, wrapped in a function to prevent unnecessary re-renders
	const addItem = useCallback(
		(item) => () => dispatch({ type: "add", payload: item }),
		[dispatch]
	);

	// Function to edit items, supports editing nested list items
	function editItem(outerIndex, innerIndex = null, isList = false) {
		return (e) => {
			if (isList) {
				const updatedContent = [...state[outerIndex].content];
				updatedContent[innerIndex] = e.target.value;
				dispatch({
					type: "edit",
					payload: {
						index: outerIndex,
						value: { ...state[outerIndex], content: updatedContent }
					}
				});
			} else {
				const value = e.target.value;
				dispatch({
					type: "edit",
					payload: {
						index: outerIndex,
						value: { ...state[outerIndex], content: value }
					}
				});
			}
		};
	}

	// Function to add a new list item
	function addListItem(index) {
		const newContent = [...state[index].content, ""];
		dispatch({
			type: "edit",
			payload: {
				index,
				value: { ...state[index], content: newContent }
			}
		});
	}

	// Function to delete a list item
	function deleteListItem(outerIndex, innerIndex) {
		const newContent = state[outerIndex].content.filter(
			(_, i) => i !== innerIndex
		);
		dispatch({
			type: "edit",
			payload: {
				index: outerIndex,
				value: { ...state[outerIndex], content: newContent }
			}
		});
	}

	// Function to delete an item
	function deleteItem(index) {
		return () => dispatch({ type: "remove", payload: index });
	}

	const moveItem = useCallback(
		(fromIndex, toIndex) => {
			dispatch({
				type: "move",
				payload: { from: fromIndex, to: toIndex }
			});
		},
		[dispatch]
	);

	function handleImageChange(e) {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const img = new Image();
				img.src = reader.result;
				img.onload = () => {
					if (img.height > 550) {
						alert(
							"Image height exceeds the maximum allowed height."
						);
					} else {
						setImage(file);
						setImagePreview(reader.result); // Set image preview
					}
				};
			};
			reader.readAsDataURL(file);
			setImageLinkExists(false);
		}
	}

	function handleButton() {
		if (!title || !category || state.length === 0) {
			alert("Vul een titel, categorie, en/of content in.");
			return;
		}

		// Use a flag to control the flow
		let shouldStop = false;

		state.forEach((item) => {
			if (shouldStop) return;

			if (item.content === "") {
				alert("Vul content in.");
				shouldStop = true;
				return;
			}

			if (item.type === "unorderedList" || item.type === "orderedList") {
				item.content.forEach((listItem) => {
					if (shouldStop) return;

					if (listItem === "") {
						alert("Vul lijst content in.");
						shouldStop = true;
					}
				});
			}
		});

		if (shouldStop) return;

		if (!isEditing && !imageLinkExists && !image) {
			alert("Please upload an image.");
			return;
		}

		const module = {
			ModuleId: id,
			title,
			category,
			spots,
			signUpAllowed,
			content: state
		};

		function handleModuleUpdate(base64Image) {
			if (base64Image) {
				module.image = base64Image;
			}
			isEditing ? updateModule(module) : postModule(module);
		}

		if (!imageLinkExists && image) {
			const reader = new FileReader();
			reader.onload = () =>
				handleModuleUpdate(reader.result.split(",")[1]); // Split metadata from base64 string
			reader.readAsDataURL(image);
		} else {
			handleModuleUpdate(imageLinkExists);
		}
	}

	function handleDelete() {
		deleteModule(id, title);
	}

	if (
		!loggedIn &&
		userGroup !== "administrators" &&
		userGroup !== "moderators"
	) {
		return (
			<div className="flex w-full flex-col items-center justify-center py-60">
				<div className="flex w-2/3 flex-col items-center justify-center gap-20 sm:w-96">
					<h1 className="text-2xl">Geen toegang</h1>
				</div>
			</div>
		);
	}

	if (loading)
		return (
			<div className="flex h-screen w-screen items-center justify-center text-3xl">
				Laden...
			</div>
		);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex w-full flex-col items-center justify-center px-6 py-8 *:text-grc-brown">
				<div className="flex flex-col items-start md:max-w-[825px]">
					<Link
						to={`/keuzemodulen${isEditing ? `/${id}` : ""}`}
						className="mb-5 flex gap-3 text-xs font-bold uppercase"
					>
						<img src={arrow} alt="Foto pijl terug" />
						{isEditing ? (
							<span>Terug naar keuzemodule</span>
						) : (
							<span>Terug naar overzicht</span>
						)}
					</Link>
					<input
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Titel"
						value={title}
						className={`mb-9 w-full px-2 text-4xl ${showBorder && "border"} rounded text-grc-brown`}
					/>
					<div className="mb-10 w-full overflow-hidden border md:mb-20 md:max-h-[550px] md:max-w-[825px]">
						<label className="flex min-h-28 w-full cursor-pointer items-center justify-center overflow-hidden rounded border-dashed border-gray-400">
							<input
								onChange={handleImageChange}
								type="file"
								accept="image/*"
								className="hidden"
							/>
							{imagePreview ? (
								<img src={imagePreview} alt="Banner" />
							) : (
								<span>Upload Image</span>
							)}
						</label>
					</div>
					<div className="mb-12 flex flex-col gap-2 sm:mb-10 sm:w-full sm:flex-row sm:justify-between">
						<label className="flex flex-row gap-1 text-grc-light-brown sm:text-end">
							<span className="w-full text-nowrap sm:w-min">
								Categorie:
							</span>
							<input
								onChange={(e) => setCategory(e.target.value)}
								value={category}
								placeholder="Sport"
								className="h-fit w-60 rounded border border-gray-400 px-2 text-grc-brown"
							/>
						</label>
						<div className="flex flex-col gap-2">
							<label className="flex flex-row gap-1 text-grc-light-brown sm:text-end">
								<span className="w-full text-nowrap">
									Beschikbare plekken:
								</span>
								<input
									onChange={(e) => setSpots(e.target.value)}
									value={signUpAllowed ? spots : 0}
									disabled={!signUpAllowed}
									placeholder="0"
									type="number"
									min={0}
									className="h-fit w-12 rounded border border-gray-400 text-center text-grc-brown"
								/>
							</label>
							<label className="flex items-center justify-between sm:mr-1 sm:justify-normal sm:self-end">
								Aanmeldingen toegestaan:
								<input
									onChange={() =>
										setSignUpAllowed(!signUpAllowed)
									}
									checked={signUpAllowed}
									type="checkbox"
									className="ml-2 size-4"
								/>
							</label>
						</div>
					</div>
					<ul className="w-full">
						{state.map((item, index) => (
							<InputType
								key={index}
								item={item}
								index={index}
								moveItem={moveItem}
								deleteItem={deleteItem}
								editItem={editItem}
								addListItem={addListItem}
								deleteListItem={deleteListItem}
								showBorder={showBorder}
							/>
						))}
					</ul>
					<div className="mb-4 flex w-full items-center justify-center">
						<button
							onClick={addItem({
								type: "header",
								content: ""
							})}
							className="mr-2 rounded-md border border-grc-dark-blue p-2 last:mr-0"
							title="Nieuwe Koptekst"
						>
							<LuHeading1 className="size-6" />
						</button>
						<button
							onClick={addItem({
								type: "paragraph",
								content: ""
							})}
							className="mr-2 rounded-md border border-grc-dark-blue p-2 last:mr-0"
							title="Nieuwe Paragraaf"
						>
							<LuText className="size-6" />
						</button>
						<button
							onClick={addItem({
								type: "unorderedList",
								content: [""]
							})}
							className="mr-2 rounded-md border border-grc-dark-blue p-2 last:mr-0"
							title="Nieuwe Lijst"
						>
							<LuList className="size-6" />
						</button>
						<button
							onClick={addItem({
								type: "orderedList",
								content: [""]
							})}
							className="mr-2 rounded-md border border-grc-dark-blue p-2 last:mr-0"
							title="Nieuwe Genummerde Lijst"
						>
							<LuListOrdered className="size-6" />
						</button>
						<button
							onClick={() => setShowBorder(!showBorder)}
							className="mr-2 rounded-md border border-grc-dark-blue p-2 last:mr-0"
							title="Border aan/uitzetten"
						>
							<RxBorderAll className="size-6" />
						</button>
					</div>
					<div className="flex w-full flex-col justify-center gap-4 md:flex-row">
						<button
							onClick={handleButton}
							className="flex h-12 w-36 items-center justify-center self-center rounded-md bg-grc-blue px-10 text-sm uppercase text-white duration-300 hover:brightness-75"
						>
							{isEditing ? "Opslaan" : "Aanmaken"}
						</button>
						{isEditing && (
							<button
								onClick={handleDelete}
								className="flex h-12 w-36 items-center justify-center self-center rounded-md bg-grc-red px-10 text-sm uppercase text-white duration-300 hover:brightness-75"
							>
								Verwijderen
							</button>
						)}
					</div>
				</div>
			</div>
		</DndProvider>
	);
}

export default Upsert;
