export type ScaleData = {
    name: string,
    intervals: number[]
}

export const scales: ScaleData[] = [
    {
        name: 'Natural Major',
        intervals: [2, 2, 1, 2, 2, 2, 1] // Ионийский лад
    },
    {
        name: 'Natural Minor',
        intervals: [2, 1, 2, 2, 1, 2, 2] // Эолийский лад
    },
    {
        name: 'Dorian',
        intervals: [2, 1, 2, 2, 2, 1, 2] // Дорийский лад
    },
    {
        name: 'Phrygian',
        intervals: [1, 2, 2, 2, 1, 2, 2] // Фригийский лад
    },
    {
        name: 'Lydian',
        intervals: [2, 2, 2, 1, 2, 2, 1] // Лидийский лад
    },
    {
        name: 'Mixolydian',
        intervals: [2, 2, 1, 2, 2, 1, 2] // Миксолидийский лад
    },
    {
        name: 'Locrian',
        intervals: [1, 2, 2, 1, 2, 2, 2] // Локрийский лад
    },
    {
        name: 'Harmonic Minor',
        intervals: [2, 1, 2, 2, 1, 3, 1] // Гармонический минор
    },
    {
        name: 'Melodic Minor Ascending',
        intervals: [2, 1, 2, 2, 2, 2, 1] // Мелодический минор восходящий
    },
    {
        name: 'Whole Tone',
        intervals: [2, 2, 2, 2, 2, 2] // Целотоновый лад
    },
    {
        name: 'Chromatic',
        intervals: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] // Хроматический лад
    }
];
