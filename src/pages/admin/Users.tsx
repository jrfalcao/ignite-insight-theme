import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Users as UsersIcon, Shield, Edit, Crown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  user_roles: Array<{
    role: 'admin' | 'editor' | 'author';
  }>;
}

const roleLabels = {
  admin: 'Administrador',
  editor: 'Editor',
  author: 'Autor'
};

const roleBadgeVariants = {
  admin: 'default',
  editor: 'secondary',
  author: 'outline'
} as const;

export default function Users() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(false);
  const { userRole } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        user_roles (role)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar usuários",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setUsers(data as any || []);
    }
    setLoading(false);
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => 
        user.user_roles.some(role => role.role === roleFilter)
      );
    }

    setFilteredUsers(filtered);
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'editor' | 'author') => {
    setUpdatingRole(true);
    
    try {
      // First, delete existing role
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Then insert new role
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: newRole }]);

      if (error) throw error;

      toast({
        title: "Função atualizada!",
        description: `Usuário agora é ${roleLabels[newRole]}.`
      });

      setDialogOpen(false);
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar função",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUpdatingRole(false);
    }
  };

  const openRoleDialog = (user: UserProfile) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const getUserRole = (user: UserProfile) => {
    return user.user_roles?.[0]?.role || 'author';
  };

  // Check permissions
  if (userRole?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários e suas funções
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {filteredUsers.length} usuário{filteredUsers.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Pesquisar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="author">Autor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => {
          const role = getUserRole(user);
          return (
            <Card key={user.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>
                        {user.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user.display_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <Badge variant={roleBadgeVariants[role]}>
                    {role === 'admin' && <Crown className="w-3 h-3 mr-1" />}
                    {role === 'editor' && <Shield className="w-3 h-3 mr-1" />}
                    {roleLabels[role]}
                  </Badge>
                </div>

                {user.bio && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {user.bio}
                  </p>
                )}

                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openRoleDialog(user)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Alterar Função
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <UsersIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm || roleFilter !== 'all'
                  ? 'Nenhum usuário encontrado com os filtros aplicados.'
                  : 'Ainda não há usuários registrados.'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Role Change Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Função do Usuário</DialogTitle>
            <DialogDescription>
              Altere a função de <strong>{selectedUser?.display_name}</strong> no sistema.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Selecione a nova função:</p>
              <div className="space-y-2">
                {Object.entries(roleLabels).map(([role, label]) => (
                  <Button
                    key={role}
                    variant="outline"
                    className="w-full justify-start"
                    disabled={updatingRole}
                    onClick={() => selectedUser && updateUserRole(
                      selectedUser.user_id, 
                      role as 'admin' | 'editor' | 'author'
                    )}
                  >
                    {role === 'admin' && <Crown className="w-4 h-4 mr-2" />}
                    {role === 'editor' && <Shield className="w-4 h-4 mr-2" />}
                    {label}
                    {getUserRole(selectedUser!) === role && (
                      <Badge variant="secondary" className="ml-auto">
                        Atual
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}