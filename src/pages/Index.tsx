import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

// Import images
import heroMeditation from '@/assets/hero-meditation.jpg';
import businessNews from '@/assets/business-news.jpg';
import mountainSuccess from '@/assets/mountain-success.jpg';
import scienceCuriosity from '@/assets/science-curiosity.jpg';
import morningRoutine from '@/assets/morning-routine.jpg';
import techInnovation from '@/assets/tech-innovation.jpg';

const Index = () => {
  const featuredArticles = [
    {
      title: "Revolução da Inteligência Artificial: Impactos na Economia Global",
      excerpt: "Como a IA está transformando setores inteiros e criando novas oportunidades de negócio. Análise completa dos principais desenvolvimentos e tendências para 2024.",
      author: "Carlos Mendes",
      readTime: "12 min",
      category: "news" as const,
      image: techInnovation,
      featured: true
    },
    {
      title: "5 Hábitos Matinais que Transformaram Minha Vida",
      excerpt: "Descubra como pequenas mudanças na sua rotina matinal podem gerar grandes transformações pessoais e profissionais.",
      author: "Ana Silva",
      readTime: "6 min",
      category: "motivation" as const,
      image: morningRoutine
    }
  ];

  const recentArticles = [
    {
      title: "O Mistério dos Buracos Negros Supermassivos",
      excerpt: "Novas descobertas científicas revelam segredos fascinantes sobre os gigantes do universo e como eles moldam galáxias inteiras.",
      author: "Dr. Pedro Santos",
      readTime: "8 min",
      category: "curiosity" as const,
      image: scienceCuriosity
    },
    {
      title: "Liderança Inspiradora: Como Motivar Sua Equipe",
      excerpt: "Estratégias práticas para desenvolver habilidades de liderança e criar um ambiente de trabalho mais produtivo e positivo.",
      author: "Mariana Costa",
      readTime: "10 min",
      category: "motivation" as const,
      image: mountainSuccess
    },
    {
      title: "Mercado de Ações: Análise Semanal e Perspectivas",
      excerpt: "Resumo dos principais movimentos do mercado financeiro e análise das tendências que podem influenciar os próximos meses.",
      author: "Roberto Lima",
      readTime: "15 min",
      category: "news" as const,
      image: businessNews
    },
    {
      title: "Mindfulness no Trabalho: Produtividade com Bem-estar",
      excerpt: "Como incorporar práticas de atenção plena no ambiente profissional para reduzir stress e aumentar a criatividade.",
      author: "Juliana Reis",
      readTime: "7 min",
      category: "motivation" as const,
      image: heroMeditation
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Articles Section */}
          <div className="lg:col-span-3 space-y-12">
            {/* Featured Articles */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">Artigos em Destaque</h2>
                <span className="text-sm text-muted-foreground">Editores escolhem</span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredArticles.map((article, index) => (
                  <ArticleCard key={index} {...article} />
                ))}
              </div>
            </section>

            {/* Recent Articles */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">Últimas Publicações</h2>
                <div className="flex items-center gap-4 text-sm">
                  <button className="text-primary font-medium hover:text-primary/80 transition-smooth">
                    Todas
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-smooth">
                    Notícias
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-smooth">
                    Motivacional
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-smooth">
                    Curiosidades
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recentArticles.map((article, index) => (
                  <ArticleCard key={index} {...article} />
                ))}
              </div>
            </section>

            {/* Load More */}
            <div className="text-center pt-8">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-smooth shadow-lg hover:shadow-xl">
                Carregar Mais Artigos
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="py-20 motivation-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-white">
              Transforme Sua Vida Diariamente
            </h2>
            <p className="text-lg text-white/90">
              Receba inspiração, notícias e insights diretamente na sua caixa de entrada. 
              Junte-se a mais de 50.000 leitores que já transformaram suas vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor email..."
                className="flex-1 px-6 py-3 rounded-xl border-0 text-foreground shadow-lg focus:outline-none focus:ring-4 focus:ring-white/20"
              />
              <button className="bg-white text-motivation px-8 py-3 rounded-xl font-semibold hover:bg-white/95 transition-smooth shadow-lg">
                Inscrever-se
              </button>
            </div>
            <p className="text-sm text-white/70">
              ✓ Sem spam • ✓ Cancele quando quiser • ✓ Conteúdo exclusivo
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;