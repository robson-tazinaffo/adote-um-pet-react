import { AxiosError } from 'axios';
import { useState } from 'react';
import { ApiService } from '../../../services/ApiService';

export function useCadastro() {
    const [nome, setNome] = useState(''),
    [historia, setHistoria] = useState(''),
    [foto, setFoto] = useState(''),
    [mensagem, setMensagem] = useState('');

    function cadastrar() {
        if(validaFormulario()) {
            ApiService.post('/pets', {
                nome,
                historia,
                foto
            })
                .then(() => {
                    limpar();
                    setMensagem('Pet cadastrado com sucesso!')
                })
                .catch((error: AxiosError) => {
                    setMensagem(error.response?.data.message);
                })


        } else {
            setMensagem('Preencha todos os campos!')
        }

    }

    function validaFormulario() {
        return nome.length > 2 && historia.length > 20 && foto.length > 5; 
    }

    function limpar() {
        setNome('');
        setHistoria('');
        setFoto('');
    }

    return {
        nome,
        historia,
        foto,
        setNome,
        setHistoria,
        setFoto,
        mensagem,
        setMensagem,
        cadastrar,
        limpar
    }

}