export type VisualAnchor = {
  bookId: number;
  book: string;
  slug: string;
  src: string;
  alt: string;
  approved: boolean;
  uploaded: boolean;
};

export const visualAnchors: VisualAnchor[] = [
  {bookId:1,book:'Gênesis',slug:'genesis',src:'/file_00000000e7c8820ea8ca74068209ffc6.png',alt:'Âncora visual de Gênesis: criação, queda, dilúvio, Babel, Abraão, Isaque, Jacó, José e chegada ao Egito.',approved:true,uploaded:true},
  {bookId:2,book:'Êxodo',slug:'exodo',src:'/file_000000007334820e9d31256019f56338.png',alt:'Âncora visual de Êxodo: escravidão e clamor, Páscoa e libertação, mar e salvação, aliança no Sinai e tabernáculo e presença.',approved:true,uploaded:true},
  {bookId:3,book:'Levítico',slug:'levitico',src:'/file_000000004f3c820e8bff7b795c43e79f.png',alt:'Âncora visual de Levítico: sacrifícios, sacerdócio, pureza, expiação, vida santa e festas do Senhor.',approved:true,uploaded:true},
  {bookId:4,book:'Números',slug:'numeros',src:'/file_00000000b740820ebdf92a40e6b7dec9.png',alt:'Âncora visual de Números: organização, santificação, incredulidade, disciplina, nova geração e preparação para a terra.',approved:true,uploaded:true},
  {bookId:5,book:'Deuteronômio',slug:'deuteronomio',src:'/file_00000000d074820ead4d657e320a44f4.png',alt:'Âncora visual de Deuteronômio: memória, aliança, amor, obediência, escolha e compromisso às portas da terra prometida.',approved:true,uploaded:true},
  {bookId:6,book:'Josué',slug:'josue',src:'/file_00000000a59c820ebcddd39ec1795c0f.png',alt:'Âncora visual de Josué: entrada, conquista, distribuição da terra e renovação da aliança.',approved:true,uploaded:true},
  {bookId:7,book:'Juízes',slug:'juizes',src:'/file_000000004d94820e92e26bb587d0ea55.png',alt:'Âncora visual de Juízes: infidelidade, opressão, clamor, libertação e repetição do ciclo.',approved:true,uploaded:true},
  {bookId:19,book:'Salmos',slug:'salmos',src:'/file_00000000105c820eb0c88b3444a4ce9c.png',alt:'Âncora visual de Salmos: oração, lamento, louvor, sabedoria, realeza e confiança no Senhor.',approved:true,uploaded:true},
  {bookId:23,book:'Isaías',slug:'isaias',src:'/file_000000002348820e9f70f25555f3fa90.png',alt:'Âncora visual de Isaías: santidade, juízo, esperança, Servo, Rei e restauração.',approved:true,uploaded:true},
  {bookId:43,book:'João',slug:'joao',src:'/file_0000000022fc820e8fd4f957c6f15b79.png',alt:'Âncora visual de João: revelação de Jesus, sinais e ensino, hora da glória, ressurreição, encontro e envio.',approved:true,uploaded:true},
  {bookId:45,book:'Romanos',slug:'romanos',src:'/file_00000000d1b8820ebc1dc038e54ae3b9.png',alt:'Âncora visual de Romanos: pecado, justificação, vida no Espírito, Israel e as nações, vida cristã e missão.',approved:true,uploaded:true},
  {bookId:66,book:'Apocalipse',slug:'apocalipse',src:'/file_00000000c2dc820e9efe35bdc9fe0a35.png',alt:'Âncora visual de Apocalipse: Cristo entre as igrejas, o Cordeiro, juízo, conflito, vitória e nova criação.',approved:true,uploaded:true}
];

export const visualAnchorByBookId = Object.fromEntries(visualAnchors.map(anchor => [anchor.bookId, anchor])) as Record<number, VisualAnchor>;
