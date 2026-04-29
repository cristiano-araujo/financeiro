import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : Agente Barbearia
// Nodes   : 6  |  Connections: 3
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// Webhook                            webhook
// If_                                if
// AiAgent                            agent                      [AI]
// GroqChatModel                      lmChatGroq                 [creds] [ai_languageModel]
// Memory                             memoryBufferWindow
// ReplyToWhatsapp                    httpRequest
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Webhook
//    → If_
//      → AiAgent
//        → ReplyToWhatsapp
//
// AI CONNECTIONS
// AiAgent.uses({ ai_languageModel: GroqChatModel })
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'DjcGHag5l1SbE1Cb',
    name: 'Agente Barbearia',
    active: false,
    isArchived: false,
    projectId: 'ovvYADyCWkTeTnXI',
    settings: { executionOrder: 'v1', binaryMode: 'separate' },
})
export class AgenteBarbeariaWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '25f1d2a0-84f5-48b2-b3c5-24874298f47e',
        webhookId: 'b25db36d-8240-4deb-adba-ff6153a9aa6d',
        name: 'Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 2.1,
        position: [0, 0],
    })
    Webhook = {
        httpMethod: 'POST',
        path: 'whatsapp',
        options: {},
    };

    @node({
        id: 'c0e511a8-ec0b-4424-b6d1-e11dc33bb09d',
        name: 'If',
        type: 'n8n-nodes-base.if',
        version: 2.3,
        position: [256, 0],
    })
    If_ = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
                version: 1,
            },
            conditions: [
                {
                    id: 'c1',
                    leftValue: '={{ $json.event }}',
                    rightValue: 'message',
                    operator: {
                        type: 'string',
                        operation: 'equals',
                        singleValue: true,
                    },
                },
                {
                    id: 'c2',
                    leftValue: '={{ $json.payload.fromMe }}',
                    rightValue: false,
                    operator: {
                        type: 'boolean',
                        operation: 'equals',
                        singleValue: true,
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: '7b662d01-67a6-43c2-9df2-761752d79e46',
        name: 'AI Agent',
        type: '@n8n/n8n-nodes-langchain.agent',
        version: 3.1,
        position: [480, 0],
    })
    AiAgent = {
        promptType: 'define',
        text: '={{ $json.payload.body }}',
        options: {
            systemMessage:
                'Você é um assistente virtual de uma barbearia chamada "Barbearia do João". Seu trabalho é ser educado, responder dúvidas sobre cortes de cabelo, barba, preços e disponibilidade de horários. Sempre responda em português do Brasil, de forma amigável e descontraída.',
        },
    };

    @node({
        id: 'fa309da8-d0a6-4b71-bd6c-b95dbff70f10',
        name: 'Groq Chat Model',
        type: '@n8n/n8n-nodes-langchain.lmChatGroq',
        version: 1,
        position: [384, 176],
        credentials: { groqApi: { id: 'OuGzGs8cFsMJxtWv', name: 'Groq account' } },
    })
    GroqChatModel = {
        model: 'groq/compound',
        options: {},
    };

    @node({
        id: '3cc48378-2c8f-4463-acf4-f17f2c962fab',
        name: 'Memory',
        type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
        version: 1.3,
        position: [656, 256],
    })
    Memory = {};

    @node({
        id: '86420bfc-eb76-4a01-b6ce-dc020e177557',
        name: 'Reply to WhatsApp',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [752, 0],
    })
    ReplyToWhatsapp = {
        method: 'POST',
        url: 'http://waha:3000/api/sendText',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'X-Api-Key',
                    value: 'dqPHaBVLjzjJtSzL6owWTcPZm8NpG2qnlQ1seHLqnEVlrwXd',
                },
                {
                    name: 'Content-Type',
                    value: 'application/json',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'json',
        jsonBody:
            '={ "chatId": "{{ $(\'Webhook\').item.json.payload.from }}", "text": "{{ $json.output }}", "session": "default" }',
        options: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.Webhook.out(0).to(this.If_.in(0));
        this.If_.out(0).to(this.AiAgent.in(0));
        this.AiAgent.out(0).to(this.ReplyToWhatsapp.in(0));

        this.AiAgent.uses({
            ai_languageModel: this.GroqChatModel.output,
        });
    }
}
