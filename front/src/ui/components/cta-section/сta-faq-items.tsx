import Head from "next/head";
import FAQitem from "../faq-item/faq-item";
import Link from "next/link";

interface FAQData {
	question: string;
	answer: string;
}

export default function CallToActionFAQItems(): JSX.Element {
	const faqData: FAQData[] = [
		{
			question:
				"Чи є можливість отримати додаткову інформацію про художника та його творчий шлях?",
			answer:
				"Так, багато платформ надають інформацію про художника, його біографію та попередні роботи. Деякі також дозволяють зв'язатися з художником безпосередньо для отримання додаткової інформації.",
		},
		{
			question:
				"Як я можу перевірити автентичність та якість мистецького твору перед покупкою?",
			answer:
				"На платформі ArtRaise ми надаємо гарантію автентичності кожного твору мистецтва. Кожна картина проходить перевірку на автентичність, а також має сертифікат, що підтверджує її оригінальність.",
		},
		{
			question:
				"Які умови повернення та обміну застосовуються до мистецьких творів, придбаних онлайн?",
			answer:
				"Ми пропонуємо політику повернення протягом 14 днів з моменту отримання товару, якщо він не відповідає вашим вимогам або має дефекти. Повернення здійснюється за рахунок покупця, якщо товар відповідає умовам повернення.",
		},
		{
			question: "Що таке ArtRaise",
			answer:
				"ArtRaise — це маркетплейс для покупки картин та різного мерча від Львівської Академії мистецтв. Ми пропонуємо унікальні твори мистецтва, створені талановитими студентами та викладачами Академії, а також різноманітний мерч, пов'язаний з мистецтвом та культурою.",
		},
	];

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqData.map(({ question, answer }) => ({
			"@type": "Question",
			name: question,
			acceptedAnswer: { "@type": "Answer", text: answer },
		})),
	};

	return (
		<section>
			<Head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
				/>
			</Head>

			{faqData.map(({ question, answer }) => (
				<FAQitem key={question} question={question} answer={answer} />
			))}

			<Link className="font-fixel font-normal text-4 text-gray-950" href="/">
				Більше
			</Link>
		</section>
	);
}
