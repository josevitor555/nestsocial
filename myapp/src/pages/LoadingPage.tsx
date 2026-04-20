import BrandLogo from '../components/styled-components/BrandLogo';

const LoadingPage = () => {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 overflow-hidden">

            {/* Pulsing Circular Background Aura */}
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-primary/25 via-transparent to-accent/25 rounded-full blur-[100px] animate-pulse-bg z-0"></div>

            <div className="relative z-10 flex flex-col items-center">

                {/* Extra layer of glow for depth */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/10 rounded-full blur-[60px] z-0"></div>

                <div className="relative z-10 flex flex-col items-center gap-8">
                    <BrandLogo size={90} />

                    <div className="flex flex-col items-center gap-2 text-center">
                        <h2 className="text-2xl font-semibold text-foreground transition-all duration-700 animate-in fade-in slide-in-from-bottom-4">
                            NestSocial
                        </h2>
                        <p className="text-base font-medium text-muted-foreground/60 animate-in fade-in slide-in-from-bottom-2 delay-300">
                            Loading your experience...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;
