import React, { Children, cloneElement, ReactNode } from "react";
import { TBreadcrumbsLinkProps } from "~/types/breadcrumbs";
import Chevron from "~/assets/chevron-link.svg";

interface BreadcrumbsWrapperProps extends React.HTMLAttributes<HTMLElement> {
	children: ReactNode;
	activeIndex: number;
}

const BreadcrumbsWrapper = React.memo(
	({ children, activeIndex, ...props }: BreadcrumbsWrapperProps) => {
		const childrenCount = Children.count(children);

		return (
			<nav {...props}>
				<ul className="flex items-center gap-2 list-none xl:pl-0">
					{Children.map(children, (child: ReactNode, index: number) => {
						const isActive = index === activeIndex;

						return (
							<>
								<li key={index}>
									{cloneElement(
										child as React.ReactElement<TBreadcrumbsLinkProps>,
										{ isActive }
									)}
								</li>
								{index < childrenCount - 1 && (
									<Chevron className="stroke-gray-500" height={20} width={20} />
								)}
							</>
						);
					})}
				</ul>
			</nav>
		);
	}
);

export default BreadcrumbsWrapper;
