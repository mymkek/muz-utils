'use client';

import {useEffect, useRef, useState} from "react";


let currentBar = 0;
let currentBarMemo = 0;
let isStarted = false;
type LinearChartProps = {
    min: number;
    max: number;
    marks: Array<{
        label: string,
        value: number
    }>;
    data: Array<number>;
}

export default function LinearChart({
                                        min,
                                        max,
                                        marks,
                                        data
                                    }: LinearChartProps) {
    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [rectWidth, setRectWidth] = useState(10);
    let animationFrameId;
    const width = 800;
    const height = 500;
    const barsCount = width / rectWidth;
    const heightCoef = height / max;

    const drawMarks = (marks: LinearChartProps["marks"], ctx: CanvasRenderingContext2D) => {
        marks.forEach((mark) => {
            ctx.beginPath();
            ctx.moveTo(0, mark.value);
            ctx.lineTo(rectWidth, mark.value);
            ctx.fillRect(0, height - mark.value * heightCoef, width, 1);
            ctx.font = "12px serif";
            ctx.fillText(mark.label, 10, height - 5 - mark.value * heightCoef);
        })
    }

    const draw = (ctx, frameCount) => {

        if (currentBar === currentBarMemo && isStarted) return;
        isStarted = true;
        currentBarMemo = currentBar;

        ctx.clearRect(0, 0, width, height);
        //вертикальные линии
        ctx.fillStyle = "#aaaaaa";
        ctx.strokeStyle = "#44ff6f"
        drawMarks(marks, ctx)
        console.log('draw')
        ctx.fillStyle = "#f364a1";

        ctx.beginPath();

        for (let i = currentBar, j = 0; i < currentBar + barsCount; i++, j++) {
            const x = j * rectWidth; // Координата X текущего прямоугольника
            const y = height - (data[i] * heightCoef); // Координата Y текущего прямоугольника


            // Если это не первый прямоугольник, соединяем линией с предыдущим
            if (i > currentBar) {
                const prevX = (j - 1) * rectWidth; // X предыдущего прямоугольника
                const prevY = height - (data[i - 1] * heightCoef); // Y предыдущего прямоугольника

                ctx.beginPath();
                ctx.moveTo(prevX + rectWidth / 2, prevY); // Центр предыдущего прямоугольника
                //ctx.lineTo(x + rectWidth / 2, y); // Центр текущего прямоугольника
                ctx.stroke();
                ctx.beginPath();
                ctx.bezierCurveTo(prevX + rectWidth / 2, prevY, x, y, x + rectWidth / 2, y);
                ctx.stroke()
            }
        }

    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const context = canvas.getContext('2d');
        let frameCount = 0;


        const scrollListener = (e) => {
            if (e.deltaY > 0) {
                currentBar = currentBar + 3;
                //console.log("Колесо мыши прокручивается вниз");
            } else if (e.deltaY < 0) {
                if (currentBar > 0) {
                    currentBar = currentBar - 3;
                }
                //console.log("Колесо мыши прокручивается вверх");
            }
        };


        container?.addEventListener("wheel", scrollListener);


        const render = () => {
            frameCount++;
            draw(context, frameCount);
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            container.removeEventListener("wheel", scrollListener);
        }
    }, [draw, rectWidth]);


    const updateScale = () => {
        console.log(rectWidth)
        setRectWidth(prevState => prevState + 1);
    }

    const minusScale = () => {
        console.log(rectWidth)
        if (rectWidth > 1)
            setRectWidth(prevState => prevState - 1);
    }

    console.log('render')
    return (
        <div
            ref={containerRef}
            style={{
                overflow: "auto",
                position: "relative",
            }}
        >
            <div style={{display: 'flex', justifyContent: "flex-end"}}>
                <button onClick={updateScale}>+</button>
                <button onClick={minusScale}>-</button>
            </div>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{display: "block"}}
            />
        </div>
    );
};
