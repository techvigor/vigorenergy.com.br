import { FileText, ListChecks, TrendingDown } from 'lucide-react';

const passos = [
  {
    icon: FileText,
    titulo: 'Você manda sua fatura.',
    texto: 'A Júlia faz a simulação com os seus números, não com estimativa.',
  },
  {
    icon: ListChecks,
    titulo: 'Você escolhe o plano.',
    texto: 'Sem fidelidade, 12 ou 24 meses — o que fizer sentido pra você.',
  },
  {
    icon: TrendingDown,
    titulo: 'O desconto aparece na sua conta.',
    texto: 'Sem instalar nada, sem mexer no seu telhado, sem trocar de distribuidora.',
  },
];

export default function ComoFunciona() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-text-dark text-center mb-12">Como funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {passos.map((passo, i) => (
            <div key={passo.titulo} className="text-center flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <passo.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-white text-sm font-black flex items-center justify-center shadow-sm">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2">{passo.titulo}</h3>
              <p className="text-text-muted leading-relaxed">{passo.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
