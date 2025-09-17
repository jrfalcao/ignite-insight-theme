import { Clock, User, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  category: 'news' | 'motivation' | 'curiosity';
  image: string;
  featured?: boolean;
}

const categoryConfig = {
  news: {
    label: 'Notícias',
    color: 'border-news text-news',
    bgColor: 'bg-news/10'
  },
  motivation: {
    label: 'Motivacional',
    color: 'border-motivation text-motivation',
    bgColor: 'bg-motivation/10'
  },
  curiosity: {
    label: 'Curiosidades',
    color: 'border-curiosity text-curiosity',
    bgColor: 'bg-curiosity/10'
  }
};

const ArticleCard = ({ 
  title, 
  excerpt, 
  author, 
  readTime, 
  category, 
  image, 
  featured = false 
}: ArticleCardProps) => {
  const config = categoryConfig[category];
  
  return (
    <article className={`group ${featured ? 'lg:col-span-2' : ''}`}>
      <div className="bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-smooth">
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className={`${config.color} ${config.bgColor} border`}>
              {config.label}
            </Badge>
          </div>
          
          {featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-accent text-accent-foreground">
                ⭐ Destaque
              </Badge>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className={`font-bold leading-tight transition-smooth group-hover:text-primary ${
            featured ? 'text-2xl' : 'text-xl'
          }`}>
            {title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="group-hover:text-primary transition-smooth">
              Ler mais
              <ArrowRight className="ml-2 w-4 h-4 transition-smooth group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;