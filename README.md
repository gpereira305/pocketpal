# ** Projeto Pocketpal | React + Typescript **
 <hr>

## ** Informações sobre o projeto **

Este projeto oferece uma plataforma dinâmica para explorar perfis e repositórios do GitHub, com as seguintes funcionalidades:
- Pesquisa de usuários do GitHub por nome.
- Filtros personalizáveis por tecnologias e características específicas dos repositórios.
- Avatar e informações básicas: nome, biografia, localização e links de redes sociais.

Filtragem Intuitiva:
- O botão "Types": Abre um drawer lateral para filtrar repositórios por características (ex: forks, sources, arquived, mirrors).

- O botão "Languages": Permite filtrar projetos pelas linguagens de programação utilizadas (ex: Java, HTML, CSS, Typescript).

Na aba Repositórios:
- Listagem dos projetos mais relevantes do usuário com a quantidade de stars e forks.

Na aba Starred:
- É exibido os repositórios favoritados pelo usuário, permitindo explorar projetos que ele curtiu.

Página de detralhes do repositório:
 - Ao clicar no link de um repositório o usuário será redirecionado para a página de detalhes que terá algumas informações relevantes, como o autor, nome do projeto
linguagem utilizada, data de criação, uma breve descrição, etc.  


Tecnologias Utilizadas:
 - Desenvolvido em React com TypeScript para tipagem estática e segurança no código.
 - Tanstack Query para chamadas eficientes e cache de dados.
 - Tanstack Router para controle dinâmico de navegação.
 - Tailwind CSS para design responsivo e interfaces adaptáveis a diferentes dispositivos.

Desafios do projeto:
Optei por utilizar o Tanstack Router e tive um pouco de dificuldade para utilizá-lo nesse projeto por ter as abas que mudam o conteúdo e mas não a página inteira. 
Tenho pouca experiência com esse router e esse foi o meu maior desafio.

Outro problema que enfrentei foi poder criar uma página de "Notfound" que pudesse ocupar todo o conteúdo, mas com minha pouca experiência de roteamento com o Tanstack Router não ficou da forma que eu gostaria. 
O tempo para poder resolver essa parte também não foi favorável. Possivelmente eu teria que mudar a estrutura da raiz das rotas.
 

## **Links das tecnologias usadas**

- <a href="https://pt-br.reactjs.org/" target="_blank" rel="noopener noreferrer">React JS</a> 
- <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript</a> 
- <a href="https://tanstack.com/query/latest" target="_blank" rel="noopener noreferrer">Tanstack Query</a>   
- <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>    
- <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">Shadcn</a>    
- <a href="https://zod.dev/" target="_blank" rel="noopener noreferrer">Zod</a>    
<hr>
 

## **Como instalar em ambiente local**

- Na página desse projeto no Github clique em "Code", baixe o Zip ou copie o link do HTTPS.
- Abra um terminal em uma pasta de sua escolha e cole o link HTTPS.
- Certifique-se de ter instalado o Node em uma versão superior a 14.0.
- Após baixar o pojeto em um diretório de sua escolha digite o comando "npm install".
- Após o término de todas as dependências serem baixadas pelo npm, digite no mesmo diretório o comando "npm run dev".
- O seu navegador padrão irá mostrar uma nova aba com o projeto já pronto para ser usado
- Caso o navegado não inciar, digite o seguinte comando "http://localhost::5173" em uma nova aba.
<hr>


## **Visitar online**
 - <a href="https://github-user-profiler.netlify.app/" target="_blank" rel="noopener noreferrer">Acesse o site nesse link</a>
 



## **Screenshots**
- Desktop
  
 <img width="1910" alt="Image" src="https://github.com/user-attachments/assets/2d02be1d-9c7d-40c0-9022-cbc33aadc8ab" />
 <hr>
 <img width="1914" alt="Image" src="https://github.com/user-attachments/assets/ba8d478c-991b-435a-80ca-51db16b36661" />
 <hr>
 <img width="1916" alt="Image" src="https://github.com/user-attachments/assets/ebfa0fd8-abce-4712-ad83-bbe6340d2b74" />
 <hr>
 <img width="1917" alt="Image" src="https://github.com/user-attachments/assets/62935b99-4e2d-492e-8049-06b5dc6e65f4" />
 <hr>
 <img width="1911" alt="Image" src="https://github.com/user-attachments/assets/290e4497-20da-48eb-8f81-df4ba884c1d0" />
 <hr>

 
- Versão mobile

 <img width="1066" alt="Image" src="https://github.com/user-attachments/assets/9b35a4f5-4d44-401c-ab5c-49931c715383" />
 <hr>
 <img width="1333" alt="Image" src="https://github.com/user-attachments/assets/6070fcbb-76e7-4b94-9e9c-57346695b13d" />
 <hr>
 <img width="1245" alt="Image" src="https://github.com/user-attachments/assets/fb63991b-7f3b-49e0-ae86-c1328bdf2b9c" />



