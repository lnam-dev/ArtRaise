interface CharacterProps {
	title: string;
	value: string | number;
	className?: string;
}

const Character = ({ title, value, className, ...props }: CharacterProps) => {
	return (
		<div className={`font-fixel pb-4 border-bottom ${className}`} {...props}>
			<span className="font-normal text-gray-700 text-3 xl:text-4">
				{title}
			</span>
			<p className="font-medium text-black text-4 xl:text-5">{value}</p>
		</div>
	);
};

export default Character;
