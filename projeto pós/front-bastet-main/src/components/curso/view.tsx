"use client";
import type { Curso as CursoType } from "@/lib/mockup"
import Image from "next/image"
import { Inscricao, Cancelar } from "@/lib/methods"

export default function CursoView({ data } : { data : CursoType }){
    async function handleInscricao() {
        const res = await Inscricao({ idCurso: data.id });
        if(res && res.error) alert("Erro: " + res.error);
        else { alert("Inscrição realizada com sucesso!"); window.location.reload(); }
    }

    async function handleCancelar() {
        const res = await Cancelar({ idCurso: data.id });
        if(res && res.error) alert("Erro: " + res.error);
        else { alert("Inscrição cancelada com sucesso!"); window.location.reload(); }
    }

    return <div className="border flex-1 flex flex-col rounded-xl overflow-hidden shadow-sm">
        <figure className="relative aspect-video bg-slate-100">
            { data.capa && <Image src={ data.capa } alt={ data.nome } fill className="object-cover" /> }
            { data.inscrito && !data.inscricao_cancelada && <figcaption className="text-sm p-4 bg-slate-200 absolute m-4 shadow-xl border-slate-400 border rounded-xl z-10">Você já se inscreveu</figcaption> }
        </figure>
        <div className="p-6 flex flex-col gap-2 flex-1">
            <h3 className="text-2xl font-semibold text-slate-800">{ data.nome }</h3>
            <p className="text-slate-600">{ data.descricao }</p>
            <div className="flex flex-row flex-wrap gap-2 mt-4">
                <span className="text-xs py-1 px-3 leading-tight bg-slate-200 text-slate-700 rounded-2xl font-medium">{ data.inscricoes || 0 } inscritos</span>
                <span className="text-xs py-1 px-3 leading-tight bg-slate-200 text-slate-700 rounded-2xl font-medium">Inicia em { new Date(data.inicio).toLocaleDateString('pt-BR') }</span>
            </div>
        </div>
        {  
            data.inscrito ? (
                data.inscricao_cancelada ? 
                <p className="bg-red-500 p-4 text-center text-white font-medium">Inscrição cancelada</p> : 
                <button onClick={handleCancelar} className="text-center p-4 bg-slate-300 hover:bg-slate-400 font-medium transition-colors">Cancelar inscrição</button>
            ) : (
                <button onClick={handleInscricao} className="text-center p-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors">Fazer inscrição</button>
            )
        }
    </div>
}