import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

// Import images
import heroMeditation from '@/assets/hero-meditation.jpg';
import businessNews from '@/assets/business-news.jpg';
import mountainSuccess from '@/assets/mountain-success.jpg';
import scienceCuriosity from '@/assets/science-curiosity.jpg';
import morningRoutine from '@/assets/morning-routine.jpg';
import techInnovation from '@/assets/tech-innovation.jpg';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featured: boolean;
  created_at: string;
  categories?: {
    name: string;
    type: string;
    color: string;
  } | null;
  profiles?: {
    display_name: string;
  } | null;
}

const Index = () => {
  const [featuredArticles, setFeaturedArticles] = useState<Post[]>([]);
  const [recentArticles, setRecentArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Image mapping based on category type
  const getImageByCategory = (categoryType: string) => {
    switch (categoryType) {
      case 'noticias':
        return techInnovation;
      case 'motivacional':
        return morningRoutine;
      case 'curiosidades':
        return scienceCuriosity;
      default:
        return heroMeditation;
    }
  };

  const getCategoryDisplay = (categoryType: string) => {
    switch (categoryType) {
      case 'noticias':
        return 'news';
      case 'motivacional':
        return 'motivation';
      case 'curiosidades':
        return 'curiosity';
      default:
        return 'news';
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data: posts, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          excerpt,
          slug,
          featured,
          created_at,
          categories (name, type, color),
          profiles (display_name)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const featured = posts?.filter(post => post.featured) || [];
      const recent = posts?.filter(post => !post.featured).slice(0, 4) || [];

      setFeaturedArticles(featured as any);
      setRecentArticles(recent as any);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

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
                {loading ? (
                  Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-muted rounded-xl h-48 mb-4"></div>
                      <div className="space-y-2">
                        <div className="bg-muted h-4 rounded w-3/4"></div>
                        <div className="bg-muted h-4 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  featuredArticles.map((post) => (
                    <ArticleCard 
                      key={post.id}
                      title={post.title}
                      excerpt={post.excerpt || ''}
                      author={post.profiles?.display_name || 'Autor'}
                      readTime="5 min"
                      category={getCategoryDisplay(post.categories?.type) as any}
                      image={getImageByCategory(post.categories?.type)}
                      featured={post.featured}
                      slug={post.slug}
                    />
                  ))
                )}
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
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-muted rounded-xl h-48 mb-4"></div>
                      <div className="space-y-2">
                        <div className="bg-muted h-4 rounded w-3/4"></div>
                        <div className="bg-muted h-4 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  recentArticles.map((post) => (
                    <ArticleCard 
                      key={post.id}
                      title={post.title}
                      excerpt={post.excerpt || ''}
                      author={post.profiles?.display_name || 'Autor'}
                      readTime="5 min"
                      category={getCategoryDisplay(post.categories?.type) as any}
                      image={getImageByCategory(post.categories?.type)}
                      slug={post.slug}
                    />
                  ))
                )}
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