"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useModal } from "../../../hooks/useModal";
import ModalOrderSuccess from "./modal-order-success";

import InputFormik from "../../input/input-formik";
import ButtonArrow from "../../button/button-arrow";

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
export default function ModalOrderFillForm({ className = "" }) {
	const { showModal } = useModal();

	const handleSubmitForm = () => {
		showModal(<ModalOrderSuccess />);
	};

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
			validateOnChange={true}
			onSubmit={handleSubmitForm}>
			{({ isValid, dirty }) => (
				<Form className="flex flex-col h-full justify-between">
					<div className="overflow-y-scroll h-[65vh] sm:h-full sm:overflow-y-auto pb-7 scrollbar-hide">
						<h1 className="font-namu text-6 xl:text-8 leading-9 mb-4 xl:mb-7">
							Заповніть форму для <br />
							оформлення вашого замовлення:
						</h1>
						<div className={`space-y-4 xl:space-y-6 w-full ${className}`}>
							<div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
								<InputFormik name="lastName" placeholder="Прізвище" />
								<InputFormik name="firstName" placeholder="Ім'я" />
							</div>
							<InputFormik name="email" placeholder="Email" />
							<InputFormik name="phone" placeholder="Телефон" />
						</div>
						<h1 className="font-namu text-6 xl:text-8leading-9 mb-4 xl:mb-7">
							Якщо є питання — надамо <br /> відповідь на Ваш email
						</h1>
						<InputFormik
							name="question"
							placeholder="Залиште своє запитання тут"
							as="textarea"
							className="w-full min-h-[6rem]"
						/>
					</div>
					<ButtonArrow
						className="w-full mt-1"
						variant={isValid && dirty ? "dark" : "disabled"}
						type="submit">
						Надіслати
					</ButtonArrow>
				</Form>
			)}
		</Formik>
	);
}
