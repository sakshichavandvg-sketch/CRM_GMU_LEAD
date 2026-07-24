import React from 'react';
import CRMGlassOverlay from '../crm/CRMGlassOverlay';
import { kpiTheme } from '../../styles/theme/kpi';

export default function DashboardCard({
    title,
    value,
    subtitle,
    type,
}) {
    const color =
        type === "success"
            ? "text-emerald-400"
            : type === "warning"
                ? "text-orange-400"
                : type === "danger"
                ? "text-rose-400"
                : "text-white/70";

    return (
        <div
            className="
                group relative overflow-hidden
                rounded-2xl
                p-6
                transition-all duration-250 ease-out
                hover:-translate-y-[3px]
                [box-shadow:var(--shadow-base)]
                hover:[box-shadow:var(--shadow-hover)]
            "
            style={{ 
                background: kpiTheme.gradients.maroon, 
                border: kpiTheme.borders.glass,
                '--shadow-base': kpiTheme.shadows.kpiBase,
                '--shadow-hover': kpiTheme.shadows.kpiHover
            }}
        >
            <CRMGlassOverlay />

            <div className="relative z-10">
                <p className="text-xs uppercase tracking-wide text-white/80">
                    {title}
                </p>

                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    {value}
                </h2>

                <p className={`mt-3 text-sm font-medium ${color}`}>
                    {subtitle}
                </p>
            </div>
        </div>
    );
}