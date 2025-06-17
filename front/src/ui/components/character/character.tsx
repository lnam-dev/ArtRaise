interface CharacterProps {
	title: string;
	value: string | number;
	className?: string;
}

const Character = ({ title, value, className, ...props }: CharacterProps) => {
	return (
		<div
			className={`font-fixel pb-3 lg:pb-4 border-bottom ${className}`}
			{...props}>
			<span className="font-normal text-gray-700 text-[0.875rem] xl:text-4">
				{title}
			</span>
			<p className="font-medium text-base text-black text-4 xl:text-5">
				{value}
			</p>
		</div>
	);
};

export default Character;
