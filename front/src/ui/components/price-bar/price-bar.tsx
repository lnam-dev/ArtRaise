import Buy from "~/assets/buy.svg";
import Button from "../button/button";

interface PriceBarProps extends React.HTMLAttributes<HTMLElement> {
	title: string;
	price: string;
	href?: string;
}

const PriceBar = ({ title, price, href, ...props }: PriceBarProps) => {
	return (
		<div {...props}>
			<h4 className="font-fixel font-normal text-3 xl:text-4 text-gray-700">
				{title}
			</h4>
			<p className="font-namu text-8  xl:text-12 leading-none mb-6">{`₴${parseInt(
				price
			)}`}</p>
			<Button href={href}>Придбати</Button>
		</div>
	);
};

export default PriceBar;
