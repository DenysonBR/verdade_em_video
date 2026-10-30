# 🎥 Verdade em Vídeo

### Educação digital para identificar vídeos manipulados e combater a desinformação

O **Verdade em Vídeo** é um projeto de extensão curricular do curso de **Análise e Desenvolvimento de Sistemas**, do **Claretiano**, desenvolvido por **Denyson da Silva Aquino**.

Seu objetivo é ajudar a comunidade a analisar vídeos recebidos pela internet, reconhecer possíveis manipulações, identificar conteúdos fora de contexto e **verificar informações antes de compartilhar**.

🌐 **[Acessar o site Verdade em Vídeo](https://denysonbr.github.io/verdade_em_video/)**

## ✅ Situação atual

- Site publicado gratuitamente no **GitHub Pages**.
- Integração com **Firebase AI Logic + Gemini** configurada.
- **Análise preliminar de vídeos públicos do YouTube** testada com sucesso.
- Quiz educativo com **10 perguntas e explicações**.
- Cartilha digital e método **PARE** disponíveis no site.
- Diário local para organizar atividades do projeto de extensão.

> **Atenção:** a IA não é um detector infalível de deepfakes e não garante que uma notícia seja verdadeira. As análises indicam observações, suspeitas e pontos que precisam de verificação independente.

## 🔎 Como funciona a análise de vídeo

1. Acesse o site e abra a seção **Verificar link**.
2. Cole o endereço público de um vídeo do **YouTube ou YouTube Shorts**.
3. Opcionalmente, informe qual afirmação acompanha o vídeo.
4. Clique em **Verificar e analisar**.
5. Leia a análise preliminar do Gemini, incluindo conteúdo observado, sinais de possível manipulação, limitações e orientações para conferir a informação.

**YouTube:** a análise de conteúdo por IA está habilitada para vídeos públicos compatíveis e acessíveis ao serviço.

**Instagram, Facebook, TikTok e outras plataformas:** o site identifica características básicas do endereço e oferece orientações e ferramentas de checagem, mas **não analisa automaticamente o conteúdo desses vídeos**.

Alguns vídeos do YouTube também podem falhar por restrições de acesso, indisponibilidade do serviço ou limites gratuitos.

## 📚 Conteúdos educativos

O site oferece o método **PARE**:

- **P — Pare:** não compartilhe por impulso.
- **A — Analise:** confira fonte, data, local e legenda.
- **R — Rastreie:** pesquise quadros do vídeo e sua origem.
- **E — Examine:** compare informações em fontes independentes.

Também estão disponíveis um **quiz interativo**, uma **cartilha em PDF**, links para ferramentas gratuitas de verificação e exemplos de conteúdo enganoso.

📄 [Abrir a cartilha e o material da oficina](Kit_Oficina_Verdade_em_Video.pdf)

## 🎓 Extensão curricular — 200 horas

Este projeto foi planejado como uma **campanha educativa online**, que pode ser acessada pela comunidade sem apresentação presencial em sala.

As ações propostas incluem pesquisa, produção e atualização dos materiais, desenvolvimento do site, divulgação, orientação ao público, avaliação do aprendizado e elaboração de relatório.

**As 200 horas representam a carga curricular prevista, não horas já cumpridas.** A execução, as evidências e a aceitação das atividades — inclusive do formato online — dependem das orientações e da validação do Claretiano.

## 🛠️ Tecnologias utilizadas

- **HTML, CSS e JavaScript** — interface e recursos educativos.
- **GitHub Pages** — hospedagem pública do site.
- **Firebase AI Logic** — integração com o modelo generativo.
- **Gemini** — análise preliminar de vídeos públicos do YouTube.
- **Firebase App Check / reCAPTCHA Enterprise** — proteção das chamadas ao serviço.

## 🔐 Privacidade e responsabilidade

- O site não exige cadastro de visitantes.
- Para analisar um vídeo, o link e a afirmação informada são enviados aos serviços Firebase/Google.
- Não envie vídeos privados ou informações pessoais sensíveis.
- O quiz não envia automaticamente respostas a um servidor.
- O diário de extensão guarda registros **localmente no navegador**; não os envia à faculdade nem comprova automaticamente horas de extensão.
- As respostas da IA são **preliminares** e devem ser confrontadas com outras fontes.

## 📁 Arquivos principais

| Arquivo | Função |
| --- | --- |
| `index.html` | Página principal, conteúdo educativo, quiz e diário |
| `ai-video.js` | Integração com Firebase AI Logic e Gemini |
| `firebase-config.js` | Configuração pública do aplicativo Firebase e App Check |
| `Kit_Oficina_Verdade_em_Video.pdf` | Material educativo para a comunidade |
| `QRCode_Google_Lens.png` | QR Code de apoio para ferramenta de busca visual |

## 🚀 Publicação e atualizações

O site está hospedado na branch `main` deste repositório pelo **GitHub Pages**. Alterações nos arquivos da raiz são publicadas automaticamente após o processamento do GitHub.

**[Visitar o site](https://denysonbr.github.io/verdade_em_video/)**

---

**Projeto:** Verdade em Vídeo  
**Autor:** Denyson da Silva Aquino  
**Curso:** Análise e Desenvolvimento de Sistemas — Claretiano  
**Finalidade:** educação midiática, cidadania digital e combate à desinformação.
