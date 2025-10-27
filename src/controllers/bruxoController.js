import * as bruxoModel from './../models/bruxoModel.js';

export const listartodos = async (req, res) => {
try {
    const bruxos = await bruxoModel.findAll();

    if(!bruxos || bruxos.length === 0) {
        return res.status(404).json({
            mensagem: 'nenhum bruxo encontrado',
            status: 404,
            bruxos
        });
    }

    res.status(200).json({
    total: bruxos.length,
    mensagem: 'lista de bruxos carregada com sucesso',
    bruxos
    });
    
} catch (error) {
res.status(500).json({
    erro: 'erro interno no servidor',
    detalhes: error.message,
    status: 500
})
}
}

export const listarUm = async (req, res) => {
try {
    const { id } = req.params;
    const bruxo = await bruxoModel.findById(id);

    if(!bruxo) {
        return res.status(404).json({
            erro: `nenhum bruxo encontrado com o id: ${id}`,
            mensagem: 'Verifique o id e tente novamente',
            id: id
        });
    }
    res.status(200).json({
        mensagem: 'bruxo encontrado com sucesso',
        bruxo
    });

} catch (error) {
    res.status(500).json({
        erro: 'erro ao buscar bruxo por id',
        detalhes: error.message,
    })
}
}

export const criar = async (req, res) => {
try {
    const {nome, casa , varinha, patrono, anoMatricula} = req.body;

    const dado = req.body

    const camposObrigatorios = ['nome', 'casa', 'varinha', 'anoMatricula'];

        const faltando = camposObrigatorios.filter(campo => !dado[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
            });
        }

        const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
        if (!casasValidas.includes(casa)) {
            return res.status(400).json({
                erro: 'Casa inválida',
                casasValidas
            });
        }

    const novoBruxo = await bruxoModel.createBruxo(dado);
    res.status(201).json({
        mensagem: 'bruxo criado com sucesso',
        bruxo: novoBruxo
    });

} catch (error) {
    res.status(500).json({
        erro: 'erro ao criar bruxo',
        detalhes: error.message,
    })
}
}

export const apagar = async (req, res) => {
try {
    const id = parseInt(req.params.id);

    const bruxoExiste = await bruxoModel.findById(id);

    if (!bruxoExiste) {
        return res.status(404).json({
            erro: `nenhum bruxo encontrado com o id: ${id}`,
            id: id
        });
    }

    await bruxoModel.deleteBruxo(id);

    res.status(200).json({
        mensagem: 'bruxo apagado com sucesso',
        bruxoRemovido: bruxoExiste,
        id: id
    });
    
} catch (error) {
    res.status(500).json({
        erro: 'erro ao apagar bruxo',
        detalhes: error.message,
    })
}
}

export const atualizar = async (req, res) => {
try {
    const id = parseInt(req.params.id);
    const dados = req.body

    const bruxoExiste = await bruxoModel.findById(id);

    if (!bruxoExiste) {
        return res.status(404).json({
            erro: `nenhum bruxo encontrado com o id: ${id}`,
            id: id
        });
    }

    if (dados.casa) {
        const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
        if (!casasValidas.includes(dados.casa)) {
            return res.status(400).json({
                erro: 'Casa inválida',
                casasValidas
            });
        }
    }

    const bruxoAtualizado = await bruxoModel.update(id, dados);

    res.status(200).json({
        mensagem: 'bruxo atualizado com sucesso',
        bruxo: bruxoAtualizado
    });

} catch (error) {
    res.status(500).json({
        erro: 'erro ao atualizar bruxo',
        detalhes: error.message,
    })
}
}