import React from 'react'
import {getInitials} from "../../utils/helper.js";

const CharAvatar = ({fullName, style, width, height}) => {
    return <div
        className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
        {getInitials(fullName || "")}
    </div>
};

export default CharAvatar;