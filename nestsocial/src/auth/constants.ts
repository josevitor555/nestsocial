export const jwtConstants = {
  // ATENÇÃO: EM PRODUÇÃO ISSO DEVE VIR DE VARIÁVEIS DE AMBIENTE
  secret: process.env.JWT_SECRET || 'chave-secreta-complexa-super-segura-e-secreta-2026',
};
