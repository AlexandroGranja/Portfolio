from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader
import fitz
out=Path('public/curriculos/Alexandro_Granja_Curriculo.pdf')
styles={
'name':ParagraphStyle('name',fontName='Helvetica-Bold',fontSize=23,leading=27,textColor=HexColor('#20252b'),spaceAfter=5),
'role':ParagraphStyle('role',fontName='Helvetica',fontSize=11,leading=15,spaceAfter=7),
'contact':ParagraphStyle('contact',fontName='Helvetica',fontSize=9,leading=13,spaceAfter=3),
'heading':ParagraphStyle('heading',fontName='Helvetica-Bold',fontSize=10,leading=14,spaceBefore=13,spaceAfter=6,textColor=HexColor('#243e55')),
'body':ParagraphStyle('body',fontName='Helvetica',fontSize=10,leading=14,spaceAfter=5),
'job':ParagraphStyle('job',fontName='Helvetica-Bold',fontSize=10,leading=14,spaceBefore=5,spaceAfter=2),
'date':ParagraphStyle('date',fontName='Helvetica',fontSize=9,leading=12,spaceAfter=3,textColor=HexColor('#515860')),
}
Path('tmp/pdfs').mkdir(parents=True, exist_ok=True)
story=[]
def p(text,kind='body'):story.append(Paragraph(text,styles[kind]))
p('ALEXANDRO GRANJA','name')
p('Desenvolvedor Fullstack | Automação | Suporte de TI','role')
p('Rio de Janeiro, RJ | (21) 96958-5179 | <link href="mailto:alexxx.granja@gmail.com">alexxx.granja@gmail.com</link>','contact')
p('<link href="https://www.linkedin.com/in/alexandro-granja-1b1393157">linkedin.com/in/alexandro-granja-1b1393157</link>','contact')
p('<link href="https://alexandro-granja.vercel.app/">alexandro-granja.vercel.app</link>','contact')
p('RESUMO PROFISSIONAL','heading')
p('Desenvolvedor fullstack com experiência em suporte corporativo e hospitalar. Desenvolvimento de aplicações web, APIs e automações com React, Next.js e Python. Atuação da interface às regras de negócio e integrações, com experiência em processos de atendimento e ferramentas internas de TI.')
p('EXPERIÊNCIA PROFISSIONAL','heading')
p('Grupo Assim Saúde | Técnico de Suporte de TI','job')
p('Julho de 2026 até o presente','date')
p('Suporte presencial e remoto em ambiente hospitalar, atendimento de chamados no GLPI e preparação de equipamentos. Administração de acessos com Active Directory e Microsoft 365; suporte a redes e sistemas hospitalares e monitoramento com Zabbix.')
p('AIverse Technologies | Desenvolvedor Fullstack','job')
p('Junho de 2025 até o presente','date')
p('Desenvolvimento e manutenção de aplicações web com React, Next.js, Python e PostgreSQL/Supabase. Implementação de APIs, autenticação, painéis administrativos e integrações por webhooks, incluindo implantação e manutenção das soluções.')
p('Prosper Distribuidora | Analista de Suporte de TI','job')
p('Novembro de 2024 a abril de 2026','date')
p('Suporte N1/N2, administração de acessos e atendimento aos sistemas Target e Target Mob. Desenvolvimento de ferramentas internas de roteirização de visitas e seleção de XMLs fiscais, conectando rotinas operacionais a soluções em Python e React.')
p('PROJETOS SELECIONADOS','heading')
p('<b>Fortão Prêmios:</b> desenvolvimento completo com Next.js e Supabase, painel administrativo, integração de pagamentos, emissão de NFS-e e regras de apuração de sorteios.')
p('<b>Chamados de TI:</b> aplicação local com React, FastAPI e PostgreSQL para abertura, acompanhamento e histórico de chamados, perfis de acesso e inventário de equipamentos.')
p('<b>Roteiro Prosper e Processador XML:</b> roteirização com vizinho mais próximo e 2-opt; seleção de documentos fiscais a partir de planilha Excel e arquivo ZIP.')
p('HABILIDADES TÉCNICAS','heading')
p('<b>Desenvolvimento:</b> JavaScript, TypeScript, React, Next.js, HTML, CSS, Python, FastAPI, Flask, APIs REST e webhooks.<br/><b>Dados e ferramentas:</b> PostgreSQL, Supabase, Redis, Git e n8n.<br/><b>Suporte:</b> Active Directory, Microsoft 365, GLPI, Zabbix e suporte N1/N2.')
p('FORMAÇÃO E IDIOMAS','heading')
p('DevClub Fullstack Pro | Bootcamp Fullstack | 2025 a 2026, em fase de conclusão<br/>Brasil Petro | Técnico em Informática e Manutenção de Computadores | 2014 a 2015<br/>Português nativo | Inglês básico para leitura de documentação técnica.')
doc=SimpleDocTemplate(str(out),pagesize=A4,rightMargin=40,leftMargin=40,topMargin=34,bottomMargin=32,title='Alexandro Granja | Currículo',author='Alexandro Granja')
doc.build(story)
r=PdfReader(out)
print('Pages:',len(r.pages))
text='\n'.join(page.extract_text() for page in r.pages)
Path('tmp/pdfs/curriculo-texto.txt').write_text(text,encoding='utf-8')
d=fitz.open(out)
for i,page in enumerate(d):page.get_pixmap(matrix=fitz.Matrix(1.5,1.5)).save(f'tmp/pdfs/curriculo-{i+1}.png')
print('Text length:',len(text))
