import { type Curso, type Usuario } from "./mockup";
import router from '@/config/routes'

async function request(path:string, options : {
    method?: string,
    body?: any,
    credentials?: RequestCredentials
} = { method: "GET" }){
    const url = `${ router.root }${ path }`;
    return await fetch( url, {
        method: options.method || "GET",
        headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
        body: options.body ? JSON.stringify(options.body) : undefined,
        credentials: "include",
        cache: "no-store"
    }).then( async (res) => {
        const data = await res.json();
        if(!res.ok) throw new Error(data.mensagem || "Erro na requisição");
        return data;
    }).catch( err => ({ error: err.message }) );
}

export async function CreateUser({ nome, email, senha, nascimento } : Usuario ) : Promise<Usuario | any>{
    return await request( router["criar-usuario"]() , {
        method: "POST",
        body: { nome, email, senha, nascimento }
    });
}

export async function Login({ email, senha } : { email: string, senha : string }){
    return await request( router["login"]() , {
        method: "POST",
        body: { email, senha }
    });
}

export async function ListarCursos({ filtro } : { filtro?: string }){
    return await request( router["listar-cursos"]( filtro ));
}

export async function Inscricao({ idCurso } : { idCurso : string }){
    return await request( router["inscrever-curso"](idCurso), { method: "POST" } );
}

export async function Cancelar({ idCurso } : { idCurso : string }){
    return await request( router["cancelar-curso"](idCurso), { method: "DELETE" } );
}

export async function MeusCursos({ idUsuario }:{ idUsuario : string }){
    const result = await request( router["meus-cursos"](idUsuario), { method: "GET" } );
    return result.error ? [] : result;
}