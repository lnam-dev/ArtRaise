import ArrowExpand from "~/assets/arrow-expand.svg";

export default function SliderButtonExpand({ className = "" }) {
	return (
		<div
			className={`flex bg-[#000212] shadow-sm bg-opacity-[64%] ${className}`}>
			<button className="all-unset p-3">
				<ArrowExpand height="24" width="24" />
			</button>
		</div>
	);
}
