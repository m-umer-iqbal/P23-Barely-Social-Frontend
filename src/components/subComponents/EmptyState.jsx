import React from "react";

const EmptyState = ({ title, subtitle, emoji = "🫧" }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-3 py-10 text-dark-blue-700">
            <span className="text-4xl">{emoji}</span>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm max-w-xs">{subtitle}</p>
        </div>
    );
};

export default EmptyState;
