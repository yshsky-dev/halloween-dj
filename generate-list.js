// bgm, sfx 폴더의 파일 목록을 생성하는 스크립트
// 새 파일을 추가한 후 이 스크립트를 실행하세요: node generate-list.js

const fs = require('fs');
const path = require('path');

// 지원하는 오디오 확장자
const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.webm'];

function generateList(folder) {
    const folderPath = path.join(__dirname, folder);
    const outputFile = path.join(folderPath, 'list.json');
    
    if (!fs.existsSync(folderPath)) {
        console.log(`[SKIP] ${folder}/ folder not found`);
        return;
    }
    
    // 오디오 파일들 찾기
    const files = fs.readdirSync(folderPath)
        .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return audioExtensions.includes(ext);
        })
        .sort();
    
    // JSON 파일 생성
    const data = {
        generated: new Date().toISOString(),
        count: files.length,
        files: files
    };
    
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    
    console.log(`\n=== ${folder}/ ===`);
    console.log(`Generated: ${outputFile}`);
    console.log(`Found ${files.length} audio files:`);
    files.forEach(f => console.log(`  - ${f}`));
}

// bgm과 sfx 폴더 모두 처리
generateList('bgm');
generateList('sfx');

console.log('\n✅ Done! Refresh your browser to see the changes.');
