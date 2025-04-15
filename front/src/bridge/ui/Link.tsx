import Link from "next/link";
import { useAppContext } from "~/ui/app-context/provider";

export default (props: any & { children: React.ReactNode }) => {
	const { prefetch, to, ...rest } = props;
	return (
		<Link {...rest} href={to}>
			{props.children}
		</Link>
	);
};
