<#
.SYNOPSIS
  Backup da pasta do portfólio (Windows / PowerShell).

.USAGE
  cd "c:\Users\alexg\OneDrive\Área de Trabalho\Portfolio"
  .\backup-portfolio.ps1

  .\backup-portfolio.ps1 -BackupRoot "D:\Backups"
  .\backup-portfolio.ps1 -IncludeSuperpowers
  .\backup-portfolio.ps1 -IncludeGit  # copia também a pasta .git (maior, útil para restore completo)
#>
[CmdletBinding()]
param(
    [string]$BackupRoot = "",
    [switch]$IncludeSuperpowers,
    [switch]$IncludeGit
)

$ErrorActionPreference = "Stop"

$Source = $PSScriptRoot
if (-not (Test-Path -LiteralPath $Source)) {
    Write-Error "Pasta de origem inválida: $Source"
}

if (-not $BackupRoot) {
    $parent = Split-Path -Parent $Source
    $BackupRoot = Join-Path $parent "Portfolio-backups"
}

$stamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$folderName = "Portfolio_$stamp"
$Dest = Join-Path $BackupRoot $folderName

New-Item -ItemType Directory -Path $Dest -Force | Out-Null

$excludeDirs = @(
    "node_modules",
    ".venv",
    "venv",
    "__pycache__",
    ".pytest_cache",
    "dist",
    "build",
    ".next",
    ".turbo",
    ".parcel-cache"
)

if (-not $IncludeSuperpowers) {
    $excludeDirs += ".superpowers"
}

if (-not $IncludeGit) {
    $excludeDirs += ".git"
}

# Robocopy: um único /XD seguido de todos os nomes de pasta
$robArgs = @(
    $Source, $Dest,
    "/E", "/COPY:DAT", "/R:2", "/W:2", "/NFL", "/NDL", "/NJH", "/NJS"
)
if ($excludeDirs.Count -gt 0) {
    $robArgs += "/XD"
    $robArgs += $excludeDirs
}

Write-Host "Origem : $Source"
Write-Host "Destino: $Dest"
Write-Host "Excluir pastas: $($excludeDirs -join ', ')"
Write-Host ""

& robocopy @robArgs
$rc = $LASTEXITCODE

# Robocopy: 0=nada copiado, 1=arquivos copiados, 2=extras, 3=1+2, 4=mismatch, 5-7=misc — tudo OK até 7
if ($rc -le 7) {
    Write-Host ""
    Write-Host "Backup concluído: $Dest" -ForegroundColor Green
    exit 0
}

Write-Error "robocopy falhou com código $rc"
exit $rc
