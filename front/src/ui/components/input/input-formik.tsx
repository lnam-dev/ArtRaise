import { Formik, Field, Form, ErrorMessage } from "formik";
import Input from "./input";

interface InputProps {
	name: string;
	type?: string;
	placeholder?: string;
	required?: boolean;
	className?: string;
	as?: "input" | "textarea";
}

const InputFormik: React.FC<InputProps> = ({
	name,
	type = "text",
	placeholder,
	required = false,
	className = "",
	as = "input",
	...props
}) => {
	return (
		<div className="flex flex-col w-full relative">
			<Input>
				{(style) => {
					return (
						<Field
							id={name}
							name={name}
							as={as}
							type={type}
							placeholder={placeholder}
							className={`${style} ${
								as === "textarea" && "w-full h-full resize-none py-2"
							} ${className}`}
							{...props}
						/>
					);
				}}
			</Input>
			<ErrorMessage
				name={name}
				component="div"
				className="font-fixel font-normal text-3 text-error px-3 absolute bottom-[-1.3rem] whitespace-nowrap"
			/>
		</div>
	);
};

export default InputFormik;
