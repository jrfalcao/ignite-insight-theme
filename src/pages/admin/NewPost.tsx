import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WysiwygEditor from '@/components/WysiwygEditor';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleContentChange = (editorContent: string) => {
    setContent(editorContent);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      toast({
        title: 'Erro de Autenticação',
        description: 'Você precisa estar logado para criar um post.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          excerpt,
          content,
          slug,
          author_id: user.id,
          status: 'draft', // Ou 'published' dependendo da lógica inicial
          featured: false,
        },
      ])
      .select();

    if (error) {
      toast({
        title: 'Erro ao criar post',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Sucesso!',
        description: 'Post criado com sucesso.',
      });
      navigate('/admin/posts');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Post</CardTitle>
          <Label htmlFor="post-title">Título</Label>
          <Input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do Post"
            required
          />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Post'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

