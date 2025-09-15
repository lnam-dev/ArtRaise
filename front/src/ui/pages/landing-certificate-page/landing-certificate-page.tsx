import React, {ReactNode} from 'react';
import {TArtPiece} from "~/types";
import ImageWithFallback from "~/ui/components/imageWithFallback/image-with-fallback";
import Image from "next/image";
import CallToActionSection from "~/ui/components/cta-section/cta-section";
import CardPurchase from "~/ui/components/card/card-purchase";
import LinkBackToPrevious from "~/ui/components/link/link-back-to-previous";

interface Props {
    artpiecesWithCertificate: TArtPiece[]
}

const ContainerWithTitle: React.FC<{ title: string, children: ReactNode }> = ({title, children}) => {
    return (
        <div className={'flex flex-col'}>
            <h3 className={'response-text-6 mb-5 font-semibold'}>{title}</h3>
            {children}
        </div>
    )
}
const LandingCertificatePage: React.FC<Props> = ({artpiecesWithCertificate}) => {
    return (
        <div className={"container mx-auto mt-14 lg:mt-18 xl:mt-[5rem] mobile-spacing"}>
            <LinkBackToPrevious className={'mt-20 mb-10'}/>
            <div
                className={
                    "font-namu grid grid-cols-4 gap-x-[1rem] w-full h-fit auto-rows-auto"
                }>
                <div className={'relative col-span-full mb-10'}>
                    <ImageWithFallback
                        className="h-auto w-full object-cover max-h-[40vh] object-center"
                        src={'/certificate_top.webp'}
                        alt="Author"
                        fallbackSrc={'/default.png'}
                    />
                    <section className={'absolute bottom-0 left-0 bg-white pr-12 md:col-span-2 pt-3'}>
                        <h1 className={'response-text-8'}>{"Сертифікат автентичності"}</h1>
                        <h2 className={'response-text-4'}>{"Офіційний доказ цінності та оригінальності твору мистецтва"}</h2>
                    </section>
                </div>
                <div className={'col-span-full md:col-span-2 lg:col-span-3 flex flex-col gap-5'}>
                    <ContainerWithTitle title={"Що це таке?"}>
                        <p>{'Сертифікат автентичності — це офіційний документ, який підтверджує, що ваш твір мистецтва є оригіналом, створеним саме тим автором, чиє ім’я він носить. Це своєрідний “паспорт” роботи, який зберігається разом із нею протягом усього життя.'}</p>
                    </ContainerWithTitle>
                    <ContainerWithTitle title={"Що містить сертифікат?"}>
                        <ul className={'[&>li]:pl-2 list-disc marker:text-3 ml-6 [&>li]:py-1'}>
                            <li>Ім’я автора</li>
                            <li>Назву твору</li>
                            <li>Рік створення</li>
                            <li>Опис техніки та матеріалів</li>
                            <li>Розміри роботи</li>
                            <li>Фото твору для ідентифікації</li>
                            <li>Підпис автора або офіційної галереї</li>
                        </ul>
                    </ContainerWithTitle>
                    <ContainerWithTitle title={"Навіщо він потрібен?"}>
                        <ul className={'[&>li]:pl-2 [&>li]:py-1 list-disc marker:text-3 ml-6'}>
                            <li>Підтвердження оригінальності — гарантія, що твір створений саме цим автором, а не є
                                копією.
                            </li>
                            <li>Підвищення цінності — роботи з підтвердженим походженням оцінюються значно дорожче.</li>
                            <li>Захист від підробок — унеможливлює незаконне відтворення чи продаж підробок.</li>
                            <li>Легкість перепродажу — якщо ви коли-небудь вирішите продати роботу, сертифікат стане
                                важливим аргументом для покупця.
                            </li>
                            <li>Частина історії твору — сертифікат зберігає дані, які можуть бути важливими для
                                майбутніх поколінь.
                            </li>
                        </ul>
                    </ContainerWithTitle>
                    <ContainerWithTitle title={"Як виглядає?"}>
                        <h3>
                            {'Сертифікат автентичності може бути у друкованому або цифровому форматі. Він оформлюється на фірмовому бланку, містить унікальний номер і підпис автора чи представника галереї.'}
                        </h3>
                        <p className={'my-14'}>💡 Пам’ятайте: ніколи не втрачайте сертифікат<br/>— це ключ до доведення
                            справжності вашого твору!</p>
                        <div className="relative col-span-full h-[400px]">
                            <Image
                                src="/certificate_of_page.png"
                                alt="Certificate"
                                fill
                                className="object-contain mx-auto"
                            />
                        </div>
                        <p className={'opacity-40 md:mt-10'}>{'Зображення створене для демонстрації та не є оригінальним сертифікатом'}</p>
                    </ContainerWithTitle>
                </div>
                <aside className={'hidden md:col-span-2 lg:col-span-1 md:block'}>
                    <p className={'response-text-6'}>{"Роботи з сертифікатом"}</p>
                    {
                        artpiecesWithCertificate.slice(0, 3).map((artpiece, index) => (
                            <CardPurchase key={artpiece.id} card={artpiece} className={'mt-10'}/>))
                    }
                </aside>
                <div className={'col-span-full mt-10 md:hidden'}>
                    <p className={'response-text-8'}>{"Роботи з сертифікатом"}</p>
                    <div className={
                        "flex gap-5 overflow-x-auto pt-5 col-span-full"
                    }>
                        {artpiecesWithCertificate.slice(0, 9).map((artpiece, index) => (
                            <CardPurchase key={artpiece.id} card={artpiece} className={'min-w-[80vw]'}/>
                        ))}
                    </div>
                </div>
                <CallToActionSection className={'col-span-full'}/>
            </div>
        </div>
    );
};

export default LandingCertificatePage;
