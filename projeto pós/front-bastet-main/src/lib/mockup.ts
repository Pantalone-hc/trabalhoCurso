export type Curso = {
  id: string;
  nome: string;
  descricao: string;
  capa: string;
  inscricoes: number;
  inicio: Date;
  inscricao_cancelada?: boolean;
  inscrito?: boolean;
};

export type Usuario = {
  nome: string;
  email: string;
  senha: string;
  nascimento: Date;
};

export const UsurioMockup: Usuario[] = [
    {
        email: "teste@email.com",
        nascimento: new Date(1990,4,31),
        nome: "Jason McGaiver",
        senha: "1234"
    }
]

export const CursosMockup: Curso[] = [
  {
    id: "dev-web-react-nextjs",
    nome: "Desenvolvimento Web com React e Next.js",
    descricao:
      "Aprenda a criar websites modernos e interativos com as tecnologias mais populares do mercado.",
    capa: "https://img-c.udemycdn.com/course/240x135/4160208_71be_5.jpg",
    inscricoes: 1234,
    inicio: new Date(2024, 5, 20),
    inscricao_cancelada: true,
    inscrito: true
  },
  {
    id: "intro-ia",
    nome: "Introdução à Inteligência Artificial",
    descricao:
      "Descubra os fundamentos da Inteligência Artificial e suas aplicações no mundo real.",
    capa: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos.jpeg",
    inscricoes: 5678,
    inicio: new Date(2024, 6, 15),
  },
  {
    id: "foto-iniciantes",
    nome: "Fotografia para Iniciantes",
    descricao:
      "Aprenda os princípios básicos da fotografia e tire fotos incríveis com seu celular ou câmera.",
    capa: "https://img-c.udemycdn.com/course/240x135/1680762_24a3_4.jpg",
    inscricoes: 9012,
    inicio: new Date(2024, 7, 10),
  },
  {
    id: "ingles-instrumental",
    nome: "Inglês Instrumental para o Mercado de Trabalho",
    descricao:
      "Aprimore suas habilidades de comunicação em inglês e prepare-se para os desafios do mercado profissional.",
    capa: "https://img-c.udemycdn.com/course/240x135/2927102_7440_13.jpg",
    inscricoes: 13579,
    inicio: new Date(2024, 8, 5),
    inscricao_cancelada: false,
    inscrito: true
  },
  {
    id: "financas-iniciantes",
    nome: "Finanças Pessoais para Iniciantes",
    descricao:
      "Aprenda a gerenciar seu dinheiro de forma inteligente e alcançar seus objetivos financeiros.",
    capa: "https://img-c.udemycdn.com/course/750x422/1021106_fa99_6.jpg",
    inscricoes: 17263,
    inicio: new Date(2024, 9, 1),
  },
  {
    id: "culinaria-vegetariana",
    nome: "Culinária Vegetariana",
    descricao:
      "Descubra o mundo da culinária vegetariana com receitas deliciosas e nutritivas.",
    capa: "https://img-c.udemycdn.com/course/750x422/2846294_d765_5.jpg",
    inscricoes: 21947,
    inicio: new Date(2024, 9, 20),
    inscricao_cancelada: false,
    inscrito: true
  },
  {
    id: "yoga-iniciantes",
    nome: "Yoga para Iniciantes",
    descricao:
      "Aprenda os princípios básicos da yoga e melhore sua flexibilidade, força e bem-estar.",
    capa: "https://img-c.udemycdn.com/course/240x135/1222344_23a3_2.jpg",
    inscricoes: 26631,
    inicio: new Date(2024, 10, 15),
  },
  {
    id: "produtividade-pessoal",
    nome: "Produtividade Pessoal",
    descricao:
      "Aprenda técnicas para gerenciar seu tempo, organizar suas tarefas e aumentar sua produtividade.",
    capa: "https://img-c.udemycdn.com/course/750x422/1692770_85c5_4.jpg",
    inscricoes: 31315,
    inicio: new Date(2024, 11, 5),
  },
];
