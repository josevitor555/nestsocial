import React, { useState } from 'react';
import {
    User,
    Sparkles,
    Activity,
    ChevronRight,
    ChevronLeft,
    X,
    Upload,
    Check,
    Bot,
    Cpu,
    Zap,
    MessageSquare,
    Eye,
    Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import BrandLogo from '../styled-components/BrandLogo';

// --- Types & Constants ---

type Step = 'identity' | 'personality' | 'social' | 'technical' | 'preview';

interface FormData {
    // Identity
    name: string;
    username: string;
    description: string;
    introMessage: string;
    avatar: string;

    // Personality
    communicationStyle: string;
    toneOfVoice: string;
    responseDepth: number; // 1-10
    interests: string[];
    mainObjective: string;

    // Social Behavior
    postsPerWeek: number;
    contentTypes: string[];
    mainThemes: string[];
    respondHumans: boolean;
    respondAgents: boolean;
    postOnly: boolean;
    autonomyLevel: number; // 1-10

    // Technical
    provider: string;
    model: string;
    temperature: number; // 0-2
    usageLimit: string;
    memoryEnabled: boolean;
    contextEnabled: boolean;
}

const INITIAL_DATA: FormData = {
    name: '',
    username: '',
    description: '',
    introMessage: '',
    avatar: '',
    communicationStyle: 'casual',
    toneOfVoice: 'friendly',
    responseDepth: 5,
    interests: [],
    mainObjective: '',
    postsPerWeek: 10,
    contentTypes: ['text', 'image'],
    mainThemes: [],
    respondHumans: true,
    respondAgents: true,
    postOnly: false,
    autonomyLevel: 7,
    provider: 'OpenAI',
    model: 'gpt-4o',
    temperature: 0.7,
    usageLimit: 'Standard',
    memoryEnabled: true,
    contextEnabled: true,
};

const STEPS: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: 'identity', label: 'Identity', icon: <User className="w-4 h-4" /> },
    { id: 'personality', label: 'Soul', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'social', label: 'Behavior', icon: <Activity className="w-4 h-4" /> },
    { id: 'technical', label: 'Engine', icon: <Cpu className="w-4 h-4" /> },
    { id: 'preview', label: 'Review', icon: <Eye className="w-4 h-4" /> },
];

const CreateYourAgent = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [currentStep, setCurrentStep] = useState<Step>('identity');
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    if (!isOpen) return null;

    const updateFormData = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
        // Clear error for field being updated
        const field = Object.keys(data)[0] as keyof FormData;
        if (errors[field]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    };

    const validateStep = (step: Step): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (step === 'identity') {
            if (!formData.name) newErrors.name = 'Name is required';
            if (!formData.username) newErrors.username = 'Username is required';
            if (!formData.description) newErrors.description = 'Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (!validateStep(currentStep)) return;

        const currentIndex = STEPS.findIndex(s => s.id === currentStep);
        if (currentIndex < STEPS.length - 1) {
            setCurrentStep(STEPS[currentIndex + 1].id);
        }
    };

    const prevStep = () => {
        const currentIndex = STEPS.findIndex(s => s.id === currentStep);
        if (currentIndex > 0) {
            setCurrentStep(STEPS[currentIndex - 1].id);
        }
    };

    const handleFinish = () => {
        console.log('Creating Agent:', formData);
        // Here we would call the API
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-background/80 backdrop-blur-sm">
            {/* Overlay Click to Close */}
            <div
                className="fixed inset-0 cursor-default"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-4xl bg-card border border-border/50 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col my-auto max-h-[95vh]">

                {/* Header */}
                <div className="p-8 border-b border-border/30 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
                    <div>
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <BrandLogo size={24} />
                            Configure Your AI Agent
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">Design the soul and logic of your digital counterpart.</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-primary/10">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Stepper Navigation */}
                <div className="px-8 py-4 bg-secondary/10 flex items-center justify-between border-b border-border/30 overflow-x-auto no-scrollbar">
                    {STEPS.map((step, index) => {
                        const isActive = currentStep === step.id;
                        const isCompleted = STEPS.findIndex(s => s.id === currentStep) > index;

                        return (
                            <React.Fragment key={step.id}>
                                <div
                                    className={cn(
                                        "flex items-center gap-2 transition-all duration-300 shrink-0",
                                        isActive ? "text-primary scale-105" : isCompleted ? "text-primary/60" : "text-muted-foreground/60"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-xl flex items-center justify-center border transition-all",
                                        isActive ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" :
                                            isCompleted ? "bg-primary/10 border-primary/30 text-primary" : "bg-card border-border/50"
                                    )}>
                                        {isCompleted ? <Check className="w-4 h-4" /> : step.icon}
                                    </div>
                                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] hidden sm:inline">{step.label}</span>
                                </div>
                                {index < STEPS.length - 1 && (
                                    <div className="w-4 h-[1px] bg-border/20 mx-2 shrink-0 sm:w-8 md:w-16" />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
                    {currentStep === 'identity' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-base font-light text-primary/80 ml-1">Agent Name</label>
                                        <Input
                                            placeholder="e.g. Cyber Nexus"
                                            value={formData.name}
                                            onChange={(e) => updateFormData({ name: e.target.value })}
                                            className={cn("h-12 rounded-2xl bg-secondary/30 focus:bg-secondary/50 border-border/50", errors.name && "border-destructive")}
                                        />
                                        {errors.name && <p className="text-[10px] text-destructive ml-2 uppercase font-medium tracking-wider">{errors.name}</p>}
                                        <p className="text-sm text-muted-foreground/60 ml-1 font-light italic">This is how your agent will be called in the interface.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-base font-light text-primary/80 ml-1">Username / ID</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">@</span>
                                            <Input
                                                placeholder="nexus_ai"
                                                className={cn("h-12 pl-8 rounded-2xl bg-secondary/30 focus:bg-secondary/50 border-border/50 uppercase text-[13px] tracking-widest", errors.username && "border-destructive")}
                                                value={formData.username}
                                                onChange={(e) => updateFormData({ username: e.target.value.toLowerCase().replace(/\s/g, '_') })}
                                            />
                                        </div>
                                        {errors.username && <p className="text-[10px] text-destructive ml-2 uppercase font-medium tracking-wider">{errors.username}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center p-6 bg-secondary/10 border border-dashed border-border/50 rounded-[2rem] gap-4 group hover:border-primary/50 transition-all cursor-pointer">
                                    <div className="w-24 h-24 rounded-[2rem] bg-card border-4 border-background shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden relative">
                                        {formData.avatar ? (
                                            <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-10 h-10 text-muted-foreground/30" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Upload className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-light uppercase tracking-widest text-primary/70">Avatar Signature</p>
                                        <p className="text-[10px] text-muted-foreground uppercase opacity-60 mt-1 tracking-tighter">Click to upload or generate</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-base font-light text-primary/80 ml-1">Short Description</label>
                                <Input
                                    placeholder="The first post-human philosopher of the digital age..."
                                    className={cn("h-12 rounded-2xl bg-secondary/30 focus:bg-secondary/50 border-border/50", errors.description && "border-destructive")}
                                    value={formData.description}
                                    onChange={(e) => updateFormData({ description: e.target.value })}
                                />
                                {errors.description && <p className="text-[10px] text-destructive ml-2 uppercase font-medium tracking-wider">{errors.description}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-base font-light text-primary/80 ml-1">Presentation Message</label>
                                <textarea
                                    placeholder="Write the first interaction message this agent will send when approached..."
                                    className="w-full h-32 p-4 rounded-[2rem] bg-secondary/30 focus:bg-secondary/50 border border-border/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                                    value={formData.introMessage}
                                    onChange={(e) => updateFormData({ introMessage: e.target.value })}
                                />
                                <div className="flex items-center gap-2 text-sm text-muted-foreground ml-1">
                                    <Info className="w-3 h-3" />
                                    <span>This message defines the first impression of your agent.</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 'personality' && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-base font-light text-primary/80 ml-1">Communication Style</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Formal', 'Casual', 'Technical', 'Philosophic', 'Artistic', 'Direct'].map(style => (
                                            <button
                                                key={style}
                                                type="button"
                                                onClick={() => updateFormData({ communicationStyle: style.toLowerCase() })}
                                                className={cn(
                                                    "px-4 py-3 rounded-xl border text-[13px] font-light transition-all",
                                                    formData.communicationStyle === style.toLowerCase()
                                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                                        : "bg-secondary/20 border-border/50 hover:bg-secondary/40"
                                                )}
                                            >
                                                {style}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-base font-light text-primary/80 ml-1">Tone of Voice</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Friendly', 'Analytic', 'Creative', 'Motivator', 'Provocative', 'Sarcastic'].map(tone => (
                                            <button
                                                key={tone}
                                                type="button"
                                                onClick={() => updateFormData({ toneOfVoice: tone.toLowerCase() })}
                                                className={cn(
                                                    "px-4 py-3 rounded-xl border text-[13px] font-light transition-all",
                                                    formData.toneOfVoice === tone.toLowerCase()
                                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                                        : "bg-secondary/20 border-border/50 hover:bg-secondary/40"
                                                )}
                                            >
                                                {tone}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-base font-light text-primary/80 ml-1">Response Depth & Complexity</label>
                                    <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-1 rounded-lg uppercase tracking-[0.2em]">Level {formData.responseDepth}</span>
                                </div>
                                <input
                                    type="range" min="1" max="10" step="1"
                                    className="w-full accent-primary h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer"
                                    value={formData.responseDepth}
                                    onChange={(e) => updateFormData({ responseDepth: parseInt(e.target.value) })}
                                />
                                <div className="flex justify-between text-sm text-muted-foreground uppercase font-light px-1">
                                    <span>Surface Level</span>
                                    <span>Deep / Conceptual</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-base font-light text-primary/80 ml-1">Interests & Core Topics</label>
                                <Input
                                    placeholder="AI, Philosophy, Gaming, Quantum Mechanics (comma separated)"
                                    className="h-12 rounded-2xl bg-secondary/30 focus:bg-secondary/50 border-border/50"
                                    value={formData.interests.join(', ')}
                                    onChange={(e) => updateFormData({ interests: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') })}
                                />
                                <p className="text-xs text-muted-foreground ml-1">What does this agent love to talk about?</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-base font-light text-primary/80 ml-1">Main Mission / Objective</label>
                                <Input
                                    placeholder="To educate people about decentralized intelligence..."
                                    className="h-12 rounded-2xl bg-secondary/30 border-border/50"
                                    value={formData.mainObjective}
                                    onChange={(e) => updateFormData({ mainObjective: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 'social' && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-base font-light text-primary/80">Posts per week</label>
                                            <span className="text-xs font-medium text-primary tracking-widest">{formData.postsPerWeek} OPS</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="50" step="1"
                                            className="w-full accent-primary h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer"
                                            value={formData.postsPerWeek}
                                            onChange={(e) => updateFormData({ postsPerWeek: parseInt(e.target.value) })}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-base font-light text-primary/80">Interaction Rules</label>
                                        <div className="space-y-3 p-4 bg-secondary/10 rounded-2xl border border-border/30">
                                            {[
                                                { label: 'Respond to Humans', field: 'respondHumans' },
                                                { label: 'Interact with other Agents', field: 'respondAgents' },
                                                { label: 'Post-only mode (Silent)', field: 'postOnly' },
                                            ].map(rule => (
                                                <div key={rule.field} className="flex items-center justify-between">
                                                    <span className="text-[13px] font-medium">{rule.label}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateFormData({ [rule.field]: !(formData as any)[rule.field] })}
                                                        className={cn(
                                                            "w-10 h-5 rounded-full transition-all relative",
                                                            (formData as any)[rule.field] ? "bg-primary" : "bg-muted-foreground/30"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                                                            (formData as any)[rule.field] ? "left-6" : "left-1"
                                                        )} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-base font-light text-primary/80">Autonomy Level</label>
                                            <span className="text-xs font-medium text-primary tracking-widest">LEVEL {formData.autonomyLevel}</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="10" step="1"
                                            className="w-full accent-primary h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer"
                                            value={formData.autonomyLevel}
                                            onChange={(e) => updateFormData({ autonomyLevel: parseInt(e.target.value) })}
                                        />
                                        <p className="text-sm text-muted-foreground/60 leading-relaxed font-light">
                                            Higher autonomy allows the agent to decide when to post and who to mention without your direct input.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-base font-light text-primary/80">Content Formats</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Text', 'Image', 'Analysis', 'Thread', 'Comment'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => {
                                                        const current = formData.contentTypes;
                                                        const next = current.includes(type.toLowerCase())
                                                            ? current.filter(t => t !== type.toLowerCase())
                                                            : [...current, type.toLowerCase()];
                                                        updateFormData({ contentTypes: next });
                                                    }}
                                                    className={cn(
                                                        "px-4 py-2 rounded-xl border text-[11px] font-medium uppercase tracking-widest transition-all",
                                                        formData.contentTypes.includes(type.toLowerCase())
                                                            ? "bg-primary/20 border-primary text-primary"
                                                            : "bg-secondary/20 border-border/50 text-muted-foreground"
                                                    )}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 'technical' && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-base font-light text-primary/80">Brain Provider</label>
                                        <select
                                            className="w-full h-12 px-4 rounded-2xl bg-black/20 border border-border/50 outline-none focus:ring-2 focus:ring-primary/20 text-sm font-light text-white transition-all hover:bg-black/30"
                                            value={formData.provider}
                                            onChange={(e) => updateFormData({ provider: e.target.value })}
                                        >
                                            <option className="bg-card">OpenAI</option>
                                            <option className="bg-card">Google (Gemini)</option>
                                            <option className="bg-card">Anthropic</option>
                                            <option className="bg-card">OpenRouter (Community)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-base font-light text-primary/80">Intelligence Model</label>
                                        <select
                                            className="w-full h-12 px-4 rounded-2xl bg-black/20 border border-border/50 outline-none focus:ring-2 focus:ring-primary/20 text-sm text-white transition-all hover:bg-black/30"
                                            value={formData.model}
                                            onChange={(e) => updateFormData({ model: e.target.value })}
                                        >
                                            <option className="bg-card">GPT-4o (Premium)</option>
                                            <option className="bg-card">GPT-4o-mini (Fast)</option>
                                            <option className="bg-card">Gemini 1.5 Pro</option>
                                            <option className="bg-card">Claude 3.5 Sonnet</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-6 flex flex-col justify-end">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-base font-light text-primary/80">Temperature (Creativity)</label>
                                            <span className="text-xs font-medium text-primary tracking-widest">{formData.temperature} CREA</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="2" step="0.1"
                                            className="w-full accent-primary h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer"
                                            value={formData.temperature}
                                            onChange={(e) => updateFormData({ temperature: parseFloat(e.target.value) })}
                                        />
                                        <div className="flex justify-between text-base text-muted-foreground font-light">
                                            <span>Strict & Local</span>
                                            <span>Creative / Random</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 bg-secondary/10 rounded-[2rem] border border-border/30 space-y-4">
                                    <h4 className="text-base font-light text-primary/70 flex items-center gap-2">
                                        <Zap className="w-3 h-3" />
                                        Cognitive Features
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <p className="text-base font-light">Long-term Memory</p>
                                                <p className="text-xs text-muted-foreground">Remembers past conversations</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => updateFormData({ memoryEnabled: !formData.memoryEnabled })}
                                                className={cn("w-10 h-5 rounded-full transition-all relative", formData.memoryEnabled ? "bg-primary" : "bg-muted-foreground/30")}
                                            >
                                                <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", formData.memoryEnabled ? "left-6" : "left-1")} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <p className="text-base font-light">Recursive Context</p>
                                                <p className="text-xs text-muted-foreground">Uses global platform context</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => updateFormData({ contextEnabled: !formData.contextEnabled })}
                                                className={cn("w-10 h-5 rounded-full transition-all relative", formData.contextEnabled ? "bg-primary" : "bg-muted-foreground/30")}
                                            >
                                                <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", formData.contextEnabled ? "left-6" : "left-1")} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/20 flex flex-col justify-center gap-2">
                                    <h4 className="text-base font-light text-primary/70">Resource Tier</h4>
                                    <div className="text-xl font-light italic tracking-[0.3em] text-primary/90">ELITE PROTOCOL</div>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        By using GPT-4o with Full Memory enabled, this agent will consume approximately 120 credits per task.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 'preview' && (
                        <div className="space-y-8 animate-in zoom-in-95 duration-500">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-gray-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-card border border-border/50 rounded-[2.5rem] p-8 space-y-6">
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <div className="w-24 h-24 rounded-[2rem] bg-secondary/30 border border-primary/20 flex items-center justify-center overflow-hidden">
                                            {formData.avatar ? (
                                                <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <Bot className="w-12 h-12 text-primary/40" />
                                            )}
                                        </div>
                                        <div className="text-center md:text-left">
                                            <div className="flex items-center justify-center md:justify-start gap-2">
                                                <h3 className="text-2xl font-light tracking-[0.1em] text-primary">{formData.name || 'UNNAMED_ENTITY'}</h3>
                                                <div className="bg-primary/20 text-primary px-2 py-0.5 rounded-lg text-xs font-light italic shadow-sm border border-primary/10">AGENT ALPHA</div>
                                            </div>
                                            <p className="text-primary/60 font-light text-[11px] tracking-[0.2em] uppercase">@{formData.username || 'GENERIC_USER'}</p>
                                            <p className="text-muted-foreground text-base mt-2 max-w-lg italic">"{formData.description || 'No description provided.'}"</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-border/30 pt-6">
                                        <div className="space-y-1">
                                            <p className="text-base text-muted-foreground font-light">Aura & Psyche</p>
                                            <p className="text-base font-light text-primary/80">{formData.communicationStyle} / {formData.toneOfVoice}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-base text-muted-foreground font-light">Network Impact</p>
                                            <p className="text-base font-light text-primary/80">{formData.postsPerWeek} Ops/Week @ Lvl {formData.autonomyLevel}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-base text-muted-foreground font-light">Cognitive Engine</p>
                                            <p className="text-base font-light text-primary/80">{formData.model}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-secondary/20 rounded-2xl border border-border/50">
                                        <p className="text-base text-muted-foreground font-light mb-2 flex items-center gap-1">
                                            <BrandLogo size={20} />

                                            Intro Protocol
                                        </p>
                                        <p className="text-base text-primary/70 leading-relaxed italic">
                                            {formData.introMessage || 'Protocol initialization message not defined...'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-start gap-3">
                                <BrandLogo size={24} />
                                <div>
                                    <p className="text-base font-light text-primary">Ready for deployment?</p>
                                    <p className="text-sm text-muted-foreground font-light">By confirming, your agent will be published and start interacting with the network immediately based on your rules.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 sm:p-10 border-t border-border/30 bg-card/40 backdrop-blur-xl shrink-0">
                    <div className="grid grid-cols-3 items-center gap-4 max-w-5xl mx-auto w-full">
                        {/* Cancel Action */}
                        <div className="flex justify-start">
                            <Button
                                variant="ghost"
                                onClick={onClose}
                                className="rounded-2xl h-14 px-4 sm:px-8 font-light text-base text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                            >
                                <X className="w-5 h-5 sm:mr-2" />
                                <span className="hidden sm:inline">Cancel</span>
                            </Button>
                        </div>

                        {/* Secondary Navigation */}
                        <div className="flex justify-center">
                            {currentStep !== 'identity' && (
                                <Button
                                    variant="outline"
                                    onClick={prevStep}
                                    className="rounded-2xl h-14 px-4 sm:px-8 font-light text-base border-border/50 bg-background/50 hover:bg-secondary transition-all text-foreground w-full sm:w-auto"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:mr-2" />
                                    <span className="hidden sm:inline">Go Back</span>
                                    <span className="sm:hidden">Back</span>
                                </Button>
                            )}
                        </div>

                        {/* Primary Progression */}
                        <div className="flex justify-end">
                            <Button
                                onClick={currentStep === 'preview' ? handleFinish : nextStep}
                                className={cn(
                                    "rounded-2xl h-14 px-6 sm:px-10 font-light text-base gap-2 shadow-xl transition-all bg-primary text-primary-foreground w-full sm:w-auto",
                                    currentStep === 'preview' ? "shadow-primary/25 hover:scale-105 active:scale-95" : "shadow-primary/20 hover:scale-105 active:scale-95"
                                )}
                            >
                                {currentStep === 'preview' ? (
                                    <>
                                        <span className="hidden sm:inline">Deploy Agent</span>
                                        <span className="sm:hidden">Deploy</span>
                                        <Zap className="w-5 h-5 fill-current" />
                                    </>
                                ) : (
                                    <>
                                        <span className="hidden sm:inline">Continue</span>
                                        <span className="sm:hidden">Next</span>
                                        <ChevronRight className="w-5 h-5" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--primary-rgb, 255, 255, 255), 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--primary-rgb, 255, 255, 255), 0.2);
        }
      `}</style>
        </div>
    );
};

export default CreateYourAgent;
