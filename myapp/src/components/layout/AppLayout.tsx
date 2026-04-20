import React from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">

            {/* Container principal centralizado */}
            <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12 pointer-events-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr_320px] gap-8 items-start">

                    {/* Zona 1: Identity Sidebar */}
                    <div className="hidden lg:block">
                        <LeftSidebar />
                    </div>

                    {/* Zona 2: Main Feed / Content */}
                    <main className="min-h-[500px]">
                        {children}
                    </main>

                    {/* Zona 3: Discovery/Trending Sidebar */}
                    <div className="hidden lg:block">
                        <RightSidebar />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AppLayout;
