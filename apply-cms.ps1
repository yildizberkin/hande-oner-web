param(
  [string]$ProjectPath = "."
)

$ErrorActionPreference = "Stop"
$PackageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$Target = (Resolve-Path $ProjectPath).Path

Write-Host "Applying Hande Oner CMS package to: $Target"

$copyItems = @(
  "app",
  "lib",
  "migrations",
  "package.json",
  "next.config.ts",
  "open-next.config.ts",
  "wrangler.jsonc",
  "cloudflare-env.d.ts",
  ".dev.vars.example"
)

foreach ($item in $copyItems) {
  $source = Join-Path $PackageRoot $item
  if (Test-Path $source) {
    Copy-Item $source -Destination $Target -Recurse -Force
  }
}

# Remove the former hard-coded example article routes so CMS [slug] owns them.
$obsolete = @(
  "app\blog\kaygiyi-anlamak",
  "app\blog\iliskilerde-tekrar-eden-oruntuler",
  "app\blog\goc-aidiyet-ve-uyum",
  "app\en\blog\understanding-anxiety",
  "app\en\blog\recurring-patterns-in-relationships",
  "app\en\blog\migration-belonging-and-adjustment"
)

foreach ($relative in $obsolete) {
  $path = Join-Path $Target $relative
  if (Test-Path $path) {
    Remove-Item $path -Recurse -Force
    Write-Host "Removed obsolete static route: $relative"
  }
}

Write-Host ""
Write-Host "CMS files applied."
Write-Host "Next:"
Write-Host "  npm install"
Write-Host "  Copy-Item .dev.vars.example .dev.vars"
Write-Host "  npm run db:migrate:local"
Write-Host "  npm run dev"
Write-Host ""
Write-Host "Open: http://localhost:3000/admin"
