"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputFormik from "../input/input-formik";
import Button from "../button/button";

const validationSchema = Yup.object({
	name: Yup.string()
		.required("Ім'я є обов'язковим")
		.min(2, "Ім'я повинно містити хоча б 2 символи")
		.max(50, "Ім'я не повинно перевищувати 50 символів"),
	email: Yup.string()
		.required("Email є обов'язковим")
		.email("Введіть коректний email"),
	question: Yup.string().required("Запитання є обов'язковим"),
});

export default function CallToActionForm() {
	return (
		<Formik
			initialValues={{ name: "", email: "", question: "" }}
			validationSchema={validationSchema}
			validateOnBlur={false}
			validateOnChange={false}
			onSubmit={(values) => console.log("Form submitted:", values)}>
			<Form className="mb-6">
				<div className="mb-6">
					<div className="flex flex-col w-full gap-6 mb-6 sm:flex-row sm:w-[80%]">
						<InputFormik name="name" placeholder="Ім'я" />
						<InputFormik name="email" placeholder="Email" />
					</div>
					<InputFormik
						name="question"
						placeholder="Залиште своє запитання тут"
						as="textarea"
						className="min-h-[8rem]"
					/>
				</div>
				<Button className="w-full mt-4 sm:w-[60%]">Надіслати</Button>
			</Form>
		</Formik>
	);
}
