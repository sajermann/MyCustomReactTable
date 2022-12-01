# Custom React Table

Esse projeto foi criado para estudar e manter em portfólio a implementação de tabelas customizadas com várias possibilidades de configurações.

## Principais Recursos e Configurações Desse Projeto

### Vite
Vite hoje é sem dúvidas a melhor escolha para se iniciar um projeto frontent, além de moderno, sua principal característica é a velocidade de compilação, o que leva ao desenvolvedor uma produtividade incrível, Vite utiliza por de baixo dos panos o Rollup, que na minha opinião possui uma configuração muito simples.

### Typescript
Projetos profissionais utilizam o Typescript para desenvolvimento, com ele o desenvolvedor tem mais segurança para desenvolver localizando mais rapidamente os bugs e dando mais manutenibilidade ao projeto.

### Tailwind CSS
Tailwind CSS é um framework CSS que me lembra muito o Bootstrap, porém melhorado, depois de instalado e configurado basta adicionar as classes necessárias para ver o resultado em tela, por exemplo utilizando a classe `flex`, o tailwind já converte para `display: flex;`, esse é só um exemplo das facilidades que o tailwind entrega. Vale lembrar que o Tailwind não entrega componentes prontos como por exemplo o MUI, a criação do componente em si continua a cargo do desenvolvedor.

### React Router Dom
React Router Dom é uma lib que gerencia o roteamento da aplicação e que dificilmente fica de fora de qualquer projeto que tenha mais de uma rota.

### EsLint
EsLint tem como objetivo padronizar o código entre diversos desenvolvedores no mesmo projeto. Vale lembrar que para o EsLint funcionar corretamente nesse projeto, são necessários algumas configurações no Vs Code do desenvolvedor.

### Prettier
Prettier formata e corrige seu código de acordo com as regras do EsLint, por isso ambos utilizados em conjunto são uma verdadeira mão na roda para qualquer desenvolvedor. Assim como o EsLint, para o Prettier funcionar corretamente são necessários algumas configurações no Vs Code do desenvolvedor.

### Vitest
Vitest é uma alternativa ao Jest, além de ter sido criado pela equipe do Vite, ele promete ser mais rápido que seus concorrentes, nesse boilerplate já deixei ele todo configurado para além de testar também gerar os coverages, para executar os testes bastar executar o comando `npm run vitest`.

### Sonarqube
Sonarqube é uma ferramenta de inspeção de qualidade de código, nesse projeto já está configurado para ser executado através do comando `npm run sonar` e colher as informações corretas, o desenvolvedor deve apenas fazer as alterações necessárias de acordo com o seu próprio Sonarqube.

### i18n
Internacionalização é fundamental em projetos de multiplas linguagens, utilizando a lib i18n eu já deixei configurado um hook para alteração da linguagem da aplicação, deixei como exemplo 2 linguagens completas sendo o `pt-BR` e o `en`.

### TanStack Table v8
Escolhi o React Table do TanStack pela simplicidade e disponibilidade de recursos avançados para gerenciamento da mesma. React Table é baseada em Hook, por isso fornece apenas a lógica por trás das tabelas, sendo assim a perfumaria é o desenvolvedor quem faz.

## Implementações

### Expandir Linha
Permite ao usuário realizar uma ação e expandir alguma linha da tabela podendo renderizar o que desejar, nesse exemplo eu escolhi renderizar um componente de edição para alterar os dados da linha.

### Seleção de Linha
Permite ao usuário selecionar uma linha ou várias baseado na configuração, também é possível desativar a seleção baseado em alguma lógica.

### Indicação de Carregamento
Mostra ao usuário a indicação de quem está ocorrendo uma atualização de dados na tabela.

### Classificação
Ao clicar no header da coluna, a mesma será classificada de maneira asc ou desc.

### Filtro - Em Construção

### Editável
Nesse exemplo é possível editar os dados da linha na própria tabela.

### Virtualização
Virtualização permite mostrar grandes quantidades de dados mantendo o máximo de desempenho possível.

### Paginação - Controlada
Para demonstrar a paginação controlada, eu escolhi a api do Rick and Morty.

### Favoritos
Baseado em seleção de linhas, demonstro que é possível mover a coluna de seleção de prioridade e também trocar os checkboxs de seleção por estrelas de favoritos.


## Demonstração

