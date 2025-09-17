import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: string;
  title: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  categories: {
    name: string;
    color: string;
  } | null;
  profiles: {
    display_name: string;
  } | null;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { userRole, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, statusFilter]);

  const fetchPosts = async () => {
    setLoading(true);
    
    let query = supabase
      .from('posts')
      .select(`
        id,
        title,
        excerpt,
        status,
        created_at,
        updated_at,
        author_id,
        categories (name, color),
        profiles (display_name)
      `)
      .order('updated_at', { ascending: false });

    // Authors can only see their own posts
    if (userRole?.role === 'author') {
      query = query.eq('author_id', user?.id);
    }

    const { data, error } = await query;

    if (error) {
      toast({
        title: "Erro ao carregar posts",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setPosts(data as any || []);
    }
    setLoading(false);
  };

  const filterPosts = () => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    setFilteredPosts(filtered);
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      toast({
        title: "Erro ao excluir post",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Post excluído!",
        description: "O post foi removido com sucesso."
      });
      fetchPosts();
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'default',
      draft: 'secondary',
      archived: 'outline'
    } as const;

    const labels = {
      published: 'Publicado',
      draft: 'Rascunho',
      archived: 'Arquivado'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">
            Gerencie todos os posts do blog
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/posts/new">
            <Plus className="w-4 h-4 mr-2" />
            Novo Post
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Pesquisar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="published">Publicados</SelectItem>
                <SelectItem value="draft">Rascunhos</SelectItem>
                <SelectItem value="archived">Arquivados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    {getStatusBadge(post.status)}
                  </div>
                  
                  {post.excerpt && (
                    <p className="text-muted-foreground mb-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Por {post.profiles?.display_name}</span>
                    <span>•</span>
                    <span>{new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                    {post.categories && (
                      <>
                        <span>•</span>
                        <Badge 
                          variant="outline"
                          style={{ 
                            borderColor: post.categories.color,
                            color: post.categories.color 
                          }}
                        >
                          {post.categories.name}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {post.status === 'published' && (
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/admin/posts/edit/${post.id}`}>
                      <Edit className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => deletePost(post.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Nenhum post encontrado com os filtros aplicados.'
                    : 'Ainda não há posts. Que tal criar o primeiro?'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button asChild className="mt-4">
                    <Link to="/admin/posts/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Post
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}