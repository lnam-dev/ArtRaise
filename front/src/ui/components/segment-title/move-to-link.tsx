"use client";

import Link from "~/bridge/ui/Link";
import Arrow from "~/assets/arrow-right.svg";

interface MoveToLinkProps {
	to: string;
	name: string;
}

export function MoveToLink({ to, name }: MoveToLinkProps) {
	return (
		<Link to={to} className="font-fixel text-4 font-medium">
			<span className="mr-2 hidden sm:inline-block">{name}</span>
			<Arrow className="inline-block" height={24} width={24} />
		</Link>
	);
}
