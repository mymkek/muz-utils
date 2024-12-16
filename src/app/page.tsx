"use client";
import Link, {LinkProps} from 'next/link'
import {Card} from "@/app/shared/ui";


export default function Home() {
    const navItems: Array<{ path: LinkProps["href"], label: string }> = [
        {path: '/apps/scales-playground', label: 'Scales playground'},
        {path: '/apps/chords-playground', label: 'Chords playground'},
        {path: '/apps/metronome', label: 'Metroome'},
        {path: '/apps/polymetronome', label: 'Polyrhythms'},
        {path: '/apps/rhythm-trainer', label: 'Rhythm trainer'},
        {path: '/apps/velocity-recorder', label: 'Velocity Recorder'},
    ];

    return (
        <div style={{display: "grid", gap: 16, gridTemplateColumns: 'repeat(3, 1fr)'}}>
            {navItems.map((item, index) =>
                <Link key={index} href={item.path}>
                    <Card>
                        {item.label}
                    </Card>
                </Link>
            )}

        </div>
    );
}
