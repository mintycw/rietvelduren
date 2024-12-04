import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/landing/Landing";
import Form from "./pages/form/Form";
import Overview from "./pages/modulesOverview/Overview";
import { Routes, Route } from "react-router-dom";
import ModuleInfo from "./pages/module/ModuleInfo";
import Upsert from "./components/crud/Upsert";
import Login from "./pages/admin/Login";
import AuthProvider from "./contexts/AuthProvider";
import ContentProvider from "./contexts/ContentProvider";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSignUp from "./pages/admin/AdminSignUp";

function App() {
	return (
		<AuthProvider>
			<ContentProvider>
				<Header />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/keuzemodulen">
						<Route index element={<Overview />} />
						<Route path=":id" element={<ModuleInfo />} />
						<Route path=":id/bijwerken" element={<Upsert />} />
					</Route>
					<Route path="/form" element={<Form />} />
					<Route path="/aanmaken" element={<Upsert />} />
					<Route path="/admin">
						<Route index element={<Login />} />
						<Route path="dashboard" element={<AdminDashboard />} />
						<Route
							path="accountcreatie"
							element={<AdminSignUp />}
						/>
					</Route>
				</Routes>
				<Footer />
			</ContentProvider>
		</AuthProvider>
	);
}

export default App;
