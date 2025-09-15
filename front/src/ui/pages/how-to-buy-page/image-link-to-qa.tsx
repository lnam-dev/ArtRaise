import React from 'react';
import Image from "next/image";
import Link from "next/link";

type Props = {}

const ImageLinkToQA: React.FC<Props> = ({}) => {
    return (
        <div className="col-span-full flex relative items-center justify-center md:justify-start">
            <Image
                src={"/kozlov_store.jpg"}
                height={200}
                width={1500}
                alt={"IMAGE"}
                className={"bg-red/30 w-full min-h-60"}
            />
                <Link
                    href="https://friendsoflnaa.org"
                    className="
                  absolute flex
                  mx-4 md:ml-[10%]
                  justify-center
                  bg-gray-950/80 backdrop-blur
                  py-6 px-4
                  text-white/80 tracking-wider
                  w-auto md:w-[500px] lg:w-[650px] xl:w-[800px] items-center gap-[28px] flex-row
                "
                >

                    <div className='flex gap-3 flex-col'>
                        <p className="text-4 md:text-6">Друзі ЛНАМ</p>
                        <p className="text-5 md:text-8">Офіційний сайт фонду</p>
                        <p className="text-3 md:text-4 font-medium">Тицяй сюди якщо шукаєш більше</p>
                    </div>

                    <Image src={"/arrow.svg"} alt={'arrow'} height={32}
                           width={32}/>
                </Link>


        </div>
    )
        ;
};

export default ImageLinkToQA;
