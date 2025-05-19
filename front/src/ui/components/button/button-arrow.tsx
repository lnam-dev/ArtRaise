import Arrow from "~/assets/arrow-right.svg";
import Button from "./button";
import { TButtonProps } from "~/types/button";
import classes from "./button.module.scss";

const ButtonArrow = ({ children, ...props }: TButtonProps) => {
	return (
		<Button {...props}>
			<span>{children}</span>
			<Arrow className={classes.arrow} width={32} height={32} />
		</Button>
	);
};

export default ButtonArrow;
