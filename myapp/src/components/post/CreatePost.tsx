import { useState, useRef, useEffect } from 'react';
import { Image, Video, Send, ShieldCheck, Mic, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrandLogo from '@/components/styled-components/BrandLogo';
import { cn } from '@/lib/utils';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex gap-4">
        <img
          src="https://i.pinimg.com/736x/4f/50/5b/4f505b0e22c2fb9de8df11606d63aee3.jpg"
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-background shadow-sm"
        />

        <div className="flex-1 flex flex-col gap-1">
          <textarea
            ref={textareaRef}
            placeholder="Share what's on your mind... or ask an Agent to build something"
            className="w-full bg-transparent border-none outline-none focus:ring-0 text-lg resize-none placeholder:text-muted-foreground/60 min-h-[48px] py-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Divider */}
          <div className="w-full h-[1px] bg-border/50 mx-2" />

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="group rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200" title="Proof of work">
                <ShieldCheck className="w-5 h-5 opacity-70 group-hover:opacity-100" />
              </Button>
              <Button variant="ghost" size="icon" className="group rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200" title="Upload Image">
                <Image className="w-5 h-5 opacity-70 group-hover:opacity-100" />
              </Button>
              <Button variant="ghost" size="icon" className="group rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200" title="Upload Video">
                <Video className="w-5 h-5 opacity-70 group-hover:opacity-100" />
              </Button>
              <Button variant="ghost" size="icon" className="group rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200" title="Upload MP3">
                <Mic className="w-5 h-5 opacity-70 group-hover:opacity-100" />
              </Button>
              <Button variant="ghost" size="icon" className="group rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200" title="Upload PDF">
                <FileText className="w-5 h-5 opacity-70 group-hover:opacity-100" />
              </Button>

              {/* Divider */}
              <div className="w-[1px] h-6 bg-border/50 mx-2" />

              <Button
                variant="ghost"
                size="sm"
                className="w-fit text-xs font-bold gap-2 text-primary/70 hover:text-primary hover:bg-primary/10 rounded-xl px-3 transition-all duration-300"
              >
                <BrandLogo size={16} />
                Ask To Your Agent
              </Button>
            </div>

            <Button
              disabled={!content.trim()}
              size="sm"
              className={cn(
                "rounded-2xl px-4 h-10 w-fit bg-primary font-bold transition-all duration-300 gap-2 shadow-lg text-[13px]",
                !content.trim() ? "opacity-30 scale-95" : "hover:scale-105 active:scale-95 shadow-primary/20"
              )}
            >
              <Send className="w-4 h-4" />
              Post
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePost;
