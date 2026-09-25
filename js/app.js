// Halloween Sound DJ - Main Application

// 파일명에서 아이콘 자동 매핑
const ICON_MAP = {
    'ghost': '👻',
    'wolf': '🐺',
    'howl': '🐺',
    'scream': '😱',
    'thunder': '⚡',
    'storm': '🌩️',
    'monster': '👾',
    'zombie': '🧟',
    'witch': '🧙',
    'vampire': '🧛',
    'hiss': '🐍',
    'snake': '🐍',
    'chains': '⛓️',
    'chain': '⛓️',
    'door': '🚪',
    'creak': '🚪',
    'wind': '🌬️',
    'owl': '🦉',
    'heart': '💓',
    'beat': '💓',
    'evil': '😈',
    'laugh': '😈',
    'cat': '🐈‍⬛',
    'bat': '🦇',
    'crow': '🐦‍⬛',
    'raven': '🐦‍⬛',
    'spider': '🕷️',
    'skull': '💀',
    'bone': '🦴',
    'grave': '🪦',
    'graveyard': '🪦',
    'coffin': '⚰️',
    'bell': '🔔',
    'clock': '🕰️',
    'rain': '🌧️',
    'fire': '🔥',
    'demon': '👿',
    'devil': '👿',
    'werewolf': '🐺',
    'mummy': '🧟',
    'frank': '🧟',
    'pumpkin': '🎃',
    'jack': '🎃',
    'blood': '🩸',
    'knife': '🔪',
    'axe': '🪓',
    'saw': '🪚',
    'foot': '👣',
    'step': '👣',
    'breath': '😮‍💨',
    'whisper': '👻',
    'moan': '😩',
    'groan': '😩',
    'growl': '👾',
    'roar': '🦁',
    'squeak': '🐀',
    'rat': '🐀',
    'glass': '🪟',
    'break': '💥',
    'crash': '💥',
    'bang': '💥',
    'boom': '💥',
    'explosion': '💥',
    'siren': '🚨',
    'alarm': '🚨',
    'horror': '😱',
    'scary': '😱',
    'spooky': '👻',
    'creepy': '👻',
    'eerie': '👻',
    'ambient': '🌙',
    'night': '🌙',
    'forest': '🌲',
    'swamp': '🐊',
    'water': '💧',
    'drip': '💧',
    'squish': '🫠',
    'slime': '🫠',
    'haunted': '🏚️',
    'house': '🏚️',
    'mansion': '🏚️',
    'castle': '🏰',
    'dungeon': '🏰',
    'dance': '💃',
    'waltz': '💃',
    'music': '🎵',
    'organ': '🎹',
    'piano': '🎹',
    'mash': '👾',
    'party': '🎉',
    'halloween': '🎃',
    'default': '🔊'
};

// 파일명에서 아이콘 찾기
function getIconForFilename(filename) {
    const lower = filename.toLowerCase();
    for (const [keyword, icon] of Object.entries(ICON_MAP)) {
        if (lower.includes(keyword)) {
            return icon;
        }
    }
    return ICON_MAP.default;
}

// 파일명을 보기 좋은 이름으로 변환
function formatName(filename) {
    return filename
        .replace(/\.(mp3|wav|ogg|m4a|webm)$/i, '')  // 확장자 제거
        .replace(/[-_]/g, ' ')              // 대시/언더스코어를 공백으로
        .replace(/\b\w/g, c => c.toUpperCase()); // 첫글자 대문자
}

// 파일명에서 CSS 클래스명 생성
function getClassForFilename(filename) {
    const lower = filename.toLowerCase().replace(/\.(mp3|wav|ogg|m4a|webm)$/i, '');
    for (const keyword of Object.keys(ICON_MAP)) {
        if (lower.includes(keyword) && keyword !== 'default') {
            return keyword;
        }
    }
    return 'default';
}

class HalloweenSoundDJ {
    constructor() {
        // Audio elements
        this.bgmAudio = new Audio();
        this.bgmAudio.loop = true;
        
        // State
        this.currentTrackIndex = -1;
        this.isPlaying = false;
        this.tracks = [];
        this.sfxButtons = [];
        
        // Initialize
        this.init();
    }
    
    async init() {
        this.cacheDOMElements();
        this.bindControlEvents();
        this.loadSettings();
        
        // BGM과 SFX 버튼 자동 생성
        await Promise.all([
            this.loadBgmTracks(),
            this.loadSfxButtons()
        ]);
        
        this.bindTrackEvents();
    }
    
    cacheDOMElements() {
        // Music controls
        this.musicList = document.getElementById('music-list');
        this.btnPlay = document.getElementById('btn-play');
        this.btnStop = document.getElementById('btn-stop');
        this.btnPrev = document.getElementById('btn-prev');
        this.btnNext = document.getElementById('btn-next');
        this.bgmVolume = document.getElementById('bgm-volume');
        this.currentTrackDisplay = document.getElementById('current-track');
        this.progressBar = document.getElementById('progress');
        this.progressContainer = document.querySelector('.progress-bar');
        
        // SFX controls
        this.sfxPad = document.getElementById('sfx-pad');
        this.sfxVolume = document.getElementById('sfx-volume');
    }
    
    async loadBgmTracks() {
        const bgmFiles = await this.discoverFiles('bgm');
        
        if (bgmFiles.length === 0) {
            this.musicList.innerHTML = '<div class="loading-msg">No music files found in bgm/ folder</div>';
            return;
        }
        
        // 트랙 버튼 생성
        this.musicList.innerHTML = '';
        this.tracks = [];
        
        for (const file of bgmFiles) {
            const btn = document.createElement('button');
            btn.className = 'music-item';
            btn.dataset.track = `bgm/${file}`;
            
            const icon = document.createElement('span');
            icon.className = 'track-icon';
            icon.textContent = getIconForFilename(file);
            
            const name = document.createElement('span');
            name.className = 'track-name';
            name.textContent = formatName(file);
            
            btn.appendChild(icon);
            btn.appendChild(name);
            
            this.musicList.appendChild(btn);
            
            this.tracks.push({
                src: `bgm/${file}`,
                name: formatName(file),
                element: btn
            });
        }
        
        console.log(`Loaded ${bgmFiles.length} background music tracks`);
    }
    
    async loadSfxButtons() {
        const sfxFiles = await this.discoverFiles('sfx');
        
        if (sfxFiles.length === 0) {
            this.sfxPad.innerHTML = '<div class="no-sounds">No sound files found in sfx/ folder</div>';
            return;
        }
        
        // 버튼 생성
        this.sfxPad.innerHTML = '';
        
        for (const file of sfxFiles) {
            const btn = document.createElement('button');
            const cssClass = getClassForFilename(file);
            btn.className = `sfx-btn ${cssClass}`;
            btn.dataset.sound = `sfx/${file}`;
            
            const icon = document.createElement('span');
            icon.className = 'sfx-icon';
            icon.textContent = getIconForFilename(file);
            
            const name = document.createElement('span');
            name.className = 'sfx-name';
            name.textContent = formatName(file);
            
            btn.appendChild(icon);
            btn.appendChild(name);
            
            btn.addEventListener('click', () => this.playSfx(btn));
            
            this.sfxPad.appendChild(btn);
        }
        
        this.sfxButtons = document.querySelectorAll('.sfx-btn');
        console.log(`Loaded ${sfxFiles.length} sound effects`);
    }
    
    async discoverFiles(folder) {
        // 방법 1: list.json 파일이 있으면 사용
        try {
            const response = await fetch(`${folder}/list.json`);
            if (response.ok) {
                const data = await response.json();
                return data.files || [];
            }
        } catch (e) {}
        
        // 방법 2: 알려진 파일들을 체크해서 존재하는 것만 반환
        const knownFiles = folder === 'bgm' 
            ? [
                'haunted-house.mp3', 'creepy-night.mp3', 'witch-dance.mp3',
                'graveyard-waltz.mp3', 'monster-mash.mp3', 'halloween-music.mp3',
                'spooky-ambient.mp3', 'horror-theme.mp3', 'dark-night.mp3'
            ]
            : [
                'ghost-whisper.mp3', 'wolf-howl.mp3', 'scream.mp3', 'thunder.mp3',
                'monster-growl.mp3', 'zombie-groan.mp3', 'witch-laugh.mp3', 'vampire-hiss.mp3',
                'chains.mp3', 'creaky-door.mp3', 'eerie-wind.mp3', 'owl-hoot.mp3',
                'heartbeat.mp3', 'evil-laugh.mp3', 'cat-hiss.mp3', 'bat-swarm.mp3'
            ];
        
        const existingFiles = [];
        
        for (const file of knownFiles) {
            try {
                const response = await fetch(`${folder}/${file}`, { method: 'HEAD' });
                if (response.ok) {
                    existingFiles.push(file);
                }
            } catch (e) {}
        }
        
        return existingFiles;
    }
    
    bindControlEvents() {
        // Control buttons
        this.btnPlay.addEventListener('click', () => this.togglePlay());
        this.btnStop.addEventListener('click', () => this.stop());
        this.btnPrev.addEventListener('click', () => this.prevTrack());
        this.btnNext.addEventListener('click', () => this.nextTrack());
        
        // Volume controls
        this.bgmVolume.addEventListener('input', (e) => this.setBgmVolume(e.target.value));
        this.sfxVolume.addEventListener('input', (e) => this.setSfxVolume(e.target.value));
        
        // Progress bar
        this.progressContainer.addEventListener('click', (e) => this.seekTo(e));
        
        // Audio events
        this.bgmAudio.addEventListener('timeupdate', () => this.updateProgress());
        this.bgmAudio.addEventListener('ended', () => this.onTrackEnd());
        this.bgmAudio.addEventListener('error', (e) => this.handleAudioError(e, 'BGM'));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    bindTrackEvents() {
        // Music item clicks (동적으로 생성된 버튼들)
        const musicItems = document.querySelectorAll('.music-item');
        musicItems.forEach((item, index) => {
            item.addEventListener('click', () => this.selectTrack(index));
        });
    }
    
    loadSettings() {
        // Load saved volume settings
        const savedBgmVolume = localStorage.getItem('halloweenDJ_bgmVolume');
        const savedSfxVolume = localStorage.getItem('halloweenDJ_sfxVolume');
        
        if (savedBgmVolume !== null) {
            this.bgmVolume.value = savedBgmVolume;
            this.setBgmVolume(savedBgmVolume);
        } else {
            this.setBgmVolume(50);
        }
        
        if (savedSfxVolume !== null) {
            this.sfxVolume.value = savedSfxVolume;
            this.setSfxVolume(savedSfxVolume);
        } else {
            this.setSfxVolume(70);
        }
    }
    
    selectTrack(index) {
        if (index < 0 || index >= this.tracks.length) return;
        
        // Update UI
        document.querySelectorAll('.music-item').forEach(item => item.classList.remove('active'));
        this.tracks[index].element.classList.add('active');
        
        // Load and play
        this.currentTrackIndex = index;
        this.bgmAudio.src = this.tracks[index].src;
        this.currentTrackDisplay.textContent = this.tracks[index].name;
        
        this.play();
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            if (this.currentTrackIndex === -1 && this.tracks.length > 0) {
                this.selectTrack(0);
            } else {
                this.play();
            }
        }
    }
    
    play() {
        if (this.currentTrackIndex === -1) return;
        
        this.bgmAudio.play()
            .then(() => {
                this.isPlaying = true;
                this.btnPlay.innerHTML = '&#10074;&#10074;'; // Pause icon
            })
            .catch(err => {
                console.error('Playback failed:', err);
                this.handleAudioError(err, 'BGM');
            });
    }
    
    pause() {
        this.bgmAudio.pause();
        this.isPlaying = false;
        this.btnPlay.innerHTML = '&#9654;'; // Play icon
    }
    
    stop() {
        this.bgmAudio.pause();
        this.bgmAudio.currentTime = 0;
        this.isPlaying = false;
        this.btnPlay.innerHTML = '&#9654;';
        this.progressBar.style.width = '0%';
    }
    
    prevTrack() {
        if (this.tracks.length === 0) return;
        
        let newIndex = this.currentTrackIndex - 1;
        if (newIndex < 0) newIndex = this.tracks.length - 1;
        this.selectTrack(newIndex);
    }
    
    nextTrack() {
        if (this.tracks.length === 0) return;
        
        let newIndex = this.currentTrackIndex + 1;
        if (newIndex >= this.tracks.length) newIndex = 0;
        this.selectTrack(newIndex);
    }
    
    setBgmVolume(value) {
        const volume = value / 100;
        this.bgmAudio.volume = volume;
        localStorage.setItem('halloweenDJ_bgmVolume', value);
    }
    
    setSfxVolume(value) {
        this.currentSfxVolume = value / 100;
        localStorage.setItem('halloweenDJ_sfxVolume', value);
    }
    
    updateProgress() {
        if (this.bgmAudio.duration) {
            const progress = (this.bgmAudio.currentTime / this.bgmAudio.duration) * 100;
            this.progressBar.style.width = `${progress}%`;
        }
    }
    
    seekTo(e) {
        if (!this.bgmAudio.duration) return;
        
        const rect = this.progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        this.bgmAudio.currentTime = percentage * this.bgmAudio.duration;
    }
    
    onTrackEnd() {
        // Auto play next track
        this.nextTrack();
    }
    
    playSfx(btn) {
        const soundPath = btn.dataset.sound;
        
        // Add visual feedback
        btn.classList.add('playing');
        setTimeout(() => btn.classList.remove('playing'), 300);
        
        // Create new audio instance for overlapping sounds
        const audio = new Audio(soundPath);
        audio.volume = this.currentSfxVolume || 0.7;
        
        audio.play().catch(err => {
            console.error('SFX playback failed:', err);
            btn.classList.add('error');
            setTimeout(() => btn.classList.remove('error'), 500);
        });
        
        // Clean up after playback
        audio.addEventListener('ended', () => {
            audio.remove();
        });
    }
    
    handleKeyboard(e) {
        // Prevent shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT') return;
        
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlay();
                break;
            case 'ArrowLeft':
                this.prevTrack();
                break;
            case 'ArrowRight':
                this.nextTrack();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.bgmVolume.value = Math.min(100, parseInt(this.bgmVolume.value) + 5);
                this.setBgmVolume(this.bgmVolume.value);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.bgmVolume.value = Math.max(0, parseInt(this.bgmVolume.value) - 5);
                this.setBgmVolume(this.bgmVolume.value);
                break;
            case 'KeyM':
                // Mute/unmute
                if (this.bgmAudio.volume > 0) {
                    this.previousVolume = this.bgmVolume.value;
                    this.bgmVolume.value = 0;
                    this.setBgmVolume(0);
                } else {
                    this.bgmVolume.value = this.previousVolume || 50;
                    this.setBgmVolume(this.bgmVolume.value);
                }
                break;
            case 'Escape':
                this.stop();
                break;
        }
        
        // Number keys 1-9 for SFX
        if (e.code.startsWith('Digit') && !e.ctrlKey && !e.altKey) {
            const num = parseInt(e.code.replace('Digit', ''));
            if (num >= 1 && num <= this.sfxButtons.length) {
                this.sfxButtons[num - 1].click();
            }
        }
    }
    
    handleAudioError(error, type) {
        console.error(`${type} Error:`, error);
        
        if (type === 'BGM') {
            this.currentTrackDisplay.textContent = 'Error loading track';
            this.tracks[this.currentTrackIndex]?.element?.classList.add('error');
            setTimeout(() => {
                this.tracks[this.currentTrackIndex]?.element?.classList.remove('error');
            }, 1000);
        }
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.halloweenDJ = new HalloweenSoundDJ();
    console.log('Halloween Sound DJ initialized!');
    console.log('Keyboard shortcuts:');
    console.log('  Space: Play/Pause');
    console.log('  Left/Right: Previous/Next track');
    console.log('  Up/Down: Volume');
    console.log('  M: Mute/Unmute');
    console.log('  1-9: Play sound effects');
    console.log('  Escape: Stop');
});
