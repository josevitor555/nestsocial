import React from 'react';
import { User, Code2, Cpu, BrainCircuit, Users, Bot, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SkillTagProps {
    label: string;
    className?: string;
}

const SkillTag = ({ label, className }: SkillTagProps) => (
    <span className={cn(
        "px-3 py-1.5 text-[13px] font-medium rounded-full",
        "bg-secondary/50 text-secondary-foreground border border-secondary/50",
        "hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 cursor-pointer",
        className
    )}>
        {label}
    </span>
);

interface CommunityItemProps {
    name: string;
    members: string;
    icon: React.ReactNode;
    active?: boolean;
}

const CommunityItem = ({ name, members, icon, active }: CommunityItemProps) => (
    <div className={cn(
        "flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 cursor-pointer group",
        active ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/40 border border-transparent"
    )}>
        <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
            active ? "bg-primary text-primary-foreground" : "bg-muted group-hover:bg-primary group-hover:text-primary-foreground"
        )}>
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold truncate leading-tight">{name}</p>
            <p className="text-base text-muted-foreground">{members} members</p>
        </div>
        {active && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
    </div>
);

const LeftSidebar = () => {
    return (
        <aside className="w-full h-fit sticky top-12 flex flex-col gap-8">

            {/* 1. User Profile */}
            <div className="relative group overflow-hidden rounded-[2rem] bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-50" />

                <div className="relative p-7 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        <div className="absolute -inset-2 bg-linear-to-tr from-primary to-secondary rounded-full blur-md opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                        <img
                            src="https://i.pinimg.com/736x/4f/50/5b/4f505b0e22c2fb9de8df11606d63aee3.jpg"
                            alt="Avatar"
                            className="relative w-24 h-24 rounded-full border-4 border-background shadow-2xl object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-background rounded-full shadow-lg" />
                    </div>

                    <h2 className="text-xl font-semibold mb-1">José Vitor</h2>
                    <p className="text-base text-muted-foreground mb-4 font-medium opacity-80">@josevitor555</p>

                    <p className="text-base text-muted-foreground/90 line-clamp-2 mb-6 leading-relaxed px-2">
                        Building the next generation of social AI systems. NestJS & React Enthusiast. 🚀
                    </p>

                    <div className="grid grid-cols-3 gap-3 w-full mb-8">
                        <div className="flex flex-col items-center py-3 px-2 rounded-2xl bg-secondary/40 border border-border/20 hover:bg-secondary/60 transition-colors cursor-default">
                            <span className="text-lg font-bold leading-tight">128</span>
                            <span className="text-xs text-muted-foreground font-semibold">Posts</span>
                        </div>
                        <div className="flex flex-col items-center py-3 px-2 rounded-2xl bg-secondary/40 border border-border/20 hover:bg-secondary/60 transition-colors cursor-default">
                            <span className="text-lg font-bold leading-tight">1.2k</span>
                            <span className="text-xs text-muted-foreground font-semibold">Followers</span>
                        </div>
                        <div className="flex flex-col items-center py-3 px-2 rounded-2xl bg-secondary/40 border border-border/20 hover:bg-secondary/60 transition-colors cursor-default">
                            <span className="text-lg font-bold leading-tight">850</span>
                            <span className="text-xs text-muted-foreground font-semibold">Following</span>
                        </div>
                    </div>

                    <Button className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 gap-3 group/btn text-base font-bold">
                        <User className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                        My Profile
                    </Button>
                </div>
            </div>

            {/* 2. Skills */}
            <div className="p-7 rounded-[2rem] bg-card border border-border/50 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                    <Code2 className="w-5 h-5 text-primary" />
                    <h3 className="text-base font-semibold text-muted-foreground">Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    <SkillTag label="React" />
                    <SkillTag label="NestJS" />
                    <SkillTag label="Prompt Engineering" />
                    <SkillTag label="UI Design" />
                    <SkillTag label="Agents" />
                    <SkillTag label="TypeScript" />
                    <SkillTag label="RAG Systems" />
                </div>
            </div>

            {/* 3. AI Communities */}
            <div className="p-7 rounded-[2rem] bg-card border border-border/50 shadow-sm overflow-hidden relative">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <h3 className="text-base font-semibold text-muted-foreground">Communities</h3>
                    </div>
                    <button className="text-base font-semibold text-primary hover:underline transition-all">See all</button>
                </div>

                <div className="flex flex-col gap-2">
                    <CommunityItem
                        name="AI Builders"
                        members="12.4k"
                        icon={<Bot className="w-5 h-5" />}
                        active
                    />
                    <CommunityItem
                        name="Prompt Engineers"
                        members="6.7k"
                        icon={<BrainCircuit className="w-5 h-5" />}
                    />
                    <CommunityItem
                        name="RAG Systems"
                        members="3.1k"
                        icon={<Cpu className="w-5 h-5" />}
                    />
                    <CommunityItem
                        name="Multi-Agent Labs"
                        members="8.7k"
                        icon={<Share2 className="w-5 h-5" />}
                    />
                </div>
            </div>

            {/* Footer minimal */}
            <div className="px-6 flex flex-wrap gap-x-6 gap-y-3 pb-8">
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">About</a>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">Privacy</a>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">Terms</a>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">Cookies</a>
                <p className="text-base text-muted-foreground/60 w-full mt-2 font-medium">© 2026 NestSocial AI — Built for the future</p>
            </div>
        </aside>
    );
};

export default LeftSidebar;
