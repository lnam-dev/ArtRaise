"use client"
import React from 'react';
import Button from "~/ui/components/button/button";
import {redirect} from "next/navigation";
import ImageLinkToQA from "~/ui/pages/how-to-buy-page/image-link-to-qa";

type Props = {}

const StartBuySection: React.FC<Props> = ({}) => {
    return (
        <section className={"col-span-full gap-4"}>
            <Button className={"w-full md:w-[40%] mb-12"} onClick={() => redirect("/ua/search")}>Переглянути витвори</Button>
            <ImageLinkToQA/>
        </section>
    );
};

export default StartBuySection;
