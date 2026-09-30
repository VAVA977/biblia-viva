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
  {bookId:2,book:'Êxodo',slug:'exodo',src:'/anchors/exodo.png',alt:'Âncora visual de Êxodo: escravidão e clamor, Páscoa e libertação, mar e salvação, aliança no Sinai e tabernáculo e presença.',approved:true,uploaded:false},
  {bookId:3,book:'Levítico',slug:'levitico',src:'/anchors/levitico.png',alt:'Âncora visual de Levítico: sacrifícios, sacerdócio, pureza, expiação, vida santa e festas do Senhor.',approved:true,uploaded:false},
  {bookId:4,book:'Números',slug:'numeros',src:'/anchors/numeros.png',alt:'Âncora visual de Números: organização, santificação, incredulidade, disciplina, nova geração e preparação para a terra.',approved:true,uploaded:false},
  {bookId:5,book:'Deuteronômio',slug:'deuteronomio',src:'/anchors/deuteronomio.png',alt:'Âncora visual de Deuteronômio: memória, aliança, amor, obediência, escolha e compromisso às portas da terra prometida.',approved:true,uploaded:false},
  {bookId:6,book:'Josué',slug:'josue',src:'/anchors/josue.png',alt:'Âncora visual de Josué: entrada, conquista, distribuição da terra e renovação da aliança.',approved:true,uploaded:false},
  {bookId:7,book:'Juízes',slug:'juizes',src:'/anchors/juizes.png',alt:'Âncora visual de Juízes: infidelidade, opressão, clamor, libertação e repetição do ciclo.',approved:true,uploaded:false},
  {bookId:19,book:'Salmos',slug:'salmos',src:'/anchors/salmos.png',alt:'Âncora visual de Salmos: oração, lamento, louvor, sabedoria, realeza e confiança no Senhor.',approved:true,uploaded:false},
  {bookId:23,book:'Isaías',slug:'isaias',src:'/anchors/isaias.png',alt:'Âncora visual de Isaías: santidade, juízo, esperança, Servo, Rei e restauração.',approved:true,uploaded:false},
  {bookId:43,book:'João',slug:'joao',src:'/anchors/joao.png',alt:'Âncora visual de João: revelação de Jesus, sinais e ensino, hora da glória, ressurreição, encontro e envio.',approved:true,uploaded:false},
  {bookId:45,book:'Romanos',slug:'romanos',src:'/anchors/romanos.png',alt:'Âncora visual de Romanos: pecado, justificação, vida no Espírito, Israel e as nações, vida cristã e missão.',approved:true,uploaded:false},
  {bookId:66,book:'Apocalipse',slug:'apocalipse',src:'/anchors/apocalipse.png',alt:'Âncora visual de Apocalipse: Cristo entre as igrejas, o Cordeiro, juízo, conflito, vitória e nova criação.',approved:true,uploaded:false}
];

export const visualAnchorByBookId = Object.fromEntries(visualAnchors.map(anchor => [anchor.bookId, anchor])) as Record<number, VisualAnchor>;
