import React from "react";

const ToggleTabs = ({ options, active, setActive, minWidth }) => {
    const width = minWidth + "%"
    console.log(width)
    return (
        <div className="bg-off-blue-200 flex justify-around gap-2 font-semibold sticky top-0 z-10 min-w-full p-2">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    style={{ minWidth: `${minWidth}%` }}
                    className={`p-1.5 cursor-pointer rounded-4xl border-2 border-dark-blue-900 group 
                    ${active === opt.value
                            ? "bg-dark-blue-900 text-off-blue-200"
                            : "text-dark-blue-900 hover:bg-dark-blue-900 hover:text-off-blue-200"
                        }`}
                    onClick={() => setActive(opt.value)}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
};

export default ToggleTabs;