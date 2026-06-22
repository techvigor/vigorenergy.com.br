import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
    {
        title: '1. Aceitação dos Termos',
        content: `Ao acessar ou utilizar os serviços da Vigor Energy, você declara ter lido, compreendido e concordado com estes Termos de Uso. Caso não concorde com qualquer disposição aqui prevista, solicitamos que não utilize nossos serviços.

Estes Termos constituem um acordo juridicamente vinculante entre você ("Cliente") e a **Vigor Energy Soluções em Energia Ltda.**, inscrita no CNPJ sob nº 00.000.000/0001-00, com sede na R. 7, 530 - St. Oeste, Goiânia - GO, 74110-090.`,
    },
    {
        title: '2. Descrição dos Serviços',
        content: `A Vigor Energy oferece o serviço de **energia solar por assinatura**, que consiste em:

• Alocação de créditos de energia gerada por usinas solares fotovoltaicas cadastradas junto à distribuidora local.
• Transferência dos créditos de energia para a unidade consumidora do Cliente, conforme regulamentação da ANEEL.
• Geração de economias na fatura de energia elétrica do Cliente, sem necessidade de instalação de equipamentos em sua residência ou empresa.
• Acesso à plataforma digital para acompanhamento de consumo, créditos gerados e faturas.`,
    },
    {
        title: '3. Elegibilidade e Cadastro',
        content: `Para contratar os serviços da Vigor Energy, o Cliente deve:

• Ser pessoa física maior de 18 anos ou pessoa jurídica devidamente constituída.
• Possuir unidade consumidora ativa na área de concessão das distribuidoras parceiras da Vigor Energy.
• Fornecer informações verídicas, completas e atualizadas durante o cadastro.
• Manter seus dados cadastrais atualizados durante toda a vigência do contrato.

O Cliente é responsável pela confidencialidade de suas credenciais de acesso à plataforma e por todas as atividades realizadas em sua conta.`,
    },
    {
        title: '4. Contratação e Vigência',
        content: `O contrato de prestação de serviços é celebrado pelo prazo mínimo de **12 (doze) meses**, renovável automaticamente por períodos iguais, salvo notificação de rescisão com antecedência mínima de 30 dias antes do vencimento.

O início da geração de créditos ocorre em até 60 dias após a conclusão do processo de habilitação junto à distribuidora de energia, conforme prazos regulatórios da ANEEL e da distribuidora local. A Vigor Energy não se responsabiliza por atrasos imputáveis à distribuidora ou a órgãos reguladores.`,
    },
    {
        title: '5. Preços e Pagamento',
        content: `Os valores mensais são definidos no contrato de adesão e correspondem à quantidade de créditos de energia alocados. O faturamento ocorre mensalmente, com vencimento conforme data acordada no contrato.

• O não pagamento no prazo sujeita o Cliente à incidência de multa de 2% e juros de 1% ao mês sobre o valor em aberto.
• Após 60 dias de inadimplência, a Vigor Energy reserva-se o direito de suspender a geração de créditos até a regularização.
• Os preços podem ser reajustados anualmente com base no IGP-M ou índice substituto, com aviso prévio de 30 dias.`,
    },
    {
        title: '6. Obrigações do Cliente',
        content: `O Cliente compromete-se a:

• Manter a unidade consumidora em situação regular junto à distribuidora de energia.
• Não ceder, transferir ou sublicenciar os créditos de energia para terceiros sem autorização expressa da Vigor Energy.
• Notificar imediatamente a Vigor Energy sobre qualquer alteração na titularidade da unidade consumidora.
• Fornecer acesso às faturas de energia quando solicitado para fins de análise e otimização do serviço.
• Utilizar a plataforma digital em conformidade com a legislação aplicável e estes Termos.`,
    },
    {
        title: '7. Obrigações da Vigor Energy',
        content: `A Vigor Energy compromete-se a:

• Garantir a alocação dos créditos de energia contratados, observados os prazos regulatórios.
• Fornecer suporte técnico e atendimento ao cliente durante horário comercial.
• Manter a plataforma digital disponível com disponibilidade mínima de 99% ao mês, exceto em janelas de manutenção programada.
• Comunicar com antecedência qualquer alteração relevante nos serviços ou nestes Termos.
• Tratar os dados do Cliente em conformidade com a Política de Privacidade e a LGPD.`,
    },
    {
        title: '8. Limitação de Responsabilidade',
        content: `A Vigor Energy não se responsabiliza por:

• Interrupções no fornecimento de energia elétrica ou falhas na infraestrutura da distribuidora local.
• Variações climáticas que afetem temporariamente a geração de energia nas usinas solares.
• Danos indiretos, lucros cessantes ou perdas consequenciais decorrentes do uso dos serviços.
• Atrasos causados por decisões regulatórias, mudanças na legislação ou atos de terceiros fora do controle da Vigor Energy.

A responsabilidade total da Vigor Energy, em qualquer hipótese, fica limitada ao valor pago pelo Cliente nos 12 meses anteriores ao evento gerador do dano.`,
    },
    {
        title: '9. Rescisão',
        content: `**Rescisão pelo Cliente:** O contrato pode ser rescindido pelo Cliente mediante notificação escrita com antecedência mínima de 30 dias. Rescisões antecipadas dentro do prazo mínimo de 12 meses sujeitam-se à multa prevista no contrato de adesão.

**Rescisão pela Vigor Energy:** A Vigor Energy pode rescindir o contrato em caso de inadimplência superior a 60 dias, fornecimento de informações falsas pelo Cliente, uso indevido da plataforma ou violação destes Termos, sem prejuízo das demais sanções cabíveis.`,
    },
    {
        title: '10. Propriedade Intelectual',
        content: `Todo o conteúdo disponível no site e na plataforma da Vigor Energy, incluindo textos, imagens, logotipos, ícones, softwares e dados, é de propriedade exclusiva da Vigor Energy ou de seus licenciadores e está protegido pelas leis de direitos autorais e propriedade intelectual.

É vedado ao Cliente reproduzir, distribuir, modificar ou criar obras derivadas sem autorização prévia e expressa por escrito da Vigor Energy.`,
    },
    {
        title: '11. Alterações nos Termos',
        content: `A Vigor Energy reserva-se o direito de modificar estes Termos de Uso a qualquer momento. Alterações relevantes serão comunicadas por e-mail e/ou por aviso em destaque no site com antecedência mínima de 15 dias. O uso continuado dos serviços após a data de vigência das alterações será considerado como aceitação dos novos termos.`,
    },
    {
        title: '12. Lei Aplicável e Foro',
        content: `Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Para dirimir quaisquer controvérsias decorrentes deste instrumento, fica eleito o foro da Comarca de Goiânia - GO, com renúncia expressa a qualquer outro, por mais privilegiado que seja.

Para reclamações e suporte, o Cliente pode também acionar os canais de atendimento da Vigor Energy antes de recorrer ao Poder Judiciário:

• **E-mail:** contato@vigorenergy.com.br
• **Telefone:** (62) 99118-3449`,
    },
];

export default function TermosDeUso() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 lg:px-8 py-20">
                <div className="mb-10">
                    <p className="text-sm text-gray-500 mb-2">Última atualização: 22 de junho de 2026</p>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Termos de Uso</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Estes Termos de Uso regulam o acesso e a utilização dos serviços oferecidos pela Vigor Energy,
                        incluindo o site institucional, a plataforma digital e o serviço de energia solar por assinatura.
                        Leia atentamente antes de contratar ou utilizar nossos serviços.
                    </p>
                </div>

                <div className="space-y-10">
                    {sections.map((section) => (
                        <section key={section.title}>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                            <div className="text-gray-600 leading-relaxed">
                                {section.content.split('\n').map((line, i) => {
                                    const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                                    return (
                                        <p
                                            key={i}
                                            className={line.startsWith('•') ? 'ml-4 mb-1' : 'mb-2'}
                                            dangerouslySetInnerHTML={{ __html: boldLine }}
                                        />
                                    );
                                })}
                            </div>
                            <div className="mt-6 border-b border-gray-100" />
                        </section>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
