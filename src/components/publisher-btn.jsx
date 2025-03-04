import React from 'react'

const PublisherBtn = ({ title, data }) => {
    return (
        <div className="border py-2 flex flex-col justify-center items-center rounded-lg border-gray-400 w-full">
            <p className="text-xs text-slate-400 dark:text-white">{title}</p>
            <p className="text-sm font-bold font-mono text-black dark:text-white h-10 mt-1 text-ellipsis overflow-hidden text-center">{data}</p>
        </div>
    )
}

export default PublisherBtn
