
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Crio a variavel findAll e já exporto
export const findAll = async () => {
    // SELECT * FROM bruxos = findMany
    return await prisma.bruxo.findMany({
        orderBy: { nome: 'asc' }
    });
}


export const findById = async (id) => {
    return await prisma.bruxo.findUnique({
        where: { id: Number(id) }
    });
}

export const createBruxo = async (data) => {
return await prisma.bruxo.create({
    data: {
        nome: data.nome,
        casa: data.casa,
        varinha: data.varinha,
        patrono: data.patrono,
        anoMatricula: data.anoMatricula
    }
})
}

export const deleteBruxo = async (id) => {
    return await prisma.bruxo.delete({
        where: { id: Number(id) }
    });
}

export const update = async (id, data) => {
    return await prisma.bruxo.update({
        where: { id: Number(id) },
        data: {
        ...(data.nome && { nome: data.nome }),
        ...(data.casa && { casa: data.casa }),
        ...(data.varinha && { varinha: data.varinha }),
        ...(data.patrono && { patrono: data.patrono }),
        ...(data.anoMatricula && { anoMatricula: data.anoMatricula }),
        ...(data.ativo !== undefined && { ativo: data.ativo }),
        }
    })
}