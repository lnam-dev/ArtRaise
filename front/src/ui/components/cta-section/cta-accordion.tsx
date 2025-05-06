import Accordion from "../accordion/accordion";
import Link from "~/bridge/ui/Link";
import Script from "next/script";
import { TAccordion } from "~/types/accordion";

const QuestionAndAnswer: TAccordion[] = [
	{
		title:
			"Чи є можливість отримати додаткову інформацію про художника та його творчий шлях?",
		content:
			"Так, багато платформ надають інформацію про художника, його біографію та попередні роботи. Деякі також дозволяють зв'язатися з художником безпосередньо для отримання додаткової інформації.",
	},
	{
		title:
			"Як я можу перевірити автентичність та якість мистецького твору перед покупкою?",
		content:
			"На платформі ArtRaise ми надаємо гарантію автентичності кожного твору мистецтва. Кожна картина проходить перевірку на автентичність, а також має сертифікат, що підтверджує її оригінальність.",
	},
	{
		title:
			"Які умови повернення та обміну застосовуються до мистецьких творів, придбаних онлайн?",
		content:
			"Ми пропонуємо політику повернення протягом 14 днів з моменту отримання товару, якщо він не відповідає вашим вимогам або має дефекти. Повернення здійснюється за рахунок покупця, якщо товар відповідає умовам повернення.",
	},
	{
		title: "Що таке ArtRaise",
		content:
			"ArtRaise — це маркетплейс для покупки картин та різного мерча від Львівської Академії мистецтв. Ми пропонуємо унікальні твори мистецтва, створені талановитими студентами та викладачами Академії, а також різноманітний мерч, пов'язаний з мистецтвом та культурою.",
	},
];

export default function CallToActionAccordion() {
	const schema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: QuestionAndAnswer.map(({ title, content }) => ({
			"@type": "Question",
			name: title,
			acceptedAnswer: { "@type": "Answer", text: content },
		})),
	};

	return (
		<div className="space-y-6">
			<Script
				id="faq-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>

			{QuestionAndAnswer.map(({ title, content }) => (
				<Accordion key={title} title={title}>
					{content}
				</Accordion>
			))}
			<div>
				<Link
					className="font-fixel font-normal text-4 text-gray-950 box-border"
					href="#">
					Більше
				</Link>
			</div>
		</div>
	);
}
