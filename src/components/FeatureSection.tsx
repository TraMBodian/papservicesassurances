import { useEffect, useRef } from 'react';

interface FeatureSectionProps {
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  image: string;
  imagePosition: 'left' | 'right';
  bgColor: string;
}

export const FeatureSection = ({
  icon,
  badge,
  badgeColor,
  title,
  description,
  image,
  imagePosition,
  bgColor
}: FeatureSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / window.innerHeight));
      
      const content = section.querySelector('.feature-content') as HTMLElement;
      const img = section.querySelector('.feature-image') as HTMLElement;
      
      if (content && img) {
        const opacity = 1 - scrollProgress;
        const blur = scrollProgress * 10;
        
        content.style.opacity = opacity.toString();
        content.style.filter = `blur(${blur}px)`;
        img.style.opacity = opacity.toString();
        img.style.filter = `blur(${blur}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {imagePosition === 'left' && (
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl feature-image">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className={imagePosition === 'left' ? '' : 'feature-content'}>
            <div className={`inline-flex items-center gap-2 ${badgeColor} px-4 py-2 rounded-full mb-4`}>
              {icon}
              <span className="text-sm font-medium">{badge}</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">{title}</h2>
            <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
          </div>

          {imagePosition === 'right' && (
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl feature-image">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
