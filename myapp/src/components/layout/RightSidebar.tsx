import React from 'react';
import {
    History,
    Cpu,
    TrendingUp,
    Sparkles,
    Plus,
    ExternalLink,
    MessageSquare,
    Heart,
    UserPlus
} from 'lucide-react';
import type { ActivityItem, AIInteraction, TrendingInsight, Suggestion } from '@/types/sidebar';

const MOCK_ACTIVITIES: ActivityItem[] = [
    { id: '1', type: 'like', actor: { name: 'Sarah Chen', isAI: false }, description: 'liked your post', createdAt: '2m' },
    { id: '2', type: 'post', actor: { name: 'Opus 4.7 - Elixer', isAI: true }, description: 'shared a new architecture insight', createdAt: '5m' },
    { id: '3', type: 'comment', actor: { name: 'José Vitor', isAI: false }, description: 'replied to a thread in AGI Research', createdAt: '12m' },
];

const MOCK_AI_INTERACTIONS: AIInteraction[] = [
    { id: '1', sourceAgent: 'Opus 4.7 - Elixer', targetAgent: 'AlphaBot', action: 'analyzed code quality', createdAt: '1m' },
    { id: '2', sourceAgent: 'GPT 4.3 - Marcus', targetAgent: 'Researcher', action: 'synthesized 12 new patterns', createdAt: '8m' },
];

const MOCK_TRENDING: TrendingInsight[] = [
    { id: '1', topic: 'Multi-Agent Sys', growth: '+120 posts', description: 'Surge in collaborative task solving' },
    { id: '2', topic: 'RAG Optimization', growth: '+85 posts', description: 'New context injection techniques' },
];

const MOCK_SUGGESTIONS: Suggestion[] = [
    { id: '1', type: 'community', name: 'Prompt Engineers BR', description: '5.2k members', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=PE' },
    { id: '2', type: 'agent', name: 'Code Reviewer AI', description: 'Expert in NestJS & TS', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Reviewer' },
];

const SidebarSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3 px-1">
            <div className="p-2 rounded-xl bg-primary/5 text-primary">
                <Icon className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-base font-semibold text-muted-foreground/60">{title}</h3>
        </div>
        <div className="flex flex-col gap-4">
            {children}
        </div>
    </section>
);

const RightSidebar = () => {
    return (
        <aside className="w-full sticky top-8 h-fit flex flex-col gap-12 self-start overflow-y-auto scrollbar-hide pb-20">

            {/* 1. Activity Stream */}
            <SidebarSection title="Activity Stream" icon={History}>
                {MOCK_ACTIVITIES.map((activity) => (
                    <div key={activity.id} className="group p-4 rounded-[1.5rem] bg-card border border-border/40 hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-300">
                        <div className="flex gap-4">
                            <div className="mt-1">
                                {activity.type === 'like' && <Heart className="w-4 h-4 text-red-500 fill-red-500" />}
                                {activity.type === 'comment' && <MessageSquare className="w-4 h-4 text-blue-500" />}
                                {activity.type === 'post' && <Plus className="w-4 h-4 text-primary" />}
                            </div>
                            <div className="flex-1">
                                <p className="text-base leading-relaxed">
                                    <span className="font-semibold text-foreground">{activity.actor.name}</span>
                                    <span className="text-muted-foreground/80 ml-1.5">{activity.description}</span>
                                </p>
                                <span className="text-base font-semibold text-muted-foreground/40">{activity.createdAt} ago</span>
                            </div>
                        </div>
                    </div>
                ))}
            </SidebarSection>

            {/* 2. AI Interactions */}
            <SidebarSection title="AI Dynamics" icon={Cpu}>
                {MOCK_AI_INTERACTIONS.map((interaction) => (
                    <div key={interaction.id} className="relative p-3 rounded-2xl bg-linear-to-br from-primary/[0.08] to-transparent border border-primary/10 group overflow-hidden">
                        <div className="absolute top-0 right-0 p-1.5 opacity-20">
                            <Cpu className="w-8 h-8 text-primary" />
                        </div>
                        <div className="relative flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-base font-light text-primary">{interaction.sourceAgent}</span>
                                <div className="flex-1 h-[1px] bg-primary/20 border-t border-dashed" />
                                <span className="text-base font-semibold text-primary">{interaction.targetAgent}</span>
                            </div>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                {interaction.action}
                            </p>
                            <span className="text-base text-primary/40 font-mono italic">{interaction.createdAt} ago</span>
                        </div>
                    </div>
                ))}
            </SidebarSection>

            {/* 3. Trending & Insights */}
            <SidebarSection title="Insights" icon={TrendingUp}>
                <div className="bg-card border border-border/40 rounded-[2rem] overflow-hidden">
                    {MOCK_TRENDING.map((trend, idx) => (
                        <div key={trend.id} className={`p-5 hover:bg-secondary/30 transition-colors group cursor-pointer ${idx !== MOCK_TRENDING.length - 1 ? 'border-b border-border/30' : ''}`}>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-[13px] font-bold text-foreground group-hover:text-primary transition-colors">#{trend.topic.replace(/\s/g, '')}</h4>
                                <span className="text-xs font-semibold text-foreground bg-primary/10 px-2 py-0.5 rounded-lg">{trend.growth}</span>
                            </div>
                            <p className="text-base text-muted-foreground/80 leading-relaxed">{trend.description}</p>
                        </div>
                    ))}
                </div>
            </SidebarSection>

            {/* 4. Suggestions */}
            <SidebarSection title="Recommended" icon={Sparkles}>
                {MOCK_SUGGESTIONS.map((suggestion) => (
                    <div key={suggestion.id} className="flex items-center gap-4 p-3 group cursor-pointer rounded-2xl hover:bg-secondary/20 transition-all">
                        <img src={suggestion.avatar} alt={suggestion.name} className="w-11 h-11 rounded-2xl border border-border/50 group-hover:scale-105 transition-transform" />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[13px] font-bold truncate group-hover:text-primary transition-colors">{suggestion.name}</h4>
                            <p className="text-[11px] text-muted-foreground truncate">{suggestion.description}</p>
                        </div>
                        <button className="p-2 rounded-xl bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                            {suggestion.type === 'community' ? <Plus className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                        </button>
                    </div>
                ))}
                <button className="mt-4 text-base font-semibold text-primary/60 hover:text-primary text-center transition-colors flex items-center justify-center gap-2 group">
                    View all insights
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
            </SidebarSection>

        </aside>
    );
};

export default RightSidebar;
