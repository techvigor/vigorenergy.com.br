import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Linkedin, ExternalLink, ArrowRight, Navigation } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Dados de contato exibidos nesta página — para alterar telefone, e-mail, endereço etc., ajuste aqui.
const TELEFONE = '(62) 99118-3449';
const TELEFONE_HREF = 'tel:+5562991183449';
const EMAIL = 'contato@vigorenergy.com.br';
const ENDERECO_LINHA_1 = 'R. 6, 498 - St. Oeste';
const ENDERECO_LINHA_2 = 'Goiânia - GO, 74115-070';
const ENDERECO_COMPLETO = `${ENDERECO_LINHA_1}, ${ENDERECO_LINHA_2}`;
const MAPA_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO_COMPLETO)}`;
const MAPA_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ENDERECO_COMPLETO)}&output=embed`;
const MAPA_ROTA = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ENDERECO_COMPLETO)}`;

const canais = [
  {
    icon: Phone,
    titulo: 'Telefone',
    valor: TELEFONE,
    descricao: 'Ligue e fale direto com o nosso time.',
    href: TELEFONE_HREF,
    acao: 'Ligar agora',
  },
  {
    icon: Mail,
    titulo: 'E-mail',
    valor: EMAIL,
    descricao: 'Envie sua dúvida, proposta ou solicitação.',
    href: `mailto:${EMAIL}`,
    acao: 'Enviar e-mail',
  },
  {
    icon: MapPin,
    titulo: 'Endereço',
    valor: ENDERECO_LINHA_1,
    descricao: ENDERECO_LINHA_2,
    href: MAPA_LINK,
    acao: 'Abrir no mapa',
    externo: true,
  },
];

const redesSociais = [
  { icon: Instagram, label: 'Instagram', perfil: '@vigorenergyoficial', href: 'https://www.instagram.com/vigorenergyoficial/' },
  { icon: Linkedin, label: 'LinkedIn', perfil: 'Vigor Energy', href: 'https://www.linkedin.com/company/vigor-energy/' },
];

export default function Contato() {
  // Sobe o scroll para o topo ao carregar a página e ajusta o título da aba enquanto ela estiver aberta
  useEffect(() => {
    window.scrollTo(0, 0);
    const tituloAnterior = document.title;
    document.title = 'Contato | Vigor Energy';
    return () => {
      document.title = tituloAnterior;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-offwhite">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Contato
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
              Fale com a Vigor Energy
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Tem dúvidas sobre a energia solar por assinatura, sua fatura ou parcerias?
              Escolha o canal que preferir e fale com a gente.
            </p>
          </div>

          {/* Canais de contato */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {canais.map(({ icon: Icon, titulo, valor, descricao, href, acao, externo }) => (
              <a
                key={titulo}
                href={href}
                target={externo ? '_blank' : undefined}
                rel={externo ? 'noopener noreferrer' : undefined}
                className="group bg-white rounded-2xl border border-gray-light/60 p-6 flex flex-col hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon size={22} />
                </div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">{titulo}</p>
                <p className="text-lg font-bold text-text-dark wrap-anywhere mb-1">{valor}</p>
                <p className="text-sm text-text-muted mb-5">{descricao}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  {acao}
                  {externo ? <ExternalLink size={15} /> : <ArrowRight size={15} />}
                </span>
              </a>
            ))}
          </div>

          {/* Mapa + redes sociais + como chegar */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-16">
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-light/60 overflow-hidden min-h-[320px]">
              <iframe
                title={`Mapa: ${ENDERECO_COMPLETO}`}
                src={MAPA_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[320px] border-0"
              />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-gray-light/60 p-6">
                <h2 className="text-lg font-bold text-text-dark mb-1">Redes sociais</h2>
                <p className="text-sm text-text-muted mb-5">
                  Acompanhe novidades e dicas de economia.
                </p>
                <div className="flex flex-col gap-3">
                  {redesSociais.map(({ icon: Icon, label, perfil, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-3 rounded-xl border border-gray-light/60 hover:border-primary/20 hover:bg-primary/5 transition-colors"
                    >
                      <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon size={18} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-text-dark">{label}</span>
                        <span className="text-sm text-text-muted">{perfil}</span>
                      </span>
                      <ExternalLink size={15} className="ml-auto text-text-muted group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-light/60 p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Navigation size={18} />
                  </span>
                  <h2 className="text-lg font-bold text-text-dark">Como chegar</h2>
                </div>
                <p className="text-sm text-text-muted mb-1">Estamos no Setor Oeste, em Goiânia.</p>
                <p className="text-sm font-semibold text-text-dark mb-5">{ENDERECO_COMPLETO}</p>
                <a
                  href={MAPA_ROTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-sm px-5 py-3 rounded-full hover:bg-primary-dark transition-colors"
                >
                  <Navigation size={16} />
                  Traçar rota
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Quer saber quanto vai economizar?</h2>
            <p className="text-white/80 mb-6">
              Faça uma simulação gratuita em menos de 1 minuto.
            </p>
            <Link
              to="/simulador"
              className="inline-block bg-accent text-text-dark font-bold px-8 py-3 rounded-full hover:bg-accent-hover transition-colors"
            >
              Simular economia
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
