import React, { createContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ContentContext = createContext();

function ContentProvider(props) {
	const [modules, setModules] = useState([]);

	const navigate = useNavigate();

	function postModule(module) {
		fetch(
			"https://do9tpepl85.execute-api.eu-central-1.amazonaws.com/Dev/module-management/postModule",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(module)
			}
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.status === 200) {
					alert("Module aangemaakt");
					navigate("/keuzemodulen");
				}
			});
	}

	function updateModule(module) {
		fetch(
			"https://do9tpepl85.execute-api.eu-central-1.amazonaws.com/Dev/module-management/updateModule",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(module)
			}
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.status === 200) {
					alert("Module aangepast");
					setTimeout(() => navigateTo("keuzemodulen"), 1000); // Navigate after 1 second (to allow for the state to update)
				}
			});
	}

	function navigateTo(path) {
		navigate(path);
		navigate(0);
	}

	function getModule(moduleId) {
		return fetch(
			"https://do9tpepl85.execute-api.eu-central-1.amazonaws.com/Dev/module-management/getModule?ModuleId=" +
				moduleId,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data) {
					setModules(data);
				}
				return data;
			});
	}

	function getModules() {
		fetch(
			"https://do9tpepl85.execute-api.eu-central-1.amazonaws.com/Dev/module-management/getModules",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data) {
					setModules(data);
				}
			});
	}

	function deleteModule(moduleId, title) {
		if (
			window.confirm(
				"Weet je zeker dat je de module " + title + " wilt verwijderen?"
			)
		) {
			fetch(
				"https://do9tpepl85.execute-api.eu-central-1.amazonaws.com/Dev/module-management/deleteModule",
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ moduleId: moduleId })
				}
			)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					if (data.status === 200) {
						alert("Module verwijderd");
						navigateTo("/keuzemodulen");
					}
				});
		}
	}

	function postRegistration(data) {
		fetch(
			"https://do9tpepl85.execute-api.eu-central-1.amazonaws.com/Dev/registration-management/postRegistration",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			}
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.status === 200) {
					alert("Geregristreerd");
					navigate("/");
				}
			});
	}

	const value = useMemo(
		() => ({
			postModule,
			updateModule,
			getModules,
			getModule,
			deleteModule,
			postRegistration,
			modules
		}),
		[modules]
	);

	return (
		<ContentContext.Provider value={value}>
			{props.children}
		</ContentContext.Provider>
	);
}

export default ContentProvider;
