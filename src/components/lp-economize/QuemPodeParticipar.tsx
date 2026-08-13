import { MapPin, Receipt, CheckCircle2 } from 'lucide-react';

const criterios = [
  { icon: MapPin, texto: 'mora ou tem empresa no estado de Goiás' },
  { icon: Receipt, texto: 'tem conta de luz acima de R$300 por mês' },
  { icon: CheckCircle2, texto: 'mantém as faturas da Equatorial em dia' },
];

export default function QuemPodeParticipar() {
  return (
    <section className="py-16 md:py-24 bg-vigor-dark text-white">
      <div className="max-w-2xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-8">A Vigor atende quem:</h2>
        <ul className="space-y-4 text-left inline-block">
          {criterios.map((c) => (
            <li key={c.texto} className="flex items-center gap-3">
              <c.icon size={20} className="text-accent flex-shrink-0" />
              <span className="text-base md:text-lg">{c.texto}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-white/60 text-sm max-w-sm mx-auto">
          Se você não se encaixa hoje, guarda a gente pra depois.
        </p>
      </div>
    </section>
  );
}
