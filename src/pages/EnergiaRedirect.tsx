import { useEffect } from 'react';

export default function EnergiaRedirect() {
  useEffect(() => {
    window.location.replace(
      'https://wa.me/556291308408?text=Oi%2C%20gostaria%20de%20economizar%20energia!'
    );
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <p>Redirecionando para o WhatsApp...</p>
    </div>
  );
}
