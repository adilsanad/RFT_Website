import { useScrollAnimation } from "@/hooks/useScrollAnimation";


const DivAnimation = ({ children, className, id, delay }: { children: React.ReactNode, className?: string, id?: string, delay?: number }) => {
    const { elementRef, animationClasses } = useScrollAnimation({
        delay: delay,
        threshold: 0.085
    });
    return (
        <div ref={elementRef} className={`${animationClasses} ${className}`}>
            {children}
        </div>
    );
};

export default DivAnimation;