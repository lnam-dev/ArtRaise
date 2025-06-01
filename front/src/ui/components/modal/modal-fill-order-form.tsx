"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputFormik from "../input/input-formik";
import ButtonArrow from "../button/button-arrow";

const validationSchema = Yup.object({
	firstName: Yup.string()
		.required("Ім'я є обов'язковим")
		.min(2, "Ім'я повинно містити хоча б 2 символи")
		.max(50, "Ім'я не повинно перевищувати 50 символів"),
	lastName: Yup.string()
		.required("Прізвище є обов'язковим")
		.min(2, "Прізвище повинно містити хоча б 2 символи")
		.max(50, "Прізвище не повинно перевищувати 50 символів"),
	phone: Yup.string()
		.required("Телефон є обов'язковим")
		.matches(/^\+?[0-9]{10,14}$/, "Введіть коректний номер телефону"),
	email: Yup.string()
		.required("Email є обов'язковим")
		.email("Введіть коректний email"),
	question: Yup.string(),
});

export default function ModalFillOrderForm({ className = "" }) {
	return (
		<Formik
			initialValues={{
				firstName: "",
				lastName: "",
				phone: "",
				email: "",
				question: "",
			}}
			validationSchema={validationSchema}
			validateOnBlur={false}
			validateOnChange={false}
			onSubmit={(values) => console.log("Form submitted:", values)}>
			<Form>
				<h1 className="font-namu text-8 leading-9 mb-7">
					Заповніть форму для <br />
					оформлення вашого замовлення:
				</h1>
				<div className={`space-y-5 w-full ${className}`}>
					<div className="flex flex-row gap-5">
						<InputFormik name="firstName" placeholder="Ім'я" />
						<InputFormik name="lastName" placeholder="Прізвище" />
					</div>

					<InputFormik name="email" placeholder="Email" />
					<InputFormik name="phone" placeholder="Телефон" />
				</div>
				<h1 className="font-namu text-8 leading-9 mb-7">
					Якщо є питання — надамо <br /> відповідь на Ваш email
				</h1>
				<div className="mb-9">
					<InputFormik
						name="question"
						placeholder="Залиште своє запитання тут"
						as="textarea"
						className="min-h-[8rem]"
					/>
				</div>
				<ButtonArrow className="w-full">Надіслати</ButtonArrow>
			</Form>
		</Formik>
	);
}
