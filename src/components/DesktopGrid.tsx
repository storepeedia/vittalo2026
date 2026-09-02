import React from 'react';

export function DesktopGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
        </div>
    );
}
