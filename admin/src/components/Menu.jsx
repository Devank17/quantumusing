import React from 'react';
import { MdSpaceDashboard } from "react-icons/md";
import { FaGoogleScholar } from "react-icons/fa6";
import { ImBlogger } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";
import { Link, useLocation } from 'react-router-dom';
import Logout from './Logout';
import menuLinks from '../assets/menuLinks.json';

const Icons = {
  MdSpaceDashboard,
  FaGoogleScholar,
  ImBlogger,
  FaUsers,
};

const Menu = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const location = useLocation();

    return (
        <div className="sticky h-screen top-0 z-50">
            <div
                className={`bg-white/10 backdrop-blur-lg border-r border-white/10 text-white ${
                    isExpanded ? "w-64" : "w-20"
                } h-screen transition-all duration-300 ease-in-out flex flex-col shadow-2xl`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                {/* Header */}
                <div className="p-5 flex items-center justify-center border-b border-white/10">
                    <span className="text-2xl font-bold flex items-center space-x-2">
                        {!isExpanded && <TiThMenuOutline className="text-3xl text-cyan-300" />}
                        {isExpanded && <span className="text-xl tracking-wide text-cyan-300">Admin Menu</span>}
                    </span>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col mt-6 space-y-2">
                    {menuLinks.map((link, index) => {
                        const IconComponent = Icons[link.icon];
                        const isActive = location.pathname === link.to;

                        return (
                            <Link
                                key={index}
                                to={link.to}
                                className={`group flex items-center space-x-4 py-3 px-5 mx-2 rounded-lg transition-all duration-300 ${
                                    isActive
                                        ? "bg-cyan-700/40 text-cyan-300"
                                        : "hover:bg-white/10 text-white/80"
                                }`}
                            >
                                <IconComponent className="text-2xl group-hover:scale-110 transition-transform duration-300 text-cyan-300" />
                                {isExpanded && (
                                    <span className="text-md font-medium tracking-wide">
                                        {link.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-auto mb-5 ml-2">
                    <Logout />
                </div>
            </div>
        </div>
    );
};

export default Menu;
