# Halloween Sound DJ

할로윈 파티용 DJ 스타일 음향효과 사이트입니다. 배경음악을 틀면서 다양한 효과음 버튼을 눌러 분위기를 연출할 수 있습니다.

## 데모

https://yshsky-dev.github.io/halloween-dj/

## 기능

- 배경음악 재생 (자동 다음곡 재생)
- 16+ 효과음 버튼 (DJ 패드 스타일)
- 배경음악/효과음 볼륨 개별 조절
- 키보드 단축키 지원
- 모바일/태블릿 반응형 디자인
- 파일 추가 시 자동 버튼 생성

## 키보드 단축키

| 키 | 기능 |
|---|---|
| Space | 재생/일시정지 |
| ← → | 이전/다음 트랙 |
| ↑ ↓ | 볼륨 조절 |
| M | 음소거 |
| 1-9 | 효과음 재생 |
| ESC | 정지 |

## 폴더 구조

```
halloween-dj/
├── index.html
├── css/style.css
├── js/app.js
├── bgm/              # 배경음악
│   └── list.json
├── sfx/              # 효과음
│   └── list.json
└── generate-list.js  # 파일 목록 생성 스크립트
```

## 오디오 파일 추가 방법

1. `bgm/` 또는 `sfx/` 폴더에 mp3 파일 추가
2. `node generate-list.js` 실행
3. 브라우저 새로고침

파일명에 따라 아이콘이 자동 매칭됩니다 (예: ghost → 👻, wolf → 🐺)

## GitHub Pages 배포

1. Repository Settings → Pages
2. Source를 "main" 브랜치로 설정
3. `https://[username].github.io/halloween-dj/` 에서 접속

## 라이선스

자유롭게 사용하세요! 🎃
