import React from 'react';

// For desktop we need a regular grid of the original items.
// Since the user wants to keep desktop exactly as it was:
export function DesktopGrid({ items, renderItem }: { items: any[], renderItem: (item: any) => React.ReactNode }) {
    return (
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
                <div key={item.id || index}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
}
