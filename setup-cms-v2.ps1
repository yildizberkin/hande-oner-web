$ErrorActionPreference = "Stop"

$ProjectRoot = (Resolve-Path ".").Path

if (-not (Test-Path (Join-Path $ProjectRoot "package.json"))) {
  throw "Bu script hande-oner-web proje root klasöründe çalıştırılmalı."
}

Write-Host ""
Write-Host "Hande Oner CMS V2 kurulumu basliyor..." -ForegroundColor Cyan

$obsolete = @(
  "app\blog\kaygiyi-anlamak",
  "app\blog\iliskilerde-tekrar-eden-oruntuler",
  "app\blog\goc-aidiyet-ve-uyum",
  "app\en\blog\understanding-anxiety",
  "app\en\blog\recurring-patterns-in-relationships",
  "app\en\blog\migration-belonging-and-adjustment"
)

foreach ($relative in $obsolete) {
  $path = Join-Path $ProjectRoot $relative
  if (Test-Path $path) {
    Remove-Item $path -Recurse -Force
    Write-Host "Eski statik blog route kaldirildi: $relative"
  }
}

Write-Host ""
Write-Host "Yeni editor paketleri kuruluyor..." -ForegroundColor Cyan
& npm install
if ($LASTEXITCODE -ne 0) { throw "npm install basarisiz." }

Write-Host ""
Write-Host "D1 CMS V2 migration uygulanacak..." -ForegroundColor Cyan
& npm run db:migrate:local
if ($LASTEXITCODE -ne 0) { throw "D1 migration basarisiz." }

Write-Host ""
Write-Host "CMS V2 hazir." -ForegroundColor Green
Write-Host "Calistirmak icin: npm run dev"
Write-Host "Panel: http://localhost:3000/admin"
