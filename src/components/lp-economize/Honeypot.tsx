/**
 * Campo-armadilha invisível pra humanos, tentador pra bots que preenchem tudo que encontram.
 * Posicionado fora da tela (não display:none — alguns bots ignoram campos display:none) e
 * fora da ordem de tab. Se vier preenchido, a Edge Function rejeita o envio silenciosamente.
 */
export default function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
      <label htmlFor="lp-website">Deixe este campo em branco</label>
      <input
        id="lp-website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
