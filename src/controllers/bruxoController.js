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
    detalhes: error.mesage,
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
        detalhes: error.mesage,
    })
}
}