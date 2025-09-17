import { TrendingUp, Tag, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Sidebar = () => {
  const popularPosts = [
    {
      title: "5 Hábitos que Mudaram Minha Vida",
      category: "Motivacional",
      views: "12k visualizações"
    },
    {
      title: "Tecnologia Quântica: O Futuro é Agora",
      category: "Curiosidades", 
      views: "8.5k visualizações"
    },
    {
      title: "Economia Global: Análise 2024",
      category: "Notícias",
      views: "7.2k visualizações"
    },
    {
      title: "Mindfulness no Trabalho",
      category: "Motivacional",
      views: "6.1k visualizações"
    }
  ];

  const categories = [
    { name: "Notícias", count: 127, color: "text-news" },
    { name: "Motivacional", count: 89, color: "text-motivation" },
    { name: "Curiosidades", count: 64, color: "text-curiosity" },
    { name: "Tecnologia", count: 45, color: "text-primary" },
    { name: "Saúde", count: 32, color: "text-accent" }
  ];

  const recentPosts = [
    {
      title: "Como Desenvolver Resiliência Mental",
      date: "2 horas atrás"
    },
    {
      title: "Descoberta Revolucionária na Medicina",
      date: "5 horas atrás"
    },
    {
      title: "O Poder da Gratidão Diária",
      date: "1 dia atrás"
    }
  ];

  return (
    <aside className="space-y-8">
      {/* Popular Posts */}
      <div className="bg-card rounded-2xl p-6 card-shadow">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Posts Populares</h3>
        </div>
        
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <div key={index} className="group cursor-pointer">
              <h4 className="font-medium text-sm leading-snug mb-2 transition-smooth group-hover:text-primary">
                {post.title}
              </h4>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{post.views}</span>
              </div>
              {index < popularPosts.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-card rounded-2xl p-6 card-shadow">
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Categorias</h3>
        </div>
        
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-smooth">
              <span className={`font-medium ${category.color}`}>
                {category.name}
              </span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-card rounded-2xl p-6 card-shadow">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Posts Recentes</h3>
        </div>
        
        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <div key={index} className="group cursor-pointer">
              <h4 className="font-medium text-sm leading-snug mb-2 transition-smooth group-hover:text-primary">
                {post.title}
              </h4>
              <span className="text-xs text-muted-foreground">{post.date}</span>
              {index < recentPosts.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border">
        <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Receba as melhores histórias diretamente no seu email.
        </p>
        <div className="space-y-3">
          <input 
            type="email" 
            placeholder="Seu email..."
            className="w-full px-4 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-smooth">
            Inscrever-se
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;