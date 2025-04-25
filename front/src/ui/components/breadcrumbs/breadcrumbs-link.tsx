import Link from "~/bridge/ui/Link";
import { TBreadcrumbsLinkProps } from "~/types/breadcrumbs";

const BreadcrumbsLink = ({
	children,
	isActive = false,
	...props
}: TBreadcrumbsLinkProps) => {
	return (
		<Link
			className={`font-fixel font-light text-4 ${
				isActive ? "text-gray-950" : "text-gray-500"
			}`}
			{...props}>
			{children}
		</Link>
	);
};

export default BreadcrumbsLink;
