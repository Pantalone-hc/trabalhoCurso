"use client";
import { useEffect, useState } from 'react';
import Curso from '@/components/curso';
import { MeusCursos } from '@/lib/methods';
import type { Curso as CursoType } from '@/lib/mockup';

export default function Page({ params }: { params: { idUsuario: string } }) {
  const [cursos, setCursos] = useState<CursoType[]>([]);

  useEffect(() => {
    async function carregar() {
      const dados = await MeusCursos({ idUsuario: params.idUsuario });
      if (Array.isArray(dados)) setCursos(dados);
    }
    carregar();
  }, [params.idUsuario]);

  return (
    <main>
      <h2 className="page-title">Meus cursos</h2>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
        {cursos.length > 0 ? (
          cursos.map((curso: CursoType) => <Curso data={curso} key={curso.id} />)
        ) : (
          <p className="p-4 bg-slate-100 rounded-lg">Você ainda não está inscrito em nenhum curso.</p>
        )}
      </div>
    </main>
  );
}