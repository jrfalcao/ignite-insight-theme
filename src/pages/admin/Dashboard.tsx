import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Users, FolderOpen, TrendingUp, Plus, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalCategories: number;
  totalUsers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalCategories: 0,
    totalUsers: 0
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const { userRole } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Fetch posts stats
    const { data: posts } = await supabase
      .from('posts')
      .select('status');
    
    const totalPosts = posts?.length || 0;
    const publishedPosts = posts?.filter(p => p.status === 'published').length || 0;
    const draftPosts = posts?.filter(p => p.status === 'draft').length || 0;

    // Fetch categories count
    const { data: categories } = await supabase
      .from('categories')
      .select('id');
    
    // Fetch users count (only for admins)
    let totalUsers = 0;
    if (userRole?.role === 'admin') {
      const { data: users } = await supabase
        .from('profiles')
        .select('id');
      totalUsers = users?.length || 0;
    }

    // Fetch recent posts
    const { data: recent } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        status,
        created_at,
        categories (name, color),
        profiles (display_name)
      `)
      .order('created_at', { ascending: false })
      .limit(5);

    setStats({
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories: categories?.length || 0,
      totalUsers
    });

    setRecentPosts(recent || []);
  };

  const statsCards = [
    {
      title: 'Total de Posts',
      value: stats.totalPosts,
      icon: FileText,
      description: 'Todos os posts do sistema'
    },
    {
      title: 'Posts Publicados',
      value: stats.publishedPosts,
      icon: TrendingUp,
      description: 'Posts ativos no site'
    },
    {
      title: 'Rascunhos',
      value: stats.draftPosts,
      icon: FileText,
      description: 'Posts em elaboração'
    },
    {
      title: 'Categorias',
      value: stats.totalCategories,
      icon: FolderOpen,
      description: 'Categorias cadastradas'
    }
  ];

  if (userRole?.role === 'admin') {
    statsCards.push({
      title: 'Usuários',
      value: stats.totalUsers,
      icon: Users,
      description: 'Usuários registrados'
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel administrativo do Blog Moderno
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/admin/posts/new">
              <Plus className="w-4 h-4 mr-2" />
              Novo Post
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/" target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              Ver Site
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Posts Recentes</CardTitle>
          <CardDescription>
            Últimos posts criados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{post.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Por {post.profiles?.display_name} • {new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {post.categories && (
                    <Badge 
                      style={{ backgroundColor: post.categories.color + '20', color: post.categories.color }}
                    >
                      {post.categories.name}
                    </Badge>
                  )}
                  <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                    {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </Badge>
                </div>
              </div>
            ))}
            
            {recentPosts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum post encontrado. Que tal criar o primeiro?
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}