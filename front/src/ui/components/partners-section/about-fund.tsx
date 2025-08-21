import SegmentTitle from "../segment-title/segment-title";
import Image from "next/image";
import { FC } from "react";

type PartnersSectionProps = React.HTMLAttributes<HTMLElement>;


const AboutFund: FC<PartnersSectionProps> = ({
	className = "",
	...props
}) => {
	return (
		<section className={className} {...props}>
			<SegmentTitle
				className="mb-10"
				link={{ to: "/", name: `всі наші партнери` }}>
				Про фонд
			</SegmentTitle>
			<div className="grid grid-cols-1 gap-8 items-center sm:grid-cols-2">
				<div className="relative w-full aspect-[16/9]">
					<Image
						className="object-cover"
						src="/partners-image.png"
						alt="a partners image"
						fill
					/>
				</div>
				<div>
					<span className="font-fixel text-5 font-normal mb-[0.375rem]">
						м. Львів, Україна
					</span>
					<h3 className="font-namu text-8 leading-[1.125] mb-4">
						Молодіжний простір Львівської національної академії мистецтв
					</h3>
					<p className="font-fixel text-4 font-normal">
						Галерея ЛНАМ – це мистецький простір, створений з метою підтримки
						творчих ініціатив студентської молоді. Сучасно обладнана галерея
						повинна стати повноцінним осередком культурно-мистецького життя
						міста, бути своєрідним інкубатором авторських проектів студентів і
						випускників академії.
					</p>
				</div>
			</div>
		</section>
	);
};

export default AboutFund;
