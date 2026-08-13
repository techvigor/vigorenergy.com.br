import { Check, ArrowRight } from 'lucide-react';

const naoMuda = [
  'Sua distribuidora continua sendo a Equatorial',
  'Mesma rede, mesmo poste, mesmo relógio',
  'Em caso de falta de luz, você liga pra Equatorial igual sempre',
  'Seu consumo e seus hábitos',
];

const muda = [
  'O valor da tarifa de consumo: até 28% menor',
  'A tarifa de bandeira: você paga metade',
  'Quem gera a sua energia: usinas aqui de Goiás',
  'O quanto sobra no seu bolso todo mês',
];

export default function OQueMudaNaoMuda() {
  return (
    <section className="py-16 md:py-24 bg-offwhite">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-text-dark text-center mb-4">
          O que muda e o que não muda
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-xl mx-auto">
          A energia continua chegando do mesmo jeito. Só a conta fica mais leve.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-light p-6 md:p-8">
            <h3 className="text-sm font-black uppercase tracking-wide text-text-muted mb-5">Não muda</h3>
            <ul className="space-y-4">
              {naoMuda.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-light flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-text-muted" />
                  </span>
                  <span className="text-text-dark">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-primary rounded-2xl p-6 md:p-8 text-white">
            <h3 className="text-sm font-black uppercase tracking-wide text-white mb-5">Muda</h3>
            <ul className="space-y-4">
              {muda.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <ArrowRight size={12} className="text-white" />
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
