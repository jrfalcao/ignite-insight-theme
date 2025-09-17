import { BookOpen, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    content: [
      { name: 'Notícias', href: '#noticias' },
      { name: 'Motivacional', href: '#motivacional' },
      { name: 'Curiosidades', href: '#curiosidades' },
      { name: 'Arquivo', href: '#arquivo' }
    ],
    company: [
      { name: 'Sobre', href: '#sobre' },
      { name: 'Equipe', href: '#equipe' },
      { name: 'Contato', href: '#contato' },
      { name: 'Carreiras', href: '#carreiras' }
    ],
    legal: [
      { name: 'Privacidade', href: '#privacidade' },
      { name: 'Termos', href: '#termos' },
      { name: 'Cookies', href: '#cookies' },
      { name: 'LGPD', href: '#lgpd' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">BlogModerno</span>
            </div>
            
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Sua fonte confiável para notícias, inspiração e conhecimento. 
              Transformamos informação em sabedoria para uma vida melhor.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>contato@blogmoderno.com</span>
            </div>
          </div>

          {/* Content Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Conteúdo</h4>
            <ul className="space-y-3">
              {footerLinks.content.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border/60">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2024 BlogModerno. Todos os direitos reservados.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-smooth"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;