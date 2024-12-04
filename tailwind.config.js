/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"grc-blue": "#017BAC",
				"grc-red": "#EF3624",
				"grc-yellow": "#FFD500",
				"grc-dark-blue": "#072329",
				"grc-slate": "#3A3C56",
				"grc-light-gray": "#F4F2EF",
				"grc-gray": "#A5AFB1",
				"grc-brown": "#391400",
				"grc-light-brown": "rgba(57, 20, 0, 0.65)" // 65% opacity
			}
		}
	},
	plugins: []
};
