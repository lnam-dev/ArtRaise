import { MoveToLink } from "./move-to-link";

interface SegmentTitleProps {
	children?: string;
	link?: {
		to: string;
		name: string;
	};
	className?: string;
}

export default function SegmentTitle({
	children,
	link,
	className = "",
}: SegmentTitleProps) {
	return (
		<div
			className={`flex justify-between items-center h-12 border-bottom ${className}`}>
			<h3 className="text-5 lg:text-6 font-namu">{children}</h3>
			{link && <MoveToLink to={link.to} name={link.name} />}
		</div>
	);
}
