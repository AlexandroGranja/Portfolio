#!/usr/bin/env python3
"""Gera PDFs dos currículos Dev e Suporte a partir dos arquivos .md na raiz."""

from __future__ import annotations

import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "assets" / "curriculos"
SOURCES = {
    "Alexandro_Granja_Dev.pdf": ROOT / "Curriculo_Alexandro_Granja.md",
    "Alexandro_Granja_Suporte.pdf": ROOT / "cv_suporte_ti.md",
}

ACCENT = colors.HexColor("#F59E0B")
TEXT = colors.HexColor("#1E293B")
MUTED = colors.HexColor("#64748B")
SECTION_RE = re.compile(r"^[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ0-9\s/&·\-–—()]+$")


def is_section_header(line: str) -> bool:
    s = line.strip()
    if not s or s.startswith("•"):
        return False
    if len(s) > 60:
        return False
    return bool(SECTION_RE.match(s))


def parse_md(path: Path) -> dict:
    lines = path.read_text(encoding="utf-8").splitlines()
    while lines and not lines[0].strip():
        lines.pop(0)

    name = lines[0].strip() if lines else ""
    subtitle = lines[1].strip() if len(lines) > 1 else ""
    contact = lines[2].strip() if len(lines) > 2 else ""
    links = lines[3].strip() if len(lines) > 3 else ""

    body_start = 4
    while body_start < len(lines) and not lines[body_start].strip():
        body_start += 1

    blocks: list[dict] = []
    current_section: str | None = None
    current_bullets: list[str] = []
    current_paragraphs: list[str] = []

    def flush_paragraphs():
        nonlocal current_paragraphs
        if current_paragraphs:
            blocks.append({"type": "p", "text": " ".join(current_paragraphs)})
            current_paragraphs = []

    def flush_bullets():
        nonlocal current_bullets
        if current_bullets:
            blocks.append({"type": "ul", "items": current_bullets[:]})
            current_bullets = []

    def flush_section():
        flush_paragraphs()
        flush_bullets()

    for raw in lines[body_start:]:
        line = raw.strip()
        if not line:
            flush_paragraphs()
            flush_bullets()
            continue

        if is_section_header(line):
            flush_section()
            current_section = line
            blocks.append({"type": "h", "text": line})
            continue

        if line.startswith("•"):
            flush_paragraphs()
            current_bullets.append(line[1:].strip())
            continue

        flush_bullets()
        current_paragraphs.append(line)

    flush_section()

    return {
        "name": name,
        "subtitle": subtitle,
        "contact": contact,
        "links": links,
        "blocks": blocks,
    }


def build_styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "CVName",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=20,
            textColor=TEXT,
            spaceAfter=4,
            leading=24,
        ),
        "subtitle": ParagraphStyle(
            "CVSubtitle",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10.5,
            textColor=ACCENT,
            spaceAfter=6,
            leading=14,
        ),
        "meta": ParagraphStyle(
            "CVMeta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            textColor=MUTED,
            spaceAfter=2,
            leading=11,
        ),
        "section": ParagraphStyle(
            "CVSection",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10,
            textColor=ACCENT,
            spaceBefore=10,
            spaceAfter=4,
            leading=13,
        ),
        "body": ParagraphStyle(
            "CVBody",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            textColor=TEXT,
            spaceAfter=4,
            leading=12,
            alignment=TA_LEFT,
        ),
        "bullet": ParagraphStyle(
            "CVBullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            textColor=TEXT,
            leftIndent=0,
            bulletIndent=8,
            spaceAfter=2,
            leading=12,
        ),
    }


def escape_xml(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def build_pdf(data: dict, out_path: Path) -> None:
    styles = build_styles()
    out_path.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title=data["name"],
        author=data["name"],
    )

    story = []
    story.append(Paragraph(escape_xml(data["name"]), styles["name"]))
    story.append(Paragraph(escape_xml(data["subtitle"]), styles["subtitle"]))
    story.append(Paragraph(escape_xml(data["contact"]), styles["meta"]))
    story.append(Paragraph(escape_xml(data["links"]), styles["meta"]))
    story.append(Spacer(1, 4))
    story.append(
        HRFlowable(
            width="100%",
            thickness=0.75,
            color=ACCENT,
            spaceBefore=2,
            spaceAfter=8,
        )
    )

    for block in data["blocks"]:
        if block["type"] == "h":
            story.append(Paragraph(escape_xml(block["text"]), styles["section"]))
        elif block["type"] == "p":
            story.append(Paragraph(escape_xml(block["text"]), styles["body"]))
        elif block["type"] == "ul":
            items = [
                ListItem(Paragraph(escape_xml(item), styles["bullet"]))
                for item in block["items"]
            ]
            story.append(
                ListFlowable(
                    items,
                    bulletType="bullet",
                    start="•",
                    leftIndent=12,
                    bulletFontName="Helvetica",
                    bulletFontSize=9,
                    bulletColor=ACCENT,
                )
            )
            story.append(Spacer(1, 2))

    doc.build(story)


def main() -> None:
    for filename, source in SOURCES.items():
        if not source.is_file():
            raise FileNotFoundError(f"Fonte não encontrada: {source}")
        data = parse_md(source)
        out = OUT_DIR / filename
        build_pdf(data, out)
        print(f"OK: {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
