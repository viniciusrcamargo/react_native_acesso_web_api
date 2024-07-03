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

export async function PegarRepositoriosDoUsuarioPeloNome(id, nome){
    const resultado = await api.get(`/repos?postId=${postId}&name=${name}`).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
        return [];
    })
    return resultado;
}

export async function criarRepositoriosUsuario(postId, nome, data){
    try {
        await api.post(`/repos`, {
            name: nome,
            data: data,
            postId: postId
        });

        return 'sucesso'
    }catch(erro){
        console.log(erro);
        return 'erro';
    }    
}

export async function deletarRepositoriosUsuario(id){
    try {
        await api.delete(`/repos/${id}`);

        return 'sucesso'
    }catch(erro){
        console.log(erro);
        return 'erro';
    }    
}