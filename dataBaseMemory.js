import { randomUUID } from "node:crypto"; // Importa a função randomUUID para gerar IDs únicos

export class dataBaseMemory { // Classe para armazenar sessões fotográficas em memória

    #sessions = new Map(); // Mapa privado para armazenar as sessões fotográficas

    getById(id) { // Retorna uma sessão pelo seu ID
        return this.#sessions.get(id);
    };

    list(search) { // Retorna uma lista de sessões fotográficas, opcionalmente filtrada
        return Array.from(this.#sessions.entries()).map((sessionArray) => {
            const id = sessionArray[0]; // Extrai o ID da sessão
            const data = sessionArray[1]; // Extrai os dados da sessão

            return {
                id,
                ...data, // Mantém os dados da sessão
            };
        })
        .filter(session => { // Filtra as sessões por cliente ou tema
            if (search) {
                return session.cliente.includes(search) || session.tema.includes(search);
            };
            return true; // Se não houver busca, retorna todas as sessões
        });
    };

    create(session) { // Cria uma nova sessão e a adiciona ao "banco de dados"
        const sessionID = randomUUID(); // Gera um ID único
        this.#sessions.set(sessionID, session); // Adiciona a sessão ao mapa
    };

    update(id, session) { // Atualiza uma sessão existente
        this.#sessions.set(id, session);
    };

    delete(id) { // Remove uma sessão do banco de dados
        this.#sessions.delete(id);
    };
};
