import { useState } from 'react';
import { Menu, X, Search, BookOpen, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigation = [
    { name: 'Início', href: '#', current: true },
    { name: 'Notícias', href: '#noticias' },
    { name: 'Motivacional', href: '#motivacional' },
    { name: 'Curiosidades', href: '#curiosidades' },
    { name: 'Sobre', href: '#sobre' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b transition-smooth">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">BlogModerno</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  item.current ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden sm:inline-flex"
            >
              <Search className="w-4 h-4" />
            </Button>
            
            <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
              <Link to="/auth">
                <User className="w-4 h-4 mr-2" />
                Admin
              </Link>
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative max-w-md ml-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Pesquisar artigos..."
                className="pl-10 transition-smooth"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-smooth ${
                    item.current ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t space-y-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/auth">
                  <User className="w-4 h-4 mr-2" />
                  Área Administrativa
                </Link>
              </Button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Pesquisar artigos..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;