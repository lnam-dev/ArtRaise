import SegmentTitle from "../segment-title/segment-title";
import CallToActionForm from "./cta-form";
import CallToActionFAQItems from "./сta-faq-items";

export default function CallToActionSection({
	className = "",
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<section className={className} {...props}>
			<SegmentTitle className="mb-10" />
			<div className="grid grid-cols-1 gap-12 items-center sm:grid-cols-[3fr_2fr]">
				<div>
					<h3 className="font-namu text-8 leading-[1.125] mb-4">
						Маєте питання?
						<br /> Ми готові допомогти
					</h3>
					<p className="font-fixel text-4 font-normal mb-10">
						Перегляньте наші поширені запитання праворуч. Якщо у вас все є
						запитання, зв’яжіться з нами або відвідайте наш довідковий центр.
					</p>
					<CallToActionForm />
				</div>
				<div>
					<CallToActionFAQItems />
				</div>
			</div>
		</section>
	);
}
