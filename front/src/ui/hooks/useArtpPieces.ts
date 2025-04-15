'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface ArtPiece {
  id: number;
  imageSrc: string;
  price: number;
  title: string;
  certificate: string;
  author: {
    id: number;
    fullname: string;
    bio_text: string;
    image_author: string;
  };
  material: string;
  theme: string;
  style: string;
  creating_date: string;
  size: string;
  description: string;
}

export const useArtPiece = () => {
  const { id } = useParams();
  const [artPiece, setArtPiece] = useState<ArtPiece | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchArtPiece = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/artpieces/${id}/`
        );
        if (response.data) {
          setArtPiece({
            id: response.data.id,
            author: {
              id: response.data.author?.id,
              fullname: response.data.author?.fullname || 'Невідомий автор',
              bio_text: response.data.author?.bio_text || '',
              image_author: `http://localhost:8000${response.data.author?.image_author}`,
            },
            imageSrc: response.data.image_artpiece,
            certificate: response.data.certificate,
            price: response.data.price ? parseFloat(response.data.price) : 0,
            title: response.data.title || 'Без назви',
            material: response.data.material,
            theme: response.data.theme,
            style: response.data.style,
            creating_date: response.data.creating_date,
            size: `${parseFloat(response.data.length_cm) || '?'} см x ${
              parseFloat(response.data.width_cm) || '?'
            } см`,
            description: response.data.description,
          });
        }
      } catch (error) {
        console.error('Помилка при завантаженні твору мистецтва:', error);
      }
    };

    fetchArtPiece();
  }, [id]);

  return { artPiece };
};
