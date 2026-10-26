"""Create web-sized copies from the author's local artwork; originals stay untouched."""
from pathlib import Path
import json
import re
from PIL import Image, ImageOps, ImageDraw

root = Path(r'G:\My Drive\Music\RAIN 2.0\Graphics')
out = Path('public/comics/chapter-1')
out.mkdir(parents=True, exist_ok=True)
logo = Image.open(root / 'Logo.png')
print('Logo:', logo.size, logo.mode)
logo.thumbnail((1600, 1600))
logo.save('public/rain-official.png')
base = root / 'Anime/Comics'
episodes = sorted(p for p in base.iterdir() if p.is_dir() and p.name.startswith('episode '))
panels = []
thumbs = []
for episode in episodes:
    folder = episode / 'panels' if (episode / 'panels').exists() else episode
    files = sorted((p for p in folder.iterdir() if re.fullmatch(r'panel \d+( v\d+)?\.png', p.name, re.I)), key=lambda p: int(re.search(r'\d+', p.name)[0]))
    for source in files:
        # Episode 2 panel 0 repeats the preceding episode's final panel.
        if episode.name.startswith('episode 2') and source.name.lower() == 'panel 0.png':
            continue
        im = Image.open(source).convert('RGB')
        im.thumbnail((1600, 2400))
        name = f'panel-{len(panels)+1:02}.webp'
        im.save(out / name, quality=90, method=6)
        panels.append({'src':f'comics/chapter-1/{name}', 'width':im.width, 'height':im.height, 'source':f'{episode.name}/{source.name}'})
        tile = Image.new('RGB', (240, 270), '#172025')
        thumb = ImageOps.contain(im, (230, 235))
        tile.paste(thumb, ((240-thumb.width)//2, 0))
        ImageDraw.Draw(tile).text((8, 242), f'{len(panels):02} | Ep {episodes.index(episode)+1} | {source.stem}', fill='white')
        thumbs.append(tile)
cover = Image.open(episodes[0] / 'panels/Cover Art - Chapter 1.png').convert('RGB')
cover.thumbnail((1200,1800))
cover.save(out / 'cover.webp', quality=90)
Path('src/comics.json').write_text(json.dumps(panels, indent=2))
sheet = Image.new('RGB', (240*5,270*((len(thumbs)+4)//5)), '#172025')
for i,tile in enumerate(thumbs): sheet.paste(tile, ((i%5)*240,(i//5)*270))
Path('.local').mkdir(exist_ok=True)
sheet.save('.local/comic-contact.jpg')
print(f'Imported {len(panels)} panels in episode and panel order.')
