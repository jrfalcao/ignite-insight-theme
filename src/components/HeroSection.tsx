import { ArrowRight, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              🔥 Artigo em Destaque
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Como Transformar Sua 
              <span className="text-transparent bg-clip-text hero-gradient"> Mentalidade</span> 
              e Alcançar o Sucesso
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Descubra as estratégias comprovadas que os mais bem-sucedidos usam para 
              transformar desafios em oportunidades e construir uma vida extraordinária.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Dr. Maria Silva</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 min de leitura</span>
              </div>
              <Badge variant="outline" className="text-motivation border-motivation">
                Motivacional
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="hero-gradient text-white border-0 hero-shadow hover:scale-105 transition-bounce">
                Ler Artigo Completo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              
              <Button variant="outline" size="lg" className="hover:bg-primary/5">
                Ver Mais Destaques
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden card-shadow-hover">
              <img 
                src="/api/placeholder/600/450" 
                alt="Pessoa meditando em um ambiente inspirador"
                className="w-full h-full object-cover transition-smooth hover:scale-105"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl card-shadow max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 motivation-gradient rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">💡</span>
                </div>
                <div>
                  <p className="font-semibold">+10k Leitores</p>
                  <p className="text-sm text-muted-foreground">Transformaram suas vidas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;