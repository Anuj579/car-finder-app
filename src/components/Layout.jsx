import React from 'react'
import Navbar from './Navbar'

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen dark:bg-zinc-900">
            <Navbar />
            <main>{children}</main>
        </div>
    )
}

export default Layout