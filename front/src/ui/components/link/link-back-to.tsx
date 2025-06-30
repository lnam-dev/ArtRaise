import Link from "~/bridge/ui/Link";
import ArrowBackTo from "~/assets/arrow-back.svg";

type LinkBackToProps = {
	path: string;
	children: string;
	className?: string;
};

const LinkBackTo = ({ path, children, className }: LinkBackToProps) => {
	return (
		<Link to={path} className={`flex items-center gap-2 ${className}`}>
			<ArrowBackTo className="fill-gray-950" height={32} width={32} />
			<span className="font-fixel font-normal text-4 text-gray-950">
				{children}
			</span>
		</Link>
	);
};

export default LinkBackTo;
