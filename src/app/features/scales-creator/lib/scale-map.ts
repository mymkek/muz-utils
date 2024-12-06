import {KeyboardKeyItem} from "@/app/entities/instruments/piano/model/keyboard-map";

export const generateScaleKeysMap = (key: string, intervals: Array<number>, notesMap: KeyboardKeyItem[]) => {
    if (!key || !intervals) return;

    const output = [...notesMap.map(i => ({...i, enabled: false}))];
    const firstKeyIndex = notesMap.findIndex(item => item.note == key);
    const maxKeyIndex = notesMap.length - 1;

    let currentIndex = firstKeyIndex;

    output[firstKeyIndex].enabled = true;

    while (currentIndex <= maxKeyIndex) {
        intervals.forEach(num => {
            currentIndex += num;
            if(output[currentIndex]) {
                output[currentIndex].enabled = true;
            }
        })
    }

    currentIndex = firstKeyIndex;

    while (currentIndex > -1) {
        [...intervals].reverse().forEach(num => {
            currentIndex -= num;
            if(output[currentIndex]) {
                output[currentIndex].enabled = true;
            }
        })
    }

    return output;
}
