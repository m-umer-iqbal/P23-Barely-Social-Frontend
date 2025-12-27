import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div
            className="
        fixed bottom-0 left-0 right-0
        bg-dark-blue-900 
        border-t border-off-blue-200
        flex justify-around items-center
        h-14
        lg:hidden
        z-50"
        >
            {/* Profile */}
            <button
                onClick={() => navigate("/profile")}
                className={`flex flex-col items-center gap-1 text-xs font-semibold transition
          ${isActive("/profile")
                        ? "text-off-blue-200"
                        : "text-off-blue-200 hover:text-off-blue-200"
                    }
        `}
            >
                <span className="text-xl">👤</span>
                Profile
            </button>

            {/* Home */}
            <button
                onClick={() => navigate("/home")}
                className={`flex flex-col items-center gap-1 text-xs font-semibold transition
          ${isActive("/")
                        ? "text-off-blue-200"
                        : "text-off-blue-200 hover:text-off-blue-200"
                    }
        `}
            >
                <span className="text-xl">🏠</span>
                Home
            </button>

            {/* Users */}
            <button
                onClick={() => navigate("/profile")}
                className={`flex flex-col items-center gap-1 text-xs font-semibold transition
          ${isActive("/profile")
                        ? "text-off-blue-200"
                        : "text-off-blue-200 hover:text-off-blue-200"
                    }
        `}
            >
                <span className="text-xl">👥</span>
                People
            </button>
        </div>
    );
};

export default BottomNavbar;
