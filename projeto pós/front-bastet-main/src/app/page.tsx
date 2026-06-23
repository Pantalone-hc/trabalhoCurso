"use client";
import { useEffect, useState } from 'react';
import Curso from '@/components/curso';

export default function Page() {
  const [cursos, setCursos] = useState<any[]>([]);
  const [erroDetetado, setErroDetetado] = useState<string>("");

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch("http://localhost:3333/cursos");
        const text = await res.text();
        
        try {
          const dados = JSON.parse(text);
          if (Array.isArray(dados)) {
            setCursos(dados);
          } else {
            setErroDetetado("A API não retornou uma lista válida.");
          }
        } catch (err) {
          setErroDetetado("O Front-end foi ao sítio errado e recebeu HTML: " + text.substring(0, 100));
        }
      } catch (error: any) {
        setErroDetetado("Falha na comunicação com o Back-end: " + error.message);
      }
    }
    carregar();
  }, []);

  return (
    <main>
      <h2 className="page-title">Cursos Disponíveis</h2>
      
      {erroDetetado && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              <strong className="font-bold">Aviso do Sistema: </strong>
              <span className="block sm:inline">{erroDetetado}</span>
          </div>
      )}

      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
        {cursos.length > 0 ? (
          cursos.map((curso: any) => <Curso data={curso} key={curso.id} />)
        ) : (
          <p className="p-4 bg-slate-100 rounded-lg">Nenhum curso disponível no momento.</p>
        )}
      </div>
    </main>
  );
}