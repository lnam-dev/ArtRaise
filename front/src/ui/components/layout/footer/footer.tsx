"use client";
import Link from "~/bridge/ui/Link";
import ArrowInsert from "~/assets/arrow-insert.svg";
import LnaaLogo from "~/assets/lnaa-logo.svg";
import FriendsLnaaLogo from "~/assets/friends-logo.svg";
import DepartmentGDLogo from "~/assets/department-gd-logo.svg";

export const Footer = () => {
	return (
		<footer className="w-full mt-[5rem] bg-black-1000 text-white">
			<div className="container mx-auto mobile-spacing">
				<div className="flex justify-between">
					{/* Logo Section */}
					<div className="flex-1 items-center">
						<h2 className="2xl:text-[8vw] xl:text-[10vw] lg:text-[8vw] lg:text-left md:text-[10vw] text-[16vw] font-fixel font-bold leading-none text-white text-center">
							ARTRAISE©
						</h2>
					</div>
					{/* Contact */}
					<div className="lg:flex flex-col xl:text-[1.25rem] ml-[1rem] space-y-1 font-namu text-gray-300 hidden">
						<Link to="mailto:friendsofinaa@gmail.com">
							friendsofinaa@gmail.com
						</Link>
						<p>+380 98 859 39 00</p>
						<Link to="/">Instagram</Link>
						<Link to="/">Facebook</Link>
						<Link to="/">Telegram</Link>
					</div>
				</div>

				<div className="flex lg:gap-12 gap-10 pt-6 ">
					{/* Львівська нац. академія мистецтв */}
					<div className="flex items-center gap-3 ">
						<LnaaLogo className="w-auto h-auto" />
						<p className="lg:flex self-center leading-tight font-museo hidden">
							Львівська <br />
							національна академія <br />
							мистецтв
						</p>
					</div>

					{/* Благодійний фонд */}
					<div className="flex items-center gap-3">
						<FriendsLnaaLogo className="w-auto h-auto" />
						<p className="lg:block self-center font-museo tracking-tight hidden">
							Благодійний фонд <br />
							<span className="font-extrabold">
								Друзі <br />
								Львівської національної <br />
								академії мистецтв
							</span>
						</p>
					</div>

					{/* Кафедра графічного дизайну */}
					<div className="flex items-center gap-3">
						<DepartmentGDLogo className="w-auto h-auto" />
						<p className="lg:flex self-center font-museo leading-tight hidden">
							Кафедра <br />
							Графічного <br />
							дизайну
						</p>
					</div>
				</div>

				{/* Navigation */}
				<div className="flex flex-col items-start lg:flex-row lg:flex-1 lg:justify-between lg:items-center lg:mt-10 sm:mt-[0.625rem] font-namu">
					<Link
						className="xl:text-[2rem] lg:text-[1.75rem] lg:text-white text-grayCustom"
						to="/">
						Хто ми є?
					</Link>
					<Link className="text-gray-300 pt-3" to="/">
						Про нас
					</Link>
					<Link className="text-gray-300 pt-3" to="/">
						Зв’язатися з нами
					</Link>
					<Link className="text-gray-300 pt-3" to="/">
						Довідник колекціонера
					</Link>
					<Link className="text-gray-300 pt-3" to="/">
						Збір на мистецтво
					</Link>
				</div>

				<div className="lg:hidden py-[1.25rem] text-white">
					<Link to="mailto:friendsofinaa@gmail.com">
						friendsofinaa@gmail.com
					</Link>
					<p>+380 98 859 39 00</p>
				</div>

				<div className="flex justify-between items-center mt-3 py-3 border-t-1 lg:border-t-2 lg:mt-8 lg:pt-3 lg:pb-3 border-gray-300/50">
					<div className="flex lg:gap-[6rem]">
						<p className="lg:h-[1rem] lg:text-[0.875rem] lg:tracking-[-5%] lg:opacity-50 font-namu text-gray-300">
							© {new Date().getFullYear()}, ArtRaise Services.
						</p>
						<p className="lg:flex lg:h-[1rem] lg:text-[0.875rem] font-namu text-gray-300/50 hidden">
							All Rights Reserved
						</p>
					</div>

					<div className="flex items-center lg:gap-[9rem]">
						<Link
							className="flex items-center gap-1 lg:flex lg:h-[1.25rem] lg:text-[1rem] text-gray-300 hidden"
							to=""
							onClick={(e: any) => {
								e.preventDefault();
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							Догори
							<ArrowInsert />
						</Link>
						<p className="lg:flex lg:mr-[6rem] lg:h-[1rem] lg:text-[0.875rem] text-gray-300/50 font-namu hidden">
							Design by &lt;5
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};
