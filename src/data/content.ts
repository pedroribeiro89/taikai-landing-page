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
    { label: 'Info do torneio', href: '/docs/info-campeonato.pdf' },
    { label: 'Info de exames', href: '/docs/info-exames.pdf' },
    { label: 'Carta-convite', href: '/docs/carta-convite.pdf' },
  ],
};

export const senseis = {
  heading: 'Senseis convidados',
  items: [
    { name: 'Yosuke Kataoka',   rank: '7º Dan Kyoshi',  origin: 'Japão',            flag: '/flags/japao.svg' },
    { name: 'Adrian Yoneda',    rank: '7º Dan Kyoshi',  origin: 'São Paulo',        flag: '/flags/sao-paulo.svg' },
    { name: 'Márcio Felisardo', rank: '6º Dan Renshi',  origin: 'Rio de Janeiro',   flag: '/flags/rio-de-janeiro.svg' },
    { name: 'Gustavo Takano',   rank: '6º Dan Renshi',  origin: 'Distrito Federal', flag: '/flags/distrito-federal.svg' },
    { name: 'Leonardo Sato',    rank: '5º Dan',         origin: 'Rio de Janeiro',   flag: '/flags/rio-de-janeiro.svg' },
  ],
};

export const local = {
  heading: 'Local · Como chegar',
  venue: 'Quadra poliesportiva do Colégio Militar de Belo Horizonte',
  address: 'Av. Mal. Esperidião Rosa, 400 — São Francisco, Belo Horizonte / MG',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Col%C3%A9gio+Militar+de+Belo+Horizonte',
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10040.47352080404!2d-43.96092708301663!3d-19.87179684572131!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6908bdd49300b%3A0x960cd350466db7ff!2sCol%C3%A9gio%20Militar%20de%20Belo%20Horizonte!5e0!3m2!1spt-BR!2sbr!4v1790094499787!5m2!1spt-BR!2sbr',
};

export const hospedagem = {
  heading: 'Hospedagem',
  intro: 'Sugestões de hotéis próximos ao local do torneio.',
  items: [
    { name: 'Bristol Jaraguá',           note: 'Bairro Jaraguá',    href: 'https://www.booking.com/Share-C20iMji' },
    { name: 'Allia Gran Pampulha Suítes', note: 'Região da Pampulha', href: 'https://www.booking.com/Share-8PqCrX' },
    { name: 'Ibis Styles BH Pampulha',    note: 'Região da Pampulha', href: 'https://www.booking.com/Share-q712Gc' },
    { name: 'Soft Inn Belo Horizonte',    note: 'Belo Horizonte',    href: 'https://www.booking.com/Share-Wn4D8G' },
    { name: 'Quality Pampulha',           note: 'Região da Pampulha', href: 'https://www.booking.com/Share-fqITRd' },
  ],
};

export const footer = {
  org: 'Kendo Belo Horizonte',
  contact: 'kendobeaga@gmail.com',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/kendobh/' },
  ],
};
