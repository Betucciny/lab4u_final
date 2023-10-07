import * as React from 'react';

function Header() {
    return (
        <div className="header--container">
            <p>Header</p>
        </div>
    )
}

function Footer() {
    return (
        <div className="footer--container">
            <p>
                Footer
            </p>
        </div>
    )
}


function MainLayout({children}) {
    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}

export {MainLayout, Footer}