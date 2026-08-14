import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    pergunta: 'Vai faltar energia na minha casa?',
    resposta:
      'Não. Sua energia continua chegando pela rede da Equatorial, exatamente como hoje. Em caso de queda, o atendimento é o mesmo de sempre.',
  },
  {
    pergunta: 'Preciso instalar alguma coisa?',
    resposta: 'Nada. Sem painel, sem obra, sem equipamento, sem mexer no seu telhado.',
  },
  {
    pergunta: 'Quanto custa pra entrar?',
    resposta: 'Nada. Não há taxa de adesão nem investimento inicial.',
  },
  {
    pergunta: 'E se eu quiser sair?',
    resposta: 'Depende do plano que você escolher. No plano sem fidelidade, você cancela quando quiser, sem multa.',
  },
  {
    pergunta: 'Em quanto tempo o desconto aparece?',
    // TODO: VALIDAR prazo real com o comercial antes de publicar.
    resposta:
      'O prazo varia conforme o ciclo de faturamento da sua distribuidora. A Júlia confirma a data exata pra você durante a sua simulação, com a sua fatura em mãos.',
  },
  {
    pergunta: 'Já tenho painel solar. Serve pra mim?',
    // TODO: VALIDAR resposta com o comercial antes de publicar.
    resposta:
      'Depende de como o seu sistema está configurado hoje. Manda sua fatura pra Júlia no WhatsApp que ela avalia seu caso certinho.',
  },
  {
    pergunta: 'Minha conta é menor que R$300. Posso participar?',
    resposta:
      'Hoje ainda não. O modelo só compensa acima desse valor — abaixo disso, você teria trabalho sem economia real.',
  },
];

export default function FaqLp() {
  const [abertoIndex, setAbertoIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-text-dark text-center mb-10">
          Perguntas frequentes
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const aberto = abertoIndex === index;
            return (
              <div
                key={faq.pergunta}
                className={`rounded-2xl border transition-colors ${
                  aberto ? 'border-primary/30 bg-primary/[0.03]' : 'border-gray-light bg-offwhite'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setAbertoIndex(aberto ? null : index)}
                  aria-expanded={aberto}
                  aria-controls={`lp-faq-painel-${index}`}
                  id={`lp-faq-botao-${index}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-text-dark">{faq.pergunta}</span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-text-muted transition-transform duration-200 ${aberto ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  id={`lp-faq-painel-${index}`}
                  role="region"
                  aria-labelledby={`lp-faq-botao-${index}`}
                  hidden={!aberto}
                  className="px-5 pb-4"
                >
                  <p className="text-text-muted leading-relaxed">{faq.resposta}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
