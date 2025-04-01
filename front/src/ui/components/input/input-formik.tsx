import { Formik, Field, Form, ErrorMessage } from "formik";
import Input from "./input";

interface InputProps {
	name: string;
	type?: string;
	placeholder?: string;
	className?: string;
	as?: "input" | "textarea"; // Додано підтримку textarea
}

const InputFormik: React.FC<InputProps> = ({
	name,
	type = "text",
	placeholder,
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
								as === "textarea" ? "h-full resize-none  py-2" : "h-14 py-4"
							} ${className}`}
							{...props}
						/>
					);
				}}
			</Input>
			<ErrorMessage
				name={name}
				component="div"
				className="font-fixel font-normal text-3 text-error px-3 absolute bottom-[-1.3rem]"
			/>
		</div>
	);
};

export default InputFormik;
