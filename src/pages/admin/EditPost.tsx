import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WysiwygEditor from '@/components/WysiwygEditor';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Post {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  author_id: string;
}

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (error) {
      toast({
        title: 'Erro ao carregar post',
        description: error.message,
        variant: 'destructive',
      });
      navigate('/admin/posts');
    } else if (data) {
      setTitle(data.title);
      setExcerpt(data.excerpt || '');
      setContent(data.content || '');
    } else {
      toast({
        title: 'Post não encontrado',
        description: 'O post que você tentou editar não existe.',
        variant: 'destructive',
      });
      navigate('/admin/posts');
    }
    setLoading(false);
  };

  const handleContentChange = (editorContent: string) => {
    setContent(editorContent);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (!user) {
      toast({
        title: 'Erro de Autenticação',
        description: 'Você precisa estar logado para editar um post.',
        variant: 'destructive',
      });
      setSaving(false);
      return;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        excerpt,
        content,
        slug,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro ao atualizar post',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Sucesso!',
        description: 'Post atualizado com sucesso.',
      });
      navigate('/admin/posts');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Editar Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="post-title">Título</Label>
              <Input
                id="post-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título do Post"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-excerpt">Resumo</Label>
              <Input
                id="post-excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Um breve resumo do post"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-content">Conteúdo</Label>
              <WysiwygEditor initialValue={content} onEditorChange={handleContentChange} />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? 'Salvando...' : 'Atualizar Post'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

