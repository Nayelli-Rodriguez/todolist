import React from 'react';

const Layout = ({children}) => {
    return (
        <div className='w-full flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 relative'>
            <main className='container min-h-screen mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center px-3'>
                <section className='hidden lg:block w-1/2'>
                    <img className='w-full' src="/images/tasks.png" alt="" />
                </section>
                <section className='w-full lg:w-1/2'>
                    { children }
                </section>
            </main>
        </div>
    );
};

export { Layout };