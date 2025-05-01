import { FC } from "react";
import Image from "next/image";
import SegmentTitle from "../segment-title/segment-title";
import ButtonArrow from "../button/button-arrow";

type CertificateSectionProps = React.HTMLAttributes<HTMLElement>;

const CertificateSection: FC<CertificateSectionProps> = ({
	className = "",
	...props
}) => {
	return (
		<section className={className} {...props}>
			<SegmentTitle className="mb-10">Сертифікати автентичності</SegmentTitle>
			<div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
				<div className="order-2 sm:order-1">
					<h2 className="font-namu text-8 leading-[1.125] mb-8">
						Немає кращого подарунка, ніж мистецтво, на весілля, ювілей,
						випускний чи іншу особливу подію.
					</h2>
					<ButtonArrow className="font-fixel font-medium text-4 w-full sm:w-3/4">
						Дізнатися більше
					</ButtonArrow>
				</div>
				<div className="order-1 sm:order-2 relative w-full aspect-[16/9]">
					<Image
						className="object-cover"
						src="/certificate-1.png"
						alt="A certificate image"
						fill
					/>
				</div>
			</div>
		</section>
	);
};

export default CertificateSection;
