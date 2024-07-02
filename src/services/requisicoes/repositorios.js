import api from "../api";

export async function pegarRepositoriosUsuario(id){
    try {
        const resultado = await api.get(`/repos?postId=${id}`);
        return resultado.data;
    }catch(erro){
        console.log(erro);
        return[];
    }    
}

export async function salvarRepositoriosUsuario(postId, nome, data, id){
    try {
        await api.put(`/repos/${id}`, {
            name: nome,
            data: data,
            postId: postId,
            id: id
        });
        
        return 'sucesso'
    }catch(erro){
        console.log(erro);
        return 'erro';
    }    
}