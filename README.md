# Halloween Sound DJ

할로윈 파티용 DJ 스타일 음향효과 사이트입니다. 배경음악을 틀면서 다양한 효과음 버튼을 눌러 분위기를 연출할 수 있습니다.

## 사용 방법

1. **배경음악**: 왼쪽 리스트에서 음악을 선택하면 자동 재생됩니다
2. **효과음**: 아래 버튼 패드를 클릭하면 즉시 효과음이 재생됩니다
3. **볼륨 조절**: 배경음악과 효과음 볼륨을 따로 조절할 수 있습니다

### 키보드 단축키

| 키 | 기능 |
|---|---|
| Space | 재생/일시정지 |
| ← → | 이전/다음 트랙 |
| ↑ ↓ | 볼륨 조절 |
| M | 음소거 |
| 1-9 | 효과음 재생 |
| ESC | 정지 |

## 리소스 폴더 구조

```
halloween-site/
├── index.html          # 메인 페이지
├── css/
│   └── style.css       # 스타일시트
├── js/
│   └── app.js          # 메인 JavaScript
├── bgm/                # 배경음악 폴더
│   ├── haunted-house.mp3
│   ├── creepy-night.mp3
│   ├── witch-dance.mp3
│   ├── graveyard-waltz.mp3
│   └── monster-mash.mp3
└── sfx/                # 효과음 폴더
    ├── ghost-whisper.mp3
    ├── wolf-howl.mp3
    ├── scream.mp3
    ├── thunder.mp3
    ├── monster-growl.mp3
    ├── zombie-groan.mp3
    ├── witch-laugh.mp3
    ├── vampire-hiss.mp3
    ├── chains.mp3
    ├── creaky-door.mp3
    ├── eerie-wind.mp3
    ├── owl-hoot.mp3
    ├── heartbeat.mp3
    ├── evil-laugh.mp3
    ├── cat-hiss.mp3
    └── bat-swarm.mp3
```

## 오디오 파일 추가 방법

### 배경음악 (bgm 폴더)

`bgm/` 폴더에 다음 파일명으로 MP3 파일을 추가하세요:

| 파일명 | 설명 |
|--------|------|
| `haunted-house.mp3` | 유령의 집 배경음 |
| `creepy-night.mp3` | 으스스한 밤 분위기 |
| `witch-dance.mp3` | 마녀의 춤곡 |
| `graveyard-waltz.mp3` | 묘지 왈츠 |
| `monster-mash.mp3` | 몬스터 파티 음악 |

### 효과음 (sfx 폴더)

`sfx/` 폴더에 다음 파일명으로 MP3 파일을 추가하세요:

| 파일명 | 설명 |
|--------|------|
| `ghost-whisper.mp3` | 유령 속삭임 |
| `wolf-howl.mp3` | 늑대 울음소리 |
| `scream.mp3` | 비명 소리 |
| `thunder.mp3` | 천둥 번개 |
| `monster-growl.mp3` | 괴물 으르렁 |
| `zombie-groan.mp3` | 좀비 신음 |
| `witch-laugh.mp3` | 마녀 웃음소리 |
| `vampire-hiss.mp3` | 뱀파이어 쉿 소리 |
| `chains.mp3` | 쇠사슬 소리 |
| `creaky-door.mp3` | 삐걱거리는 문 |
| `eerie-wind.mp3` | 으스스한 바람 |
| `owl-hoot.mp3` | 부엉이 울음 |
| `heartbeat.mp3` | 심장 박동 |
| `evil-laugh.mp3` | 사악한 웃음 |
| `cat-hiss.mp3` | 검은 고양이 |
| `bat-swarm.mp3` | 박쥐 떼 소리 |

## 무료 효과음 다운로드 사이트

- [Freesound](https://freesound.org/) - 무료 효과음 라이브러리
- [Pixabay](https://pixabay.com/sound-effects/) - 로열티 프리 사운드
- [Zapsplat](https://www.zapsplat.com/) - 무료 효과음 (가입 필요)
- [Mixkit](https://mixkit.co/free-sound-effects/) - 무료 사운드 이펙트

## GitHub Pages 배포 방법

1. GitHub에 새 repository 생성
2. 프로젝트 파일 전체 업로드
3. Repository Settings → Pages → Source를 "main" 브랜치로 설정
4. 몇 분 후 `https://[username].github.io/[repository-name]` 에서 접속 가능

### Git 명령어

```bash
cd halloween-site
git init
git add .
git commit -m "Initial commit: Halloween Sound DJ"
git branch -M main
git remote add origin https://github.com/[username]/halloween-sound-dj.git
git push -u origin main
```

## 커스터마이징

### 배경음악 추가/변경

`index.html`에서 `music-list` 부분을 수정하세요:

```html
<button class="music-item" data-track="bgm/your-track.mp3">
    <span class="track-icon">🎃</span>
    <span class="track-name">Your Track Name</span>
</button>
```

### 효과음 버튼 추가

`index.html`에서 `sfx-pad` 부분에 버튼을 추가하세요:

```html
<button class="sfx-btn your-class" data-sound="sfx/your-sound.mp3">
    <span class="sfx-icon">👻</span>
    <span class="sfx-name">Your Sound</span>
</button>
```

## 라이선스

자유롭게 사용하세요! 🎃
