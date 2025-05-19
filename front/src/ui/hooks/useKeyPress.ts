import { useEffect } from "react";

const useKeyPress = (key: string, callback: () => void) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === key) callback();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [key, callback]);
};

export default useKeyPress;
