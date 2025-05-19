import Chewron from "~/assets/chevron-slider.svg";

export default function SliderNavButton({ variable = "left", ...props }) {
	let style;
	switch (variable) {
		case "left":
			style = "";
			break;
		case "right":
			style = "-rotate-180";
			break;
	}

	return (
		<button className="all-unset px-7 py-2" {...props}>
			<Chewron height="44" width="44" className={style} />
		</button>
	);
}
