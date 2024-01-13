<h1 align="center">
    minuta
</h1>

<!-- <picture>
  <source media="(prefers-color-scheme: dark)" srcset="/.github/cover.png">
  <source media="(prefers-color-scheme: light)" srcset="/.github/cover_light.png">
    <img alt="Main projeto cover" src="/.github/cover_light.png">
</picture> -->

![cover](.github/cover.png?style=flat)

<br />

## 💻 Projeto

Uma plataforma pessoal que engloba hábitos, acompanhamento diário e pensamentos. Seja você mesmo. Expresse seus sentimentos. Eternize.

#### 🧭 Disponível em breve para Web, Android e iOS.

<br />

## ✨ Tecnologias

-   `[Base]` React Native + Expo
-   `[Estilização]` TailwindCSS + NativeWind
-   `[Banco de dados]` MongoDB + Realm
-   `[Hospedagem]` A definir...

> [!WARNING]
> O projeto ainda encontra-se em desenvolvimento, portanto, diversos aspectos estarão inacabados e/ou não funcionais, à medida que a aplicação torna-se mais robusta.

<br />

## 🧠 Princípios

1.  Funcionar primariamente de forma local, **sem conexão à internet** (offline), seguindo a arquitetura _offline first_.
    -   Caso desejável, o usuário pode optar por um plano pago que provém a sincronização entre dispositivos com a criptografia em nuvem.
2.  Estar disponível em diversas plataformas, abrangendo a **Web** e **dispositivos móveis Android e iOS**.
3.  Experimentar o uso de um **banco de dados não relacional** (NoSQL).
4.  Ser majoritariamente _open-source_, a fim de contribuir com o conhecimento geral e o aprendizado.

<br />

## 🚧 Roadmap

-   [x] Estruturação dos princípios da plataforma
-   [x] Design da interface e prototipagem no [Figma](https://www.figma.com/file/EWA0NUYsZJvuiksbBsmTWl/%5B%3F%3F%3F%5D?type=design&node-id=0%3A1&mode=design&t=gB1yBMeWkn0gw4lr-1)
-   [x] Estudo das tecnologias disponíveis para **desenvolvimento híbrido** e versões necessárias/úteis para o rápido e eficiente desenvolvimento da aplicação em múltiplas plataformas.
-   [x] Implementação da interface inicial no código, observando as particularidades das plataformas visadas.
-   [x] Estudo das tecnologias disponíveis para a edição de `RichText`, tanto em plataformas móveis nativas (Android e iOS), quanto na Web.
-   [x] Implementação no código da inserção de pensamentos com o componente `RichText`

> [!NOTE]
> No futuro, uma implementação mais robusta por meio de um pacote `npm` próprio será desenvolvida. Por enquanto, a fim de agilidade e a formação de um MVP, a alternativa abordando a tecnologia de WebView está sendo utilizada.

-   [ ] Implementação no código do armazenamento de pensamentos escritos.
    -   [ ] Localmente
    -   [ ] Remotamente

## Debugging

A fim de resolver problemas que envolvem o gerenciamento de pacotes e outras questões fora do alcance do programador, pode ser útil utilizar algumas das seguintes linhas de código:

| Comando                   | Descrição                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `rm -rf node_modules`     | Limpa todas as dependências do projeto                                                                       |
| `bun pm cache rm`         | Clear Bun's global module cache                                                                              |
| `npm cache clean --force` | Clear the global npm cache                                                                                   |
| `bun install`             | Instala todas as dependências do projeto                                                                     |
| `expo start --clear`      | Restart the development server and instruct the bundlers (for example, webpack, Metro) to clear their caches |

<br />

## 📝 Licença

Este projeto utiliza a MIT License. Veja o arquivo de [LICENÇA](LICENSE) para mais detalhes.
