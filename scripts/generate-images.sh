#!/bin/bash
# Generate premium brand imagery — parallel batches of 4
IMG_DIR="/home/z/my-project/public/images"
mkdir -p "$IMG_DIR"

gen() {
  local name="$1"; local size="$2"; local prompt="$3"
  if [ -f "$IMG_DIR/$name.png" ]; then echo "skip $name"; return; fi
  for attempt in 1 2 3; do
    if z-ai image -p "$prompt" -o "$IMG_DIR/$name.png" -s "$size" >/dev/null 2>&1 && [ -f "$IMG_DIR/$name.png" ]; then
      echo "OK $name (attempt $attempt)"; return
    fi
    sleep 3
  done
  echo "FAIL $name"
}

wave1() {
  gen hero-litigation 1344x768 "Cinematic wide photograph of a majestic South African high court interior, tall stone columns and polished wooden judge bench, dramatic warm golden light streaming through tall arched windows, deep navy blue shadows, premium law firm aesthetic, photorealistic, high quality, no people, no text, no words" &
  gen hero-development 1344x768 "Aerial golden hour photograph of a modern mixed-use property development in Pretoria South Africa, glass office towers and residential apartment blocks with tower cranes, jacaranda trees, warm dusk light, cinematic premium architectural photography, photorealistic, no text, no words" &
  gen hero-finance 1344x768 "Low angle photograph of premium glass corporate banking towers at dusk, warm golden window lights reflecting on facades, deep blue evening sky, financial district, cinematic architectural photography, photorealistic, high quality, no text, no words" &
  gen director 864x1152 "Professional corporate portrait photograph of a distinguished confident Black South African male attorney in his early 50s, elegant navy suit with subtle gold tie, warm genuine expression, standing in a premium law office with dark wood bookshelves softly blurred behind, soft professional studio lighting, shallow depth of field, photorealistic, high quality editorial photography" &
  wait
}

wave2() {
  gen office 1344x768 "Interior photograph of a premium law firm boardroom, long dark walnut conference table, leather executive chairs, floor to ceiling windows with city view, navy and brass gold accents, warm ambient lighting, no people, photorealistic, architectural digest style, no text" &
  gen group-construction 1344x768 "Photograph of a modern residential construction development at golden hour, tower cranes and concrete structure with scaffolding, warm cinematic light, South Africa, premium industrial photography, photorealistic, no text" &
  gen library 1344x768 "Photograph of an elegant law library, floor to ceiling dark wood shelves filled with leather-bound legal volumes, brass reading lamps glowing, rolling ladder, warm golden light, premium scholarly atmosphere, no people, photorealistic, no text" &
  gen agri 1344x768 "Aerial photograph of vast green and gold South African farmland at sunrise, neat crop rows, a farmhouse and gravel road, dramatic soft sky, cinematic premium aerial photography, photorealistic, no text" &
  wait
}

wave3() {
  gen mining 1344x768 "Photograph of open pit mine terraces at golden hour with heavy mining machinery, South Africa, dramatic warm light and dust haze, cinematic industrial photography, photorealistic, high quality, no text" &
  gen conveyancing 1344x768 "Photograph of elegant modern suburban homes on a tree-lined street in Pretoria South Africa at golden hour, jacaranda trees in bloom, warm inviting light, premium real estate photography, photorealistic, no text" &
  wait
}

case "$1" in
  1) wave1 ;;
  2) wave2; wave3 ;;
  *) wave1; wave2; wave3 ;;
esac
echo "WAVE $1 DONE — $(ls $IMG_DIR 2>/dev/null | wc -l) images so far"
