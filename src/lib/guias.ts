// Guias técnicos curtos. Conteúdo orientativo: não substitui o texto oficial das NRs
// nem a avaliação do responsável técnico (SESMT/PGR) de cada empresa.

export type GuiaBloco = { titulo: string; paragrafos?: string[]; itens?: string[] };

export type Guia = {
  slug: string;
  norma: string;
  minutos: number;
  titulo: string;
  resumo: string;
  blocos: GuiaBloco[];
};

export const GUIAS: Guia[] = [
  {
    slug: "kit-nr35-torre-eolica",
    norma: "NR-35",
    minutos: 6,
    titulo: "Kit para torre eólica: o que não pode faltar",
    resumo:
      "Subir em aerogerador exige mais do que um cinturão. Veja o que compõe um kit completo de trabalho em altura e o que precisa estar resolvido antes da subida.",
    blocos: [
      {
        titulo: "Antes de subir",
        paragrafos: [
          "A NR-35 trata o trabalho em altura como atividade planejada. O EPI é a última barreira: antes dele vêm a capacitação, a análise de risco e a autorização da empresa.",
        ],
        itens: [
          "Trabalhador capacitado em NR-35 e com treinamento periódico em dia",
          "Atestado de saúde ocupacional (ASO) que considere a aptidão para trabalho em altura",
          "Análise de risco e, quando aplicável, permissão de trabalho emitida",
          "Plano de emergência e resgate definido para aquela torre",
        ],
      },
      {
        titulo: "Proteção contra quedas",
        itens: [
          "Cinturão de segurança tipo paraquedista, com pontos de ancoragem compatíveis com o sistema da torre",
          "Talabarte duplo (em Y) com absorvedor de energia, para manter conexão contínua nas transições",
          "Trava-quedas compatível com a linha de vida rígida ou flexível instalada na escada da torre",
          "Conectores (mosquetões) com trava, adequados às estruturas onde serão usados",
        ],
      },
      {
        titulo: "Cabeça, corpo e mãos",
        itens: [
          "Capacete com jugular, próprio para trabalho em altura",
          "Óculos de proteção e protetor auditivo para a nacele",
          "Luvas adequadas à atividade e calçado de segurança",
          "Vestimenta antichama e luvas isolantes quando houver intervenção elétrica (NR-10)",
        ],
      },
      {
        titulo: "Inspeção e reposição",
        paragrafos: [
          "Todo equipamento de proteção contra quedas deve ser inspecionado antes de cada uso e periodicamente, com registro. Peça que tenha retido uma queda ou apresente dano deve ser retirada de uso.",
          "Confira também o Certificado de Aprovação (CA) de cada item: número, validade e se o equipamento corresponde ao certificado.",
        ],
      },
    ],
  },
  {
    slug: "como-consultar-ca-epi",
    norma: "NR-6",
    minutos: 4,
    titulo: "Como consultar a validade do CA de um EPI",
    resumo:
      "O Certificado de Aprovação é o que garante que o EPI foi avaliado e aprovado pelo Ministério do Trabalho. Veja onde encontrar o número e como conferir.",
    blocos: [
      {
        titulo: "O que é o CA",
        paragrafos: [
          "Pela NR-6, todo equipamento de proteção individual só pode ser comercializado e utilizado com Certificado de Aprovação (CA) emitido pelo Ministério do Trabalho e Emprego. O número identifica o modelo aprovado e tem prazo de validade.",
        ],
      },
      {
        titulo: "Onde encontrar o número",
        itens: [
          "Gravado ou impresso no próprio equipamento (capacetes, calçados, luvas)",
          "Na etiqueta costurada (vestimentas e cinturões)",
          "Na embalagem e na nota fiscal, quando o fornecedor informa",
        ],
      },
      {
        titulo: "Como conferir",
        itens: [
          "Acesse a consulta de Certificado de Aprovação do Ministério do Trabalho e Emprego (sistema CAEPI, pelo portal gov.br)",
          "Digite o número do CA e confira a situação: o certificado precisa estar válido",
          "Compare a descrição e as fotos do certificado com o equipamento que você tem em mãos",
          "Verifique o fabricante e as restrições de uso descritas no certificado",
        ],
      },
      {
        titulo: "Na JacoSeg",
        paragrafos: [
          "Nos orçamentos para empresas, informamos o número do CA de cada item e conferimos a validade antes do envio, para facilitar a ficha de entrega de EPI e as auditorias.",
        ],
      },
    ],
  },
  {
    slug: "nr22-protecao-respiratoria",
    norma: "NR-22",
    minutos: 5,
    titulo: "NR-22 atualizada: o que muda na proteção respiratória",
    resumo:
      "A norma de segurança na mineração foi atualizada e ganhou atenção específica à poeira mineral. Veja como isso se reflete na escolha e no uso de respiradores.",
    blocos: [
      {
        titulo: "O que mudou",
        paragrafos: [
          "A NR-22 foi atualizada pela Portaria MTE nº 105/2026, que incluiu um anexo dedicado à poeira mineral. Para as mineradoras, isso reforça o controle da exposição e, quando as medidas coletivas não bastam, o uso correto de proteção respiratória.",
          "Consulte sempre o texto oficial da norma e o responsável técnico da empresa para os requisitos aplicáveis à sua operação.",
        ],
      },
      {
        titulo: "Escolhendo o respirador",
        itens: [
          "Peças semifaciais filtrantes PFF2 ou PFF3, conforme a avaliação de risco",
          "Respiradores semifaciais ou faciais inteiros com filtros mecânicos (P2/P3) e, quando houver gases e vapores, filtros químicos combinados",
          "Seleção feita a partir da avaliação de exposição, não só do tipo de atividade",
        ],
      },
      {
        titulo: "Uso que realmente protege",
        itens: [
          "Ensaio de vedação para garantir o ajuste ao rosto de cada trabalhador",
          "Barba e costeletas na área de vedação comprometem a proteção",
          "Troca de filtros e peças conforme o fabricante e as condições de uso",
          "Guarda em local limpo e treinamento sobre colocação e retirada",
        ],
      },
      {
        titulo: "Como podemos ajudar",
        paragrafos: [
          "Montamos o pedido por função e frente de trabalho, com o CA de cada respirador e filtro, e programamos a reposição para que nada falte no subsolo.",
        ],
      },
    ],
  },
];

export function getGuia(slug: string) {
  return GUIAS.find((g) => g.slug === slug);
}
