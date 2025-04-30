import Link from "next/link";
import usePath from "~/ui/hooks/usePath";

export default (props: any & { children: React.ReactNode }) => {
	const { prefetch, to, ...rest } = props;
	const path = usePath();

	return (
		<Link {...rest} href={to ? path(to) : "#"}>
			{props.children}
		</Link>
	);
};
