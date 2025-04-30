declare module "*.svg" {
	import * as React from "react";
	const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	export { ReactComponent };
}

declare module "*.module.scss" {
	const classes: { [key: string]: string };
	export default classes;
}
