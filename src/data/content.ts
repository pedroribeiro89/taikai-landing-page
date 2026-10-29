export const site = {
  title: '3º Torneio de Kendo de Belo Horizonte',
  description:
    '3º Torneio de Kendo de Belo Horizonte, Minas Gerais. Informações sobre o evento, senseis convidados, local e hospedagem.',
  url: 'https://kendo-bh.netlify.app',
  locationName: 'Belo Horizonte',
  region: 'Minas Gerais',
  startDate: '2026-11-20',
  endDate: '2026-11-22',
};

export const hero = {
  titleLines: ['3º Torneio de Kendo', 'de Belo Horizonte'],
  location: 'Belo Horizonte · Minas Gerais',
  date: '20, 21 e 22 de novembro de 2026',
  kanji: '剣道',
};

export const sobre = {
  heading: 'Sobre o torneio',
  paragraphs: [
    'O Kendo BH e o Bloco Centro-Leste (DF, ES, MG, RJ) têm o prazer de convidar todos a participar do 3º Torneio de Kendo de Belo Horizonte, a ser realizado nos dias 20, 21 e 22 de novembro de 2026 em Belo Horizonte, Minas Gerais.',
    'Ao longo dos três dias, o evento reúne seminários de arbitragem e de preparação para os exames, exames oficiais de graduação (1º Kyu a 3º Dan) e o torneio, com a participação de senseis convidados do Brasil e do exterior.',
  ],
  schedule: [
    {
      date: '20 de novembro — sexta (feriado)',
      activities: [
        'Seminários de arbitragem e de preparação para o torneio',
        'Godogeiko',
      ],
    },
    {
      date: '21 de novembro — sábado',
      activities: [
        'Seminários preparatórios para os exames',
        'Exames de graduação (1º Kyu a 3º Dan)',
        'Godogeiko',
      ],
    },
    {
      date: '22 de novembro — domingo',
      activities: [
        'Abertura, competições e premiação do torneio',
      ],
    },
  ],
  docs: [
    { label: 'Carta-convite', href: '/docs/carta-convite.pdf' },
  ],
};

export const senseis = {
  heading: 'Senseis convidados',
  items: [
    { name: 'Yosuke Kataoka',   rank: '7º Dan Kyoshi',  origin: 'Japão',            flag: '/flags/japao.svg' },
    { name: 'Adrian Yoneda',    rank: '7º Dan Kyoshi',  origin: 'São Paulo',        flag: '/flags/sao-paulo.svg' },
    // { name: 'André Queiroz',    rank: '6º Dan Renshi',  origin: 'Rio de Janeiro',   flag: '/flags/rio-de-janeiro.svg' },
    { name: 'Satoshi Ueda',     rank: '6º Dan Renshi',  origin: 'Japão',            flag: '/flags/japao.svg' },
    { name: 'Márcio Felisardo', rank: '6º Dan Renshi',  origin: 'Rio de Janeiro',   flag: '/flags/rio-de-janeiro.svg' },
    { name: 'Gustavo Takano',   rank: '6º Dan Renshi',  origin: 'Distrito Federal', flag: '/flags/distrito-federal.svg' },
    { name: 'Thierry Antoine',  rank: '5º Dan',         origin: 'Bélgica',          flag: '/flags/belgica.svg' },
    { name: 'Leonardo Sato',    rank: '5º Dan',         origin: 'Rio de Janeiro',   flag: '/flags/rio-de-janeiro.svg' },
    { name: 'Patrick Bonaly',   rank: '5º Dan',         origin: 'Rio de Janeiro',   flag: '/flags/rio-de-janeiro.svg' },
  ],
};

export const local = {
  heading: 'Local · Como chegar',
  venue: 'Quadra do Coleguium Santa Amélia',
  address: 'Rua das Canárias, 2171 — Santa Branca, Belo Horizonte / MG',
  mapUrl:
    'https://maps.app.goo.gl/B8ZJh3MdiCbiCL8c7',
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11596.675722972259!2d-43.98390687697783!3d-19.848225970285103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa69037fefe5221%3A0x3bc70c1fff9d1334!2sColeguium%20-%20Santa%20Am%C3%A9lia!5e0!3m2!1spt-BR!2sbr!4v1793123573681!5m2!1spt-BR!2sbr',
};

export const hospedagem = {
  heading: 'Hospedagem',
  intro: 'Sugestões de hotéis próximos ao local do torneio.',
  items: [
    { name: 'Pampulha Design Hotel', note: 'Região da Pampulha', href: 'https://www.booking.com/Share-r1pu7t' },
    { name: 'Pousada Lagoa', note: 'Bairro Jardim Atlântico', href: 'https://www.booking.com/Share-zYZwoOH' },
    { name: 'Rede Andrade Pampulha', note: 'Região da Pampulha', href: 'https://www.booking.com/Share-5xkZFg' },
    { name: 'VIA SPE - Pousada', note: 'Bairro Jardim Atlântico', href: 'https://www.booking.com/Share-LehXjk' },
    { name: 'Itapoa Executive Hotel', note: 'Bairro Itapoã', href: 'https://www.booking.com/Share-BKwGZO' },
  ],
};

export const footer = {
  org: 'Kendo Belo Horizonte',
  contact: 'kendobeaga@gmail.com',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/kendobh/' },
  ],
};
