"use client"
import {useState} from "react";
import {ScaleData, scales} from "@/app/features/scales-creator/model/scales-map";
import {notes} from "@/app/shared/lib/notes";
import {Note} from "@/app/shared/lib/common-types";


export const ChooseScaleForm = () => {

    const [selectedScale, setSelectedScale] = useState<ScaleData | null>(null);
    const [selectedKey, setSelectedKey] = useState<Note | null>(null);

    const handleChangeScale = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.value;
        setSelectedScale(scales[parseInt(selectedIndex)]);
    };

    const handleChangeKey = (event: React.ChangeEvent<HTMLSelectElement>) => {}

    return (
        <>
            <div>
                <label htmlFor="scale-select">Choose a scale:</label>
                <select id="scale-select" onChange={handleChangeScale} defaultValue="">
                    <option value="" disabled>
                        Select a scale
                    </option>
                    {scales.map((scale, index) => (
                        <option key={index} value={index}>
                            {scale.name}
                        </option>
                    ))}
                </select>

                {selectedScale && (
                    <div>
                        <h2>Selected Scale: {selectedScale.name}</h2>
                        <p>Intervals: {selectedScale.intervals.join(' - ')}</p>
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="scale-select">Choose a scale:</label>
                <select id="scale-select" onChange={handleChangeKey} defaultValue="">
                    <option value="" disabled>
                        Select a key
                    </option>
                    {notes.map((key, index) => (
                        <option key={index} value={index}>
                            {key}
                        </option>
                    ))}
                </select>

                {selectedScale && (
                    <div>
                        <h2>Selected Scale: {selectedScale.name}</h2>
                        <p>Intervals: {selectedScale.intervals.join(' - ')}</p>
                    </div>
                )}
            </div>
        </>
    );
};
