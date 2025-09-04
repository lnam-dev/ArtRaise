"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import InputFormik from "../input/input-formik";
import ButtonArrow from "../button/button-arrow";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (
    values: { name: string; email: string; question: string },
    { resetForm }: any
  ) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}faq/questions/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        resetForm();
      } else {
        console.error("❌ Помилка відправки:", response.status);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("❌ Помилка мережі:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", question: "" }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={true}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
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

          {submitStatus === "success" && (
            <div className="p-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded">
              ✅ Ваше запитання успішно надіслано! Ми зв'яжемося з вами
              найближчим часом.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
              ❌ Сталася помилка. Спробуйте ще раз або зв'яжіться з нами іншим
              способом.
            </div>
          )}

          <ButtonArrow
            className="w-full mt-4 sm:w-[60%]"
            variant={isValid && dirty && !isSubmitting ? "dark" : "disabled"}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Надсилаємо..." : "Надіслати"}
          </ButtonArrow>
        </Form>
      )}
    </Formik>
  );
}
