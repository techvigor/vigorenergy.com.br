import React, { useState, useRef } from 'react';
import { Zap, FileText, Check, Receipt, Loader2, CheckCircle, Copy } from 'lucide-react';
import { upload } from '@vercel/blob/client';


export default function UploadFaturas() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [dragging1, setDragging1] = useState(false);
  const [dragging2, setDragging2] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  const isFormValid = file1 !== null && file2 !== null;

  const handleDragOver = (e: React.DragEvent, setDragging: React.Dispatch<React.SetStateAction<boolean>>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (setDragging: React.Dispatch<React.SetStateAction<boolean>>) => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent, setFile: React.Dispatch<React.SetStateAction<File | null>>, setDragging: React.Dispatch<React.SetStateAction<boolean>>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('Arquivo muito grande (Max 10MB)');
        return;
      }
      setFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('Arquivo muito grande (Max 10MB)');
        return;
      }
      setFile(file);
    }
  };

  const clearFile = (e: React.MouseEvent, setFile: React.Dispatch<React.SetStateAction<File | null>>, inputRef: React.RefObject<HTMLInputElement | null>) => {
    e.stopPropagation();
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const enviarArquivos = async () => {
    if (!file1 || !file2) return;

    setUploadState('uploading');
    setProgress(0);
    
    try {
      const nomeLimpo1 = file1.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_.-]/g, "");
      const nomeLimpo2 = file2.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_.-]/g, "");

      let p1 = 0;
      let p2 = 0;
      const updateProg = () => setProgress((p1 + p2) / 2);

      const [blob1, blob2] = await Promise.all([
        upload(`docs/faturas/${nomeLimpo1}`, file1, {
          access: 'public',
          handleUploadUrl: '/api/upload',
          onUploadProgress: (e) => { p1 = e.percentage; updateProg(); }
        }),
        upload(`docs/faturas/${nomeLimpo2}`, file2, {
          access: 'public',
          handleUploadUrl: '/api/upload',
          onUploadProgress: (e) => { p2 = e.percentage; updateProg(); }
        }),
      ]);

      setUploadState('success');
      setProgress(100);
      
      const nomeFinal1 = blob1.url.split('/').pop() || blob1.url;
      const nomeFinal2 = blob2.url.split('/').pop() || blob2.url;

      setResult1(nomeFinal1);
      setResult2(nomeFinal2);
    } catch (e: any) {
      console.error(e);
      alert('Erro de servidor: ' + (e.message || 'Falha no upload.'));
      setUploadState('idle');
    }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    }).catch(() => {
      // Fallback
    });
  };

  const iniciarNovoEnvio = () => {
    setFile1(null);
    setFile2(null);
    setUploadState('idle');
    setProgress(0);
    setResult1('');
    setResult2('');
    if (fileInput1Ref.current) fileInput1Ref.current.value = '';
    if (fileInput2Ref.current) fileInput2Ref.current.value = '';
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-vigor-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-vigor-500 rounded-lg flex items-center justify-center text-white text-xl shadow-lg">
                    <Zap className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">Vigor Energy</h1>
                    <p className="text-xs text-vigor-100 opacity-80">Gestão de Documentos</p>
                </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-vigor-700 flex items-center justify-center text-xs">
                <span className="font-semibold">VE</span>
            </div>
        </div>

        {/* Content */}
        <div className="p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Envio de Documentos</h2>
            <p className="text-slate-500 text-sm mb-6">Por favor, anexe a Fatura da Concessionária e o Boleto Vigor Energy para processamento.</p>

            {/* Form Container */}
            {uploadState === 'idle' && (
              <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Campo 1 */}
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Fatura Concessionária</label>
                          <div 
                              onClick={() => fileInput1Ref.current?.click()}
                              onDragOver={(e) => handleDragOver(e, setDragging1)}
                              onDragLeave={() => handleDragLeave(setDragging1)}
                              onDrop={(e) => handleDrop(e, setFile1, setDragging1)}
                              className={`h-40 border-2 border-dashed ${dragging1 ? 'border-vigor-500 bg-vigor-50' : 'border-slate-300'} rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-vigor-500 hover:bg-slate-50 transition-all group p-4 relative`}
                          >
                              <input type="file" ref={fileInput1Ref} onChange={(e) => handleFileChange(e, setFile1)} className="hidden" accept=".pdf,.doc,.docx,.jpg,.png" />
                              
                              {!file1 ? (
                                <div className="pointer-events-none">
                                    <FileText className="w-8 h-8 text-slate-300 mb-2 group-hover:text-vigor-500 transition-colors" />
                                    <p className="text-sm text-slate-500 font-medium">Clique ou arraste</p>
                                </div>
                              ) : (
                                <div className="absolute inset-0 bg-vigor-50 flex flex-col items-center justify-center rounded-xl border border-vigor-200">
                                    <i className="fa-solid fa-check text-vigor-600 text-2xl mb-2"></i>
                                    <p className="text-xs text-vigor-800 font-semibold px-2 truncate w-full text-center">{file1.name}</p>
                                    <button type="button" onClick={(e) => clearFile(e, setFile1, fileInput1Ref)} className="mt-2 text-xs text-red-500 hover:text-red-700 underline z-10">Remover</button>
                                </div>
                              )}
                          </div>
                      </div>

                      {/* Campo 2 */}
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Boleto Vigor Energy</label>
                          <div 
                              onClick={() => fileInput2Ref.current?.click()}
                              onDragOver={(e) => handleDragOver(e, setDragging2)}
                              onDragLeave={() => handleDragLeave(setDragging2)}
                              onDrop={(e) => handleDrop(e, setFile2, setDragging2)}
                              className={`h-40 border-2 border-dashed ${dragging2 ? 'border-vigor-500 bg-vigor-50' : 'border-slate-300'} rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-vigor-500 hover:bg-slate-50 transition-all group p-4 relative`}
                          >
                              <input type="file" ref={fileInput2Ref} onChange={(e) => handleFileChange(e, setFile2)} className="hidden" accept=".pdf,.doc,.docx,.jpg,.png" />
                              
                              {!file2 ? (
                                <div className="pointer-events-none">
                                    <Receipt className="w-8 h-8 text-slate-300 mb-2 group-hover:text-vigor-500 transition-colors" />
                                    <p className="text-sm text-slate-500 font-medium">Clique ou arraste</p>
                                </div>
                              ) : (
                                <div className="absolute inset-0 bg-vigor-50 flex flex-col items-center justify-center rounded-xl border border-vigor-200">
                                    <i className="fa-solid fa-check text-vigor-600 text-2xl mb-2"></i>
                                    <p className="text-xs text-vigor-800 font-semibold px-2 truncate w-full text-center">{file2.name}</p>
                                    <button type="button" onClick={(e) => clearFile(e, setFile2, fileInput2Ref)} className="mt-2 text-xs text-red-500 hover:text-red-700 underline z-10">Remover</button>
                                </div>
                              )}
                          </div>
                      </div>
                  </div>

                  {/* Botão de Enviar */}
                  <button 
                      onClick={enviarArquivos} 
                      disabled={!isFormValid}
                      className={`w-full py-3 rounded-lg font-semibold shadow-sm transition-all ${isFormValid ? 'bg-vigor-500 hover:bg-vigor-600 text-white' : 'bg-slate-300 text-white cursor-not-allowed'}`}
                  >
                      Enviar Arquivos
                  </button>
              </div>
            )}

            {/* Progress Area */}
            {uploadState === 'uploading' && (
              <div className="mt-6 text-center">
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
                      <div className="bg-vigor-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center justify-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Enviando arquivos...</p>
              </div>
            )}

            {/* Result Area */}
            {uploadState === 'success' && (
              <div className="mt-6 fade-in animate-[fadeIn_0.5s_ease-in-out]">
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6 flex items-start gap-3">
                      <CheckCircle className="text-green-600 w-5 h-5 mt-0.5" />
                      <div>
                          <h4 className="text-sm font-semibold text-green-800">Uploads concluídos!</h4>
                          <p className="text-xs text-green-600 mt-0.5">Os arquivos foram renomeados e salvos.</p>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                      {/* Resultado 1 */}
                      <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1 uppercase">Fatura Concessionária</label>
                          <div className="flex shadow-sm rounded-md">
                              <input type="text" readOnly value={result1} className="flex-1 block w-full rounded-l-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 focus:outline-none" />
                              <button onClick={() => copyText(result1)} className="px-4 py-2 border border-l-0 border-slate-300 bg-slate-100 text-slate-700 rounded-r-md hover:bg-slate-200 text-sm font-medium transition-colors">
                                  <Copy className="w-4 h-4" />
                              </button>
                          </div>
                      </div>

                      {/* Resultado 2 */}
                      <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1 uppercase">Boleto Vigor Energy</label>
                          <div className="flex shadow-sm rounded-md">
                              <input type="text" readOnly value={result2} className="flex-1 block w-full rounded-l-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 focus:outline-none" />
                              <button onClick={() => copyText(result2)} className="px-4 py-2 border border-l-0 border-slate-300 bg-slate-100 text-slate-700 rounded-r-md hover:bg-slate-200 text-sm font-medium transition-colors">
                                  <Copy className="w-4 h-4" />
                              </button>
                          </div>
                      </div>
                  </div>

                  <button onClick={iniciarNovoEnvio} className="mt-6 w-full text-center text-sm text-slate-500 hover:text-vigor-600 font-medium transition-colors">
                      Iniciar novo envio
                  </button>
              </div>
            )}

        </div>
      </div>

      {/* Toast */}
      <div className={`fixed bottom-5 right-5 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 flex items-center gap-3 z-50 ${toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <Check className="text-green-400 w-5 h-5" />
          <span className="text-sm font-medium">Nome do arquivo copiado!</span>
      </div>
    </div>
  );
}
