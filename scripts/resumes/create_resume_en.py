from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader
import fitz

out = Path('public/curriculos/Alexandro_Granja_Resume.pdf')
styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=23, leading=27, spaceAfter=5),
    'role': ParagraphStyle('role', fontName='Helvetica', fontSize=11, leading=15, spaceAfter=7),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=9, leading=13, spaceAfter=3),
    'heading': ParagraphStyle('heading', fontName='Helvetica-Bold', fontSize=10, leading=14, spaceBefore=13, spaceAfter=6, textColor=HexColor('#243e55')),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=14, spaceAfter=5),
    'job': ParagraphStyle('job', fontName='Helvetica-Bold', fontSize=10, leading=14, spaceBefore=5, spaceAfter=2),
    'date': ParagraphStyle('date', fontName='Helvetica', fontSize=9, leading=12, spaceAfter=3, textColor=HexColor('#515860')),
}
Path('tmp/pdfs').mkdir(parents=True, exist_ok=True)
story = []
def p(text, kind='body'): story.append(Paragraph(text, styles[kind]))
p('ALEXANDRO GRANJA', 'name')
p('Full-stack Developer | Automation | IT Support', 'role')
p('Rio de Janeiro, Brazil | +55 21 96958-5179 | <link href="mailto:alexxx.granja@gmail.com">alexxx.granja@gmail.com</link>', 'contact')
p('<link href="https://www.linkedin.com/in/alexandro-granja-1b1393157">linkedin.com/in/alexandro-granja-1b1393157</link>', 'contact')
p('<link href="https://alexandro-granja.vercel.app/">alexandro-granja.vercel.app</link>', 'contact')
p('PROFESSIONAL SUMMARY', 'heading')
p('Full-stack developer with experience in corporate and hospital IT support. I develop web applications, APIs and automations with React, Next.js and Python, from interfaces to business logic and integrations. My background includes support workflows and internal IT tools.')
p('PROFESSIONAL EXPERIENCE', 'heading')
p('Grupo Assim Saúde | IT Support Technician', 'job')
p('July 2026 to present', 'date')
p('On-site and remote hospital IT support, GLPI ticket handling and equipment preparation. Access administration with Active Directory and Microsoft 365; network and hospital system support, with infrastructure monitoring through Zabbix.')
p('AIverse Technologies | Full-stack Developer', 'job')
p('June 2025 to present', 'date')
p('Development and maintenance of web applications with React, Next.js, Python and PostgreSQL/Supabase. Implementation of APIs, authentication, admin dashboards and webhook integrations, including solution deployment and maintenance.')
p('Prosper Distribuidora | IT Support Analyst', 'job')
p('November 2024 to April 2026', 'date')
p('Tier 1 and Tier 2 support, access administration and support for Target and Target Mob systems. Development of internal tools for visit route planning and invoice XML selection, connecting operational workflows to Python and React solutions.')
p('SELECTED PROJECTS', 'heading')
p('<b>Fortão Prêmios:</b> full development with Next.js and Supabase, including an admin dashboard, payment integration, NFS-e invoice issuance and prize draw result processing.')
p('<b>IT Support Tickets:</b> local React, FastAPI and PostgreSQL application for ticket creation, tracking and history, with access roles and equipment inventory.')
p('<b>Roteiro Prosper and XML Processor:</b> route planning with nearest-neighbor and 2-opt algorithms; invoice document selection using an Excel spreadsheet and ZIP archive.')
p('TECHNICAL SKILLS', 'heading')
p('<b>Development:</b> JavaScript, TypeScript, React, Next.js, HTML, CSS, Python, FastAPI, Flask, REST APIs and webhooks.<br/><b>Data and tools:</b> PostgreSQL, Supabase, Redis, Git and n8n.<br/><b>IT support:</b> Active Directory, Microsoft 365, GLPI, Zabbix, Tier 1 and Tier 2 support.')
p('EDUCATION AND LANGUAGES', 'heading')
p('DevClub Fullstack Pro | Full-stack Bootcamp | 2025 to 2026, nearing completion<br/>Brasil Petro | Technical training in IT and Computer Maintenance | 2014 to 2015<br/>Portuguese: native | English: basic technical reading skills.')
SimpleDocTemplate(str(out), pagesize=A4, rightMargin=40, leftMargin=40, topMargin=34, bottomMargin=32, title='Alexandro Granja | Resume', author='Alexandro Granja').build(story)
reader = PdfReader(out)
assert len(reader.pages) == 1, 'Resume must fit on one page'
text = '\n'.join(page.extract_text() for page in reader.pages)
assert 'Full-stack Developer' in text and 'nearing completion' in text
Path('tmp/pdfs/resume-en-text.txt').write_text(text, encoding='utf8')
doc = fitz.open(out)
doc[0].get_pixmap(matrix=fitz.Matrix(1.5, 1.5)).save('tmp/pdfs/resume-en.png')
print('English resume: one page, selectable text, rendered for review.')
