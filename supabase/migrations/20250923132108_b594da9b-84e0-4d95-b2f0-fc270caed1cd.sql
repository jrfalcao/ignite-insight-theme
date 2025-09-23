-- Add featured field to posts table
ALTER TABLE public.posts ADD COLUMN featured BOOLEAN DEFAULT false;

-- Create index for better performance on featured posts
CREATE INDEX idx_posts_featured ON public.posts(featured) WHERE featured = true;
CREATE INDEX idx_posts_status_featured ON public.posts(status, featured);

-- Insert some sample posts
INSERT INTO public.posts (title, slug, excerpt, content, author_id, category_id, status, featured, published_at) VALUES
('Revolução da Inteligência Artificial: Impactos na Economia Global', 
 'revolucao-inteligencia-artificial-economia-global',
 'Como a IA está transformando setores inteiros e criando novas oportunidades de negócio. Análise completa dos principais desenvolvimentos e tendências para 2024.',
 'A inteligência artificial está redefinindo a economia global de maneiras que pareciam ficção científica há apenas uma década. Desde algoritmos de machine learning que otimizam cadeias de suprimentos até assistentes virtuais que revolucionam o atendimento ao cliente, a IA está criando novas oportunidades de negócio enquanto transforma setores tradicionais.

## O Impacto Setorial

### Setor Financeiro
Os bancos estão utilizando IA para detecção de fraudes, análise de risco de crédito e trading algorítmico. Essas tecnologias não apenas aumentam a eficiência, mas também reduzem custos operacionais significativamente.

### Saúde
Na medicina, a IA está auxiliando em diagnósticos mais precisos, descoberta de medicamentos e personalização de tratamentos. Radiologistas agora trabalham em conjunto com algoritmos que podem detectar anomalias com precisão superior à humana.

### Manufatura
A Indústria 4.0 está sendo impulsionada pela IA, com fábricas inteligentes que se auto-otimizam, preveem falhas de equipamentos e ajustam a produção em tempo real baseado na demanda.

## Oportunidades Emergentes

A revolução da IA está criando novos tipos de empregos e oportunidades de negócio:

- **Engenheiros de Prompt**: Profissionais especializados em comunicar-se efetivamente com sistemas de IA
- **Auditores de Algoritmos**: Especialistas que garantem que os sistemas de IA operem de forma ética e transparente
- **Consultores de Transformação Digital**: Profissionais que ajudam empresas a integrar IA em seus processos

## Desafios e Considerações

Apesar das oportunidades, a revolução da IA também traz desafios significativos:

### Questões Éticas
- Viés algorítmico
- Privacidade de dados
- Transparência nas decisões automatizadas

### Impacto no Emprego
- Automatização de tarefas rotineiras
- Necessidade de requalificação profissional
- Criação de novos tipos de trabalho

## Perspectivas para 2024

As tendências indicam que 2024 será um ano decisivo para a adoção empresarial de IA. Empresas que não se adaptarem rapidamente podem ficar para trás em um mercado cada vez mais competitivo e tecnológico.

A revolução da IA não é apenas sobre tecnologia - é sobre reimaginar como fazemos negócios, como trabalhamos e como vivemos. As organizações que abraçarem essa transformação com responsabilidade e visão estratégica estarão melhor posicionadas para prosperar na nova economia digital.',
 (SELECT id FROM auth.users LIMIT 1),
 (SELECT id FROM public.categories WHERE slug = 'tecnologia'),
 'published',
 true,
 now()),

('5 Hábitos Matinais que Transformaram Minha Vida',
 '5-habitos-matinais-transformaram-vida',
 'Descubra como pequenas mudanças na sua rotina matinal podem gerar grandes transformações pessoais e profissionais.',
 'A forma como começamos nosso dia determina como o resto dele se desenrola. Após anos testando diferentes abordagens, descobri que estes cinco hábitos matinais foram fundamentais para transformar não apenas minha produtividade, mas minha qualidade de vida como um todo.

## 1. Meditação de 10 Minutos

Começar o dia com meditação mudou completamente minha relação com o estresse e a ansiedade. Apenas 10 minutos de mindfulness pela manhã:

- Reduz os níveis de cortisol
- Melhora a capacidade de foco
- Aumenta a inteligência emocional
- Proporciona clareza mental para o dia

**Como implementar**: Comece com apenas 5 minutos usando apps como Headspace ou Calm.

## 2. Exercício Físico

Não precisa ser um treino intenso. Uma caminhada de 20 minutos ou alongamentos simples já fazem diferença:

- Libera endorfinas naturais
- Aumenta a energia para o dia
- Melhora a saúde cardiovascular
- Fortalece a disciplina mental

**Dica prática**: Deixe as roupas de exercício separadas na noite anterior.

## 3. Journaling - Escrever 3 Páginas

O hábito de escrever três páginas à mão sobre qualquer coisa que venha à mente:

- Clarifica pensamentos confusos
- Reduz a ansiedade
- Estimula a criatividade
- Funciona como terapia pessoal

**Importante**: Não se preocupe com gramática ou estrutura. É um exercício de fluxo de consciência.

## 4. Leitura de 15 Minutos

Ler logo cedo, quando a mente está fresca:

- Expande o vocabulário
- Estimula novas ideias
- Melhora a concentração
- Proporciona aprendizado contínuo

**Sugestão**: Mantenha um livro de desenvolvimento pessoal ou profissional ao lado da cama.

## 5. Planejamento do Dia

Dedicar 5 minutos para revisar e priorizar as tarefas:

- Aumenta a produtividade
- Reduz a sensação de sobrecarga
- Melhora a gestão do tempo
- Proporciona senso de propósito

**Método**: Use a técnica dos 3 MITs (Most Important Tasks) - identifique as três tarefas mais importantes do dia.

## Como Implementar Gradualmente

Não tente incorporar todos os hábitos de uma vez. Comece com um e, após 21 dias, adicione outro. A chave é a consistência, não a perfeição.

## Os Resultados

Após 6 meses mantendo essa rotina:

- Minha produtividade aumentou 40%
- Os níveis de estresse diminuíram significativamente
- Melhorou minha qualidade de sono
- Aumentou minha satisfação pessoal e profissional

Lembre-se: grandes transformações começam com pequenas ações consistentes. Sua manhã é o alicerce do seu dia extraordinário.',
 (SELECT id FROM auth.users LIMIT 1),
 (SELECT id FROM public.categories WHERE slug = 'desenvolvimento-pessoal'),
 'published',
 true,
 now()),

('O Mistério dos Buracos Negros Supermassivos',
 'misterio-buracos-negros-supermassivos',
 'Novas descobertas científicas revelam segredos fascinantes sobre os gigantes do universo e como eles moldam galáxias inteiras.',
 'Os buracos negros supermassivos são algumas das estruturas mais enigmáticas e fascinantes do universo. Com massas que podem exceder bilhões de vezes a do nosso Sol, esses gigantes cósmicos residem no centro da maioria das galáxias, incluindo a nossa Via Láctea.

## O Que São Buracos Negros Supermassivos?

Um buraco negro supermassivo é uma região do espaço-tempo onde a gravidade é tão intensa que nada, nem mesmo a luz, pode escapar. Diferentemente dos buracos negros estelares, que se formam do colapso de estrelas massivas, os supermassivos têm origens ainda debatidas pela comunidade científica.

### Sagittarius A*: Nosso Vizinho Galáctico

No centro da Via Láctea reside Sagittarius A* (Sgr A*), um buraco negro supermassivo com aproximadamente 4 milhões de massas solares. Em 2022, a colaboração do Event Horizon Telescope conseguiu capturar a primeira imagem direta deste gigante, revolucionando nossa compreensão desses objetos.

## Descobertas Recentes

### 1. Formação Precoce
Observações do Telescópio Espacial James Webb revelaram buracos negros supermassivos em galáxias muito jovens, quando o universo tinha apenas 400 milhões de anos. Isso sugere que eles se formaram muito mais rapidamente do que previamente imaginado.

### 2. Jets Relativísticos
Alguns buracos negros supermassivos ejetam jatos de material a velocidades próximas à da luz. Esses jets podem se estender por milhões de anos-luz, influenciando a formação estelar em vastas regiões do espaço.

### 3. Ondas Gravitacionais
As fusões de buracos negros supermassivos produzem ondas gravitacionais de baixa frequência, detectáveis por arrays de pulsares. Essas descobertas abrem uma nova janela para estudar o universo primordial.

## Como Eles Influenciam as Galáxias

### Regulação da Formação Estelar
Os buracos negros supermassivos atuam como "termostatos" galácticos, controlando a formação de estrelas através de:

- **Feedback energético**: A energia liberada durante a acreção de matéria aquece o gás circundante
- **Ventos galácticos**: Expulsão de material que impede o colapso gravitacional
- **Modulação química**: Redistribuição de elementos pesados pela galáxia

### A Relação M-Sigma
Existe uma correlação surpreendente entre a massa do buraco negro central e a velocidade das estrelas no núcleo da galáxia. Essa relação sugere uma coevolução entre buracos negros e suas galáxias hospedeiras.

## Mistérios Ainda Por Resolver

### Problema do "Missing Link"
Existem buracos negros estelares (dezenas de massas solares) e supermassivos (milhões a bilhões), mas poucos de massa intermediária. Como essa lacuna é preenchida?

### Crescimento Acelerado
Como buracos negros podem crescer tão rapidamente no universo jovem? Os mecanismos tradicionais de acreção não explicam completamente esse fenômeno.

### Fusões e Evolução
O que acontece quando duas galáxias com buracos negros supermassivos se fundem? Como isso afeta a estrutura resultante?

## Tecnologias de Observação

### Event Horizon Telescope
Esta rede global de radiotelescópios permite "ver" o horizonte de eventos, revelando a estrutura ao redor dos buracos negros.

### Interferometria Espacial
Futuras missões como a LISA detectarão ondas gravitacionais de fusões de buracos negros supermassivos, proporcionando insights únicos sobre sua dinâmica.

### Observatórios de Próxima Geração
O Extremely Large Telescope permitirá observações diretas de estrelas orbitando buracos negros, testando a relatividade geral em condições extremas.

## Implicações Para o Futuro

O estudo dos buracos negros supermassivos não é apenas fascinante do ponto de vista científico - ele nos ajuda a compreender:

- A evolução das galáxias ao longo do tempo cósmico
- Os limites da física em condições extremas
- O destino final do universo

À medida que nossa tecnologia avança, continuamos desvendando os segredos desses gigantes silenciosos que moldam o cosmos ao nosso redor.',
 (SELECT id FROM auth.users LIMIT 1),
 (SELECT id FROM public.categories WHERE slug = 'ciencia'),
 'published',
 false,
 now()),

('Liderança Inspiradora: Como Motivar Sua Equipe',
 'lideranca-inspiradora-motivar-equipe',
 'Estratégias práticas para desenvolver habilidades de liderança e criar um ambiente de trabalho mais produtivo e positivo.',
 'Conteúdo detalhado sobre liderança inspiradora...',
 (SELECT id FROM auth.users LIMIT 1),
 (SELECT id FROM public.categories WHERE slug = 'sucesso-lideranca'),
 'published',
 false,
 now());