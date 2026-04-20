import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle2, ShieldCheck, User } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import BrandLogo from '@/components/styled-components/BrandLogo';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rememberMe: true,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: '' }));
        }
        setGeneralError('');
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            rememberMe: checked,
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setGeneralError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (formData.email === 'error@nestsocial.com') {
                throw new Error('Invalid credentials. Please try again.');
            }

            console.log('Login successful', formData);
            setGeneralError('Login successful! Redirecting...');

        } catch (err: any) {
            setGeneralError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-8 font-sans">
            {/* Outer Card Container */}
            <div className="flex w-full max-w-[1100px] flex-col overflow-hidden rounded-[2.5rem] border border-border/40 bg-card shadow-2xl md:flex-row min-h-[700px]">

                {/* Left Panel: Form Area */}
                <div className="flex w-full flex-col justify-center p-8 sm:p-12 md:w-1/2 lg:p-16">

                    {/* Brand/Logo */}
                    <div className="flex items-center gap-3 mb-16">
                        <BrandLogo size={40} />
                        <span className="text-2xl font-bold tracking-tight text-foreground">NestSocial</span>
                    </div>

                    {/* Welcome Copy */}
                    <div className="mb-10">
                        <h1 className="mb-3 text-4xl font-semibold tracking-tight text-foreground">
                            <span className='font-light'>Hello</span>,<br />Welcome Back
                        </h1>
                        <p className="text-base font-medium text-white/80">
                            Please enter your details to sign in to your account.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

                        {generalError && (
                            <div className={`rounded-xl p-4 text-sm font-medium border ${generalError.includes('successful')
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-destructive/10 text-destructive border-destructive/20'
                                }`}>
                                {generalError}
                            </div>
                        )}

                        <div className="flex flex-col gap-4">
                            <Input
                                id="name"
                                type="text"
                                label="Full Name"
                                placeholder="Enter your full name"
                                icon={User}
                                value={formData.name}
                                onChange={handleInputChange}
                                error={errors.name}
                            />

                            <Input
                                id="email"
                                type="email"
                                label="Email Address"
                                placeholder="Enter your email"
                                icon={Mail}
                                value={formData.email}
                                onChange={handleInputChange}
                                error={errors.email}
                            />

                            <Input
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="••••••••"
                                icon={Lock}
                                value={formData.password}
                                onChange={handleInputChange}
                                error={errors.password}
                            />

                        </div>

                        {/* Helper Row */}
                        <div className="flex items-center justify-between mt-1">
                            <Checkbox
                                id="rememberMe"
                                label="Remember me"
                                checked={formData.rememberMe}
                                onCheckedChange={handleCheckboxChange}
                            />
                            <button
                                type="button"
                                className="text-sm font-medium text-primary transition-colors hover:text-foreground hover:underline underline-offset-4"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Submit Action */}
                        <div className="mt-4">
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="h-12 text-base font-bold rounded-xl w-full"
                            >
                                Sign In
                            </Button>
                        </div>
                    </form>

                    {/* Footer Prompt */}
                    <div className="mt-12 text-center text-base font-medium text-white/80">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-primary transition-colors hover:text-foreground hover:underline underline-offset-4"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>

                {/* Right Panel: Decorative Illustration */}
                <div className="relative hidden w-full overflow-hidden bg-muted/30 md:block md:w-1/2 border-l border-border/40">
                    {/* Abstract Decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>

                    {/* Circles for visual depth */}
                    <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl"></div>

                    {/* Floating UI Elements */}
                    <div className="absolute inset-0 flex items-center justify-center">

                        {/* Centerpiece Container mimicking the "phone/device" vibe */}
                        <div className="relative h-[400px] w-[280px] rounded-[2.5rem] border border-border/40 bg-card/50 p-4 backdrop-blur-md shadow-2xl transform rotate-[-5deg] transition-transform duration-700 hover:rotate-0">
                            {/* Inner screen area */}
                            <div className="h-full w-full rounded-[1.75rem] bg-background/80 border border-border/20 flex flex-col items-center justify-center relative overflow-hidden">
                                {/* Glow effect */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-[50px]"></div>

                                {/* <Fingerprint size={80} className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] z-10" /> */}

                                <div className="mt-8 z-10 w-32 h-2 rounded-full bg-foreground/10 overflow-hidden">
                                    <div className="w-1/2 h-full bg-primary rounded-full"></div>
                                </div>
                            </div>

                            {/* Floating Badge 1 - Check Bubble */}
                            <div className="absolute -right-12 top-16 flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-2xl backdrop-blur-xl animate-bounce">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <CheckCircle2 size={20} />
                                </div>
                                <span className="text-sm font-semibold text-foreground">Verified</span>
                            </div>

                            {/* Floating Badge 2 - Lock */}
                            <div className="absolute -left-10 bottom-24 flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-2xl backdrop-blur-xl animate-bounce">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                                    <ShieldCheck size={20} />
                                </div>
                                <span className="text-sm font-semibold text-foreground">Secure</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
