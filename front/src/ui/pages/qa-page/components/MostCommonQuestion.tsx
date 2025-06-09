import React from 'react';
import Image from "next/image";
import Link from "next/link";
import usePath from "~/ui/hooks/usePath";

type Props = {
}

const MostCommonQuestion: React.FC<Props> = ({  }) => {
    const makePath = usePath();
  return (
      <div className="col-span-full flex relative  items-center justify-center md:justify-start overflow-x-hidden">
          <Image src={"/QA/QAPageBackGround.png"} height={200} width={1500} alt={"IMAGE"}
                 className={"bg-red/30 object-cover"}/>
          <Link  href={makePath("/how-to-buy")}
              className={"absolute flex flex-col mx-4 md:ml-[10%] justify-center bg-gray-950 py-6 px-4 gap-3 text-white/80 tracking-wider"}>
              <p className={"text-4 md:text-6"}>Звісно, найчастіше питання:</p>
              <p className={"text-5 md:text-8"}>« Як купити картину? »</p>
              <p className={"text-3 md:text-4 font-medium"}>Тицяй сюди якщо не знаєш як придбати товар!</p>
          </Link>
      </div>
  );
};

export default MostCommonQuestion;
