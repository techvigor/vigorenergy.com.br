import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
    {
        title: '1. Informações que Coletamos',
        content: `Coletamos informações que você nos fornece diretamente ao utilizar nossos serviços, como:

• **Dados de identificação:** nome completo, CPF, RG e data de nascimento.
• **Dados de contato:** endereço de e-mail, número de telefone e endereço residencial.
• **Dados de consumo:** número de instalação, distribuidora de energia e faturas de energia elétrica.
• **Dados financeiros:** informações bancárias necessárias para processamento de pagamentos e faturamento.
• **Dados de navegação:** endereço IP, tipo de navegador, páginas visitadas e tempo de permanência no site, coletados automaticamente via cookies e tecnologias similares.`,
    },
    {
        title: '2. Como Utilizamos suas Informações',
        content: `As informações coletadas são utilizadas para as seguintes finalidades:

• Processar sua adesão ao serviço de energia solar por assinatura da Vigor Energy.
• Gerenciar sua conta, calcular créditos de energia e emitir faturas.
• Entrar em contato sobre atualizações do serviço, suporte técnico e comunicações operacionais.
• Cumprir obrigações legais e regulatórias perante órgãos competentes, como a ANEEL.
• Melhorar continuamente nossos serviços com base em análises de uso e feedback.
• Enviar comunicações de marketing, mediante consentimento prévio e expresso.`,
    },
    {
        title: '3. Compartilhamento de Dados',
        content: `A Vigor Energy não vende, aluga ou comercializa seus dados pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:

• **Distribuidoras de energia:** para viabilizar a transferência dos créditos de energia solar à sua unidade consumidora.
• **Parceiros de pagamento:** processadoras de pagamento e instituições financeiras para cobrança dos serviços.
• **Prestadores de serviço:** empresas contratadas para suporte tecnológico, armazenamento em nuvem e atendimento ao cliente, sempre sob acordos de confidencialidade.
• **Obrigações legais:** quando exigido por lei, decisão judicial ou autoridade regulatória competente.`,
    },
    {
        title: '4. Cookies e Tecnologias de Rastreamento',
        content: `Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site:

• **Cookies essenciais:** necessários para o funcionamento básico do site.
• **Cookies analíticos:** para entender como os visitantes interagem com o site (ex.: Google Analytics).
• **Cookies de marketing:** para exibir anúncios relevantes em outras plataformas, mediante seu consentimento.

Você pode gerenciar as preferências de cookies diretamente nas configurações do seu navegador. A desativação de cookies essenciais pode impactar a funcionalidade do site.`,
    },
    {
        title: '5. Seus Direitos (LGPD)',
        content: `Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você possui os seguintes direitos:

• **Acesso:** solicitar confirmação e acesso aos seus dados pessoais que tratamos.
• **Correção:** requerer a atualização ou correção de dados incompletos, inexatos ou desatualizados.
• **Exclusão:** solicitar a eliminação dos seus dados pessoais, observados os prazos legais de retenção.
• **Portabilidade:** receber seus dados em formato estruturado para transferência a outro fornecedor.
• **Revogação do consentimento:** retirar o consentimento a qualquer momento para finalidades que o exijam.
• **Oposição:** opor-se ao tratamento realizado com fundamento em legítimo interesse.

Para exercer seus direitos, entre em contato pelo e-mail: **privacidade@vigorenergy.com.br**.`,
    },
    {
        title: '6. Retenção de Dados',
        content: `Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, salvo quando a lei exigir ou permitir período de retenção maior. Após o encerramento do contrato, os dados são retidos por até 5 (cinco) anos para cumprimento de obrigações legais, fiscais e contratuais, conforme exigido pela legislação brasileira.`,
    },
    {
        title: '7. Segurança dos Dados',
        content: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda acidental, destruição ou divulgação indevida. Nossas medidas incluem criptografia em trânsito (TLS/SSL), controle de acesso baseado em função e monitoramento contínuo de segurança. Apesar dos nossos esforços, nenhum sistema é completamente seguro. Em caso de incidente de segurança que possa afetar seus direitos, notificaremos as autoridades competentes e os titulares afetados conforme previsto na LGPD.`,
    },
    {
        title: '8. Transferência Internacional de Dados',
        content: `Alguns de nossos prestadores de serviços podem estar localizados em outros países. Quando isso ocorrer, garantimos que a transferência seja realizada em conformidade com a LGPD, adotando as salvaguardas adequadas, como cláusulas contratuais padrão ou verificação de países com nível adequado de proteção reconhecido pela ANPD.`,
    },
    {
        title: '9. Alterações nesta Política',
        content: `Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou na legislação aplicável. Quando realizarmos alterações relevantes, notificaremos você por e-mail ou por aviso em destaque no nosso site com antecedência mínima de 15 dias. A data da última atualização estará sempre indicada no topo deste documento.`,
    },
    {
        title: '10. Contato e Encarregado de Dados (DPO)',
        content: `Para dúvidas, solicitações ou reclamações relacionadas ao tratamento dos seus dados pessoais, entre em contato com nosso Encarregado de Proteção de Dados:

• **E-mail:** privacidade@vigorenergy.com.br
• **Endereço:** R. 7, 530 - St. Oeste, Goiânia - GO, 74110-090
• **Telefone:** (62) 99118-3449

Você também pode registrar reclamações perante a Autoridade Nacional de Proteção de Dados (ANPD) em www.gov.br/anpd.`,
    },
];

export default function PoliticaDePrivacidade() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 lg:px-8 py-20">
                <div className="mb-10">
                    <p className="text-sm text-gray-500 mb-2">Última atualização: 22 de junho de 2026</p>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Privacidade</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        A Vigor Energy valoriza a privacidade dos seus clientes e parceiros. Esta política descreve como
                        coletamos, utilizamos, compartilhamos e protegemos suas informações pessoais, em conformidade com
                        a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
                    </p>
                </div>

                <div className="space-y-10">
                    {sections.map((section) => (
                        <section key={section.title}>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
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
