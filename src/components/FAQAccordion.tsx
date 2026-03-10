import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'Como funciona a assinatura de energia solar?',
        answer:
            'A Vigor Energy possui fazendas solares que geram energia limpa. Ao assinar nosso serviço, os créditos de energia gerados são transferidos para sua conta de luz, gerando um desconto automático. Você não precisa instalar nenhum equipamento na sua residência.',
    },
    {
        question: 'Preciso fazer alguma instalação na minha casa?',
        answer:
            'Não! Esse é um dos maiores diferenciais da Vigor Energy. Toda a geração de energia acontece em nossas fazendas solares. Você só precisa ser cliente de uma distribuidora de energia participante.',
    },
    {
        question: 'Qual a economia média na conta de luz?',
        answer:
            'Nossos clientes economizam em média de 15% a 28% na conta de luz, dependendo do seu consumo e região. Ao fazer a simulação, informamos exatamente quanto você pode economizar.',
    },
    {
        question: 'Existe algum contrato de fidelidade?',
        answer:
            'Não! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas de cancelamento. Acreditamos que você vai ficar por causa dos benefícios, não por obrigação.',
    },
    {
        question: 'Como acompanho minha economia?',
        answer:
            'Através do nosso aplicativo exclusivo, disponível para iOS e Android. Nele você acompanha sua economia em tempo real, histórico de consumo, faturas e muito mais.',
    },
    {
        question: 'Em quais regiões a Vigor Energy atende?',
        answer:
            'Atualmente atendemos em diversas regiões do Brasil. Para verificar a disponibilidade na sua cidade, basta preencher o formulário de simulação e nossa equipe entrará em contato.',
    },
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 md:py-28 bg-white">
            <div className="max-w-3xl mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
                        Dúvidas
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                        Perguntas Frequentes
                    </h2>
                    <p className="text-text-muted text-lg">
                        Tire suas dúvidas sobre a energia solar por assinatura.
                    </p>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`rounded-2xl border transition-all duration-200 ${isOpen
                                        ? 'border-primary/20 bg-primary/[0.02] shadow-sm'
                                        : 'border-gray-light bg-offwhite hover:border-gray-light/80'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                                >
                                    <span className="text-base font-semibold text-text-dark">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        size={20}
                                        className={`flex-shrink-0 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="px-6 pb-5 text-text-muted leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
