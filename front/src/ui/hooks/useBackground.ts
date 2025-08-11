import { useEffect } from "react";

function useBackground(theme: "light" | "dark") {
	useEffect(() => {
		const root = document.documentElement;

		const colorVar = theme === "dark" ? "var(--bg-dark)" : "var(--bg-light)";
		root.style.setProperty("--bg-color", colorVar);

		return () => {
			root.style.setProperty("--bg-color", "var(--bg-light)");
		};
	}, [theme]);
}

export default useBackground;
