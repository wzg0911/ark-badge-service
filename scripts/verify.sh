#!/bin/bash
# ARK Badge Service 自检脚本
# 主人明早回来执行这一行就能全面验证 5 个端点是否在线

set -e

BASE="${BASE:-https://ark-badge-service.vercel.app}"

echo "🌐 目标服务: $BASE"
echo ""

# 1. 首页
echo "=== [1/5] 首页 ==="
HOMEPAGE=$(curl -sS -o /tmp/ark-home.html -w "%{http_code}|%{size_download}" "$BASE/")
echo "HTTP: $(echo $HOMEPAGE | cut -d'|' -f1) | Size: $(echo $HOMEPAGE | cut -d'|' -f2) bytes"
if grep -q "给 AI 时代" /tmp/ark-home.html; then
  echo "✅ 首页包含核心文案"
else
  echo "⚠️ 首页内容异常"
fi
echo ""

# 2. /api/health
echo "=== [2/5] /api/health ==="
HEALTH=$(curl -sS -w "|%{http_code}" "$BASE/api/health")
HEALTH_BODY=$(echo "$HEALTH" | sed 's/|[0-9]*$//')
HEALTH_CODE=$(echo "$HEALTH" | rev | cut -d'|' -f1 | rev)
echo "HTTP: $HEALTH_CODE"
echo "Body: $HEALTH_BODY" | head -c 200
echo ""
echo ""

# 3. /api/registry
echo "=== [3/5] /api/registry ==="
REG=$(curl -sS -w "|%{http_code}" "$BASE/api/registry")
echo "HTTP: $(echo $REG | rev | cut -d'|' -f1 | rev)"
TOTAL=$(echo "$REG" | sed 's/|[0-9]*$//' | python3 -c "import sys,json; print(json.load(sys.stdin)['total'])" 2>/dev/null || echo "?")
echo "已注册包数: $TOTAL"
echo ""

# 4. badge for arkit (npm)
echo "=== [4/5] /api/badge?pkg=arkit (npm) ==="
B1=$(curl -sS -o /tmp/ark-b1.svg -w "%{http_code}|%{content_type}|%{size_download}" "$BASE/api/badge?pkg=arkit")
echo "HTTP: $(echo $B1 | cut -d'|' -f1) | Type: $(echo $B1 | cut -d'|' -f2) | Size: $(echo $B1 | cut -d'|' -f3) bytes"
if grep -q "gold" /tmp/ark-b1.svg && grep -q "98" /tmp/ark-b1.svg; then
  echo "✅ SVG 包含 gold 状态与 98 分"
fi
echo ""

# 5. badge for ark-trust (pypi)
echo "=== [5/5] /api/badge?pkg=ark-trust (pypi) ==="
B2=$(curl -sS -o /tmp/ark-b2.svg -w "%{http_code}|%{content_type}|%{size_download}" "$BASE/api/badge?pkg=ark-trust")
echo "HTTP: $(echo $B2 | cut -d'|' -f1) | Type: $(echo $B2 | cut -d'|' -f2) | Size: $(echo $B2 | cut -d'|' -f3) bytes"
if grep -q "gold" /tmp/ark-b2.svg; then
  echo "✅ SVG 包含 gold 状态"
fi
echo ""

echo "=== 额外 ==="
echo "--- 错误包 fallback ---"
curl -sS -o /tmp/ark-bf.svg -w "HTTP:%{http_code} | Size:%{size_download}\n" "$BASE/api/badge?pkg=this-package-does-not-exist"
echo ""
echo "--- plastic 样式 ---"
curl -sS -o /tmp/ark-bp.svg -w "HTTP:%{http_code} | Size:%{size_download}\n" "$BASE/api/badge?pkg=arkit&style=plastic"
echo ""
echo "✅ 自检完成"
