import React from 'react';
import {TArtPiece} from "~/types";
import ImageWithFallback from "~/ui/components/imageWithFallback/image-with-fallback";
import SegmentTitle from "~/ui/components/segment-title/segment-title";
import CallToActionSection from "~/ui/components/cta-section/cta-section";

interface Props {
    artpiece: TArtPiece
}


const CertificatePage: React.FC<Props> = ({artpiece}) => {
    return (
        <div className={"container mx-auto mt-14 lg:mt-18 xl:mt-[5rem] mobile-spacing"}>
            <div
                className={
                    "font-namu grid grid-cols-4  mt-20 gap-x-[1rem] w-full h-fit auto-rows-auto"
                }>
                <aside
                    className={"flex flex-col w-full col-span-3 md:col-span-1 h-fit mt-auto"}>
                    <ImageWithFallback
                        className="h-auto w-full object-cover max-h-[40vh] object-center"
                        src={artpiece.author.image_author}
                        alt="Author"
                        fallbackSrc={'/default.png'}
                    />
                    <div
                        className={
                            "flex flex-col bottom-0 left-0 col-span-3 z-10 w-fit bg-white pr-2.5 "
                        }>
                        <h1
                            className={
                                "flex font-bold text-8 w-fit md:text-10 md:text-nowrap"
                            }>
                            {'Сертифікат автентичності'}
                        </h1>
                        <div
                            className={"font-thin text-black text-8 hidden md:block w-full"}>
                            <h2 className={""}> {`Для твору ${artpiece.title}`}</h2>
                        </div>
                    </div>
                </aside>
                <div className={"flex md:col-span-3 h-full max-h-full"}>
                    <ImageWithFallback
                        src={artpiece.image_artpiece}
                        alt={"art photo"}
                        fallbackSrc={'/default.png'}
                        className={
                            "object-cover w-full h-full md:col-span-3 max-h-[60vh]"
                        }></ImageWithFallback>
                </div>
            </div>
            <SegmentTitle className={'my-5 md:mt-10'}>Сертифікат</SegmentTitle>
            <ImageWithFallback
                className="h-auto w-full max-h-[50rem] object-cover mx-auto mb-10 object-center"
                src={artpiece.certificate}
                alt="Author"
                fallbackSrc={'/default.png'}
            />
            <CallToActionSection/>
        </div>
    );
};

export default CertificatePage;
