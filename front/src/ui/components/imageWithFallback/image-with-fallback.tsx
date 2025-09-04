'use client';

import React, { useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
    fallbackSrc: string;
};

export default function ImageWithFallback({ fallbackSrc,alt, src, ...props }: Props) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <img
            {...props}
            alt = {alt}
            src={imgSrc || fallbackSrc}
            onError={() => {
                setImgSrc(fallbackSrc)
            }}
        />
    );
}
