import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import estilos from './estilos';
import { pegarRepositoriosUsuario } from '../../services/requisicoes/repositorios'; 
import { PegarRepositoriosDoUsuarioPeloNome } from '../../services/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [nomeRepo, setNomeRepo] = useState('');
    const estaNaTela = useIsFocused();

    useEffect(() => {
        const buscarRepositorios = async () => { 
          const resultado = await pegarRepositoriosUsuario(route.params.id);
          setRepo(resultado);
        };
      
        buscarRepositorios(); 
      }, [estaNaTela]);

      async function buscarRepositorioPorNome() {
        const resultado = await PegarRepositoriosDoUsuarioPeloNome(route.params.id, nomeRepo);
        setRepo(resultado);
        setNomeRepo('');
    }
      

    return (
        <View style={estilos.container}>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TextInput
                    placeholder="Busque por um repositório"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeRepo}
                    onChangeText={setNomeRepo}
                />
                  <TouchableOpacity 
                    style={estilos.botao}
                    onPress={buscarRepositorioPorNome}
                >
                    <Text style={estilos.textoBotao}>Buscar repositório</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio', {id: route.params.id})}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>
                <FlatList
                    data={repo}
                    style={{width: '100%'}}
                    keyExtractor={repo => repo.id}
                    renderItem={({item}) => (
                        <TouchableOpacity style={estilos.repositorio} onPress={() => navigation.navigate('InfoRepositorio', {item})}>
                            <Text style={estilos.repositorioNome}>{item.name}</Text>
                            <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                        </TouchableOpacity>
                    )} />
        </View>
    );
}
