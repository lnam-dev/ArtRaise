import { useState, useEffect } from 'react';

interface ArtPiece {
  id: number;
  title: string;
  price: number;
  style: string;
  size: string;
  image_artpiece: string;
  author: { id: number; fullname: string };
}

export function useAllArtPieces() {
  const [allArtPieces, setAllArtPieces] = useState<ArtPiece[]>([]); // Типізація стану

  useEffect(() => {
    async function fetchArtPieces() {
      try {
        const response = await fetch('http://localhost:8000/api/artpieces/'); // Запит для всіх картин
        const data = await response.json();

        // Нормалізуємо формат даних
        const formattedData: ArtPiece[] = data.map((piece: any) => ({
          id: piece.id,
          title: piece.title,
          price: parseFloat(piece.price), // Конвертуємо у число
          style: piece.style,
          size: `${parseFloat(piece.length_cm)} x ${parseFloat(
            piece.width_cm
          )} см`, // Форматування розміру
          image_artpiece: `${piece.image_artpiece}`,
          author: { id: piece.author.id, fullname: piece.author.fullname }, // Виправлено
        }));

        setAllArtPieces(formattedData);
        console.log('all data', formattedData);
      } catch (error) {
        console.error('Error fetching art pieces:', error);
      }
    }

    fetchArtPieces();
  }, []); // Порожній масив для запуску лише при першому рендері

  return { allArtPieces };
}
