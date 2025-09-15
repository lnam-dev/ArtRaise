import React, {ReactNode} from 'react';
import {TArtPiece} from "~/types";
import ImageWithFallback from "~/ui/components/imageWithFallback/image-with-fallback";
import Image from "next/image";
import CallToActionSection from "~/ui/components/cta-section/cta-section";
import CardPurchase from "~/ui/components/card/card-purchase";
import LinkBackToPrevious from "~/ui/components/link/link-back-to-previous";

interface Props {
}

const ContainerWithTitle: React.FC<{ title: string, children: ReactNode }> = ({title, children}) => {
    return (
        <div className={'flex flex-col mb-5'}>
            <h3 className={'response-text-6 mb-5 font-medium'}>{title}</h3>
            {children}
        </div>
    )
}
const AboutFundPage: React.FC<Props> = () => {

    const imgUrls = [
        "/aboutfund/1.png",
        "/aboutfund/2.png",
        "/aboutfund/3.png",
    ]
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
                        src={'/aboutfund/topimg.png'}
                        alt="Author"
                        fallbackSrc={'/default.png'}
                    />
                    <section className={'absolute bottom-0 left-0 bg-white pr-12 md:col-span-2 pt-3'}>
                        <h1 className={'response-text-8'}>{"Про фонд"}</h1>
                        <h2 className={'response-text-4'}>{"Благодійний Фонд \"Друзі ЛНАМ\""}</h2>
                    </section>
                </div>
                <div className={'col-span-full md:col-span-2 lg:col-span-3 flex flex-col gap-5'}>
                    <p className={'mt-5 mb-2'}>{"Львівська національна академія мистецтв планувала 2022 рік для прориву в розвитку. Війна відтермінувала плани, але війна не має і не буде ставати на заваді місії Академії.\n" +
                        "Тому в липні 2022 року ми створили Благодійний Фонд «Друзі Львівської національної академії мистецтв», який сприятиме реалізації Стратегії розвитку ЛНАМ через фінансування освітніх, мистецьких, дослідницьких, комунікаційних, інфраструктурних програм. Ключовою роллю Фонду є фандрейзинг та фінансування проектів розвитку Академії, впливаючи на вибір ініціатив та форматів діяльності. Фонд виходить на культурний фронт і творитиме історію прориву. "}</p>
                    <h3 className={'font-medium text-7 my-4'}>{"Програми Благодійного фонду «Друзі ЛНАМ»"}</h3>
                    <ContainerWithTitle title={"Програма підтримки студентів та аспірантів"}>
                        <ul className={'[&>li]:pl-2 list-disc marker:text-3 ml-6 [&>li]:py-1'}>
                            <li>{'Стипендії на навчання та проживання в ЛНАМ'}</li>
                            <li>{'Підтримка студентської та аспірантської мобільності'}</li>
                            <li>{'Підтримка здоров’я студентів (здорове харчування, спортивна активність, ментальне здоров’я, допомога в кризових ситуаціях)'}</li>
                            <li>{'Розвиток креативного підприємництва (бізнес-інкубатор, підтримка старт-апів)'}</li>
                            <li>{'Підтримка проєктів студентського самоврядування, розвиток клубних форматів'}</li>
                        </ul>
                    </ContainerWithTitle>
                    <ContainerWithTitle title={"Програма покращення умов навчання та проживання студентів"}>
                        <ul className={'[&>li]:pl-2 [&>li]:py-1 list-disc marker:text-3 ml-6'}>
                            <li>{'Оновлення будівель та освітнього простору (безпека, функціональність, інклюзивність, розвиток академмістечка)'}</li>
                            <li>{'Покращення умов проживання в гуртожитках'}</li>
                            <li>{'Збереження та ревіталізація культурної спадщини'}</li>
                            <li>{'Закупівля обладнання і матеріалів для мистецької освіти'}</li>
                            <li>{'Оплата роботи натурників'}</li>
                            <li>{'Підтримка цифровізації процесів'}</li>
                        </ul>
                    </ContainerWithTitle>
                    <ContainerWithTitle title={"Програма підтримки викладачів та персоналу"}>
                        <ul className={'[&>li]:pl-2 [&>li]:py-1 list-disc marker:text-3 ml-6'}>
                            <li>{'Стипендії та погодинна оплата для гостьових викладачів'}</li>
                            <li>{'Підтримка академічної, творчої та наукової мобільності викладачів'}</li>
                            <li>{'Навчання та розвиток викладачів та персоналу (англійська мова, викладацька майстерність, універсальні навички)'}</li>
                        </ul>
                    </ContainerWithTitle>
                    <ContainerWithTitle title={"Програма підтримки мистецьких, наукових і комунікаційних проектів"}>
                        <ul className={'[&>li]:pl-2 [&>li]:py-1 list-disc marker:text-3 ml-6'}>
                            <li>{'Стипендії та погодинна оплата для гостьових викладачів'}</li>
                            <li>{'Підтримка академічної, творчої та наукової мобільності викладачів'}</li>
                            <li>{'Навчання та розвиток викладачів та персоналу (англійська мова, викладацька майстерність, універсальні навички)'}</li>
                        </ul>
                    </ContainerWithTitle>
                    <ContainerWithTitle title={"Програма енергозбереження"}>
                        <ul className={'[&>li]:pl-2 [&>li]:py-1 list-disc marker:text-3 ml-6'}>
                            <li>{'Підтримка енергоаудиту та енергоменеджменту'}</li>
                            <li>{'Модернізація будівель та обладнання'}</li>
                            <li>{'Використання відновлювальних джерел енергії'}</li>
                            <li>{'Сортування, ресайклінг та апсайклінг сміття'}</li>
                        </ul>
                    </ContainerWithTitle>
                    <p>{'Долучайтесь, запрошуйте своїх друзів, випускників і партнерів Академії на сторінку, діліться нашими новинами!'}</p>
                </div>
                <aside className={'hidden md:col-span-2 lg:col-span-1 md:block overflow-x-hidden'}>
                    <p className={'response-text-8'}>{"Фотографії"}</p>
                    {
                        imgUrls.slice(0, 3).map((url, index) => (
                            <ImageWithFallback className={'w-full md:mb-4'} src={url} fallbackSrc={'/default.jpg'}/>))
                    }
                </aside>
                <div className={'col-span-full mt-10'}>
                    <p className={'response-text-8'}>{"Фотографії"}</p>
                    <div className={
                        "flex gap-5 overflow-x-auto pt-5 md:hidden col-span-full"
                    }>
                        {
                            imgUrls.slice(0, 3).map((url, index) => (
                                <ImageWithFallback className={'w-full md:mb-4'} src={url} fallbackSrc={'/default.jpg'}/>))
                        }
                    </div>
                </div>
                <CallToActionSection className={'col-span-full'}/>
            </div>
        </div>
    );
};

export default AboutFundPage;
