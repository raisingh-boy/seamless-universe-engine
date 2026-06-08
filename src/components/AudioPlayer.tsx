import React, { useState, useEffect, useRef } from 'react';
import { AudioItem, SomaticNode, Domain } from '../types';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  Clock, Headphones, ChevronUp, ChevronDown, ListMusic, Layers, Maximize2, Minimize2
} from 'lucide-react';

interface AudioPlayerProps {
  tracks: AudioItem[];
  allNodes: SomaticNode[];
  language: 'ru' | 'en';
  onSelectNode: (node: SomaticNode) => void;
  directPlayNodeId?: string | null;
  onClearDirectPlay?: () => void;
  onActiveNode?: (nodeId: string | null) => void;
}

const DOMAIN_COLORS: Record<Domain, string> = {
  body: '#E8A95C',
  science: '#5C9BE8',
  philosophy: '#9B5CE8',
  movement: '#5CE87A',
  cognition: '#EAEAEA',
  hybrid: '#E85C7A'
};

// Real audio playback using HTMLAudioElement
function useAudioPlayer(tracks: AudioItem[], currentIndex: number) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = tracks[currentIndex];
    if (!track?.audioUrl) return;
    audio.pause();
    audio.src = '';
    audio.src = track.audioUrl;
    audio.volume = volume;
    audio.load();

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || track.duration);
    const onEnded = () => { setIsPlaying(false); setCurrentTime(0); };
    const onError = () => { console.warn('Audio load error:', track.audioUrl); setIsPlaying(false); };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [currentIndex, tracks]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {}); }
  };

  const seek = (time: number) => { if (audioRef.current) { audioRef.current.currentTime = time; setCurrentTime(time); } };
  const skipForward = () => seek(Math.min(currentTime + 15, duration));
  const skipBackward = () => seek(Math.max(currentTime - 15, 0));
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

  return { isPlaying, currentTime, duration, volume, setVolume, togglePlay, skipForward, skipBackward, seek, formatTime };
}

const PROGRESS_COLORS: Record<string, string> = {
  body: 'from-amber-500 to-orange-400',
  science: 'from-blue-500 to-cyan-400',
  philosophy: 'from-purple-500 to-violet-400',
  movement: 'from-emerald-500 to-green-400',
  cognition: 'from-gray-300 to-white',
  hybrid: 'from-rose-500 to-pink-400'
};

export default function AudioPlayer({
  tracks, allNodes, language, onSelectNode,
  directPlayNodeId, onClearDirectPlay, onActiveNode
}: AudioPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const activeTrack = tracks[currentTrackIndex];
  const { isPlaying, currentTime, duration, volume, setVolume, togglePlay, skipForward, skipBackward, seek, formatTime } = useAudioPlayer(tracks, currentTrackIndex);

  // Handle direct play requests
  useEffect(() => {
    if (directPlayNodeId) {
      const idx = tracks.findIndex(t => t.timelineNodes?.some(n => n.nodeId === directPlayNodeId));
      if (idx >= 0) setCurrentTrackIndex(idx);
      setIsExpanded(true);
      onClearDirectPlay?.();
    }
  }, [directPlayNodeId]);

  const getActiveTimelineNode = () => {
    const timeMs = currentTime * 1000;
    const timeline = activeTrack?.timelineNodes || [];
    let active = null;
    for (const t of timeline) { if (timeMs >= t.timeMs) active = t; }
    return active;
  };

  useEffect(() => {
    const active = getActiveTimelineNode();
    if (active?.nodeId) onActiveNode?.(active.nodeId);
  }, [currentTime]);

  const activeCheckpoint = getActiveTimelineNode();
  const trackTitle = language === 'ru' ? activeTrack?.titleRu : activeTrack?.titleEn;
  const trackAuthor = language === 'ru' ? activeTrack?.authorRu : activeTrack?.authorEn;
  const domainColor = activeTrack?.domain ? (DOMAIN_COLORS[activeTrack.domain] || '#666') : '#666';

  // ===== COLLAPSED MODE =====
  if (!isExpanded) {
    // When playing: show a mini-bar with track info
    if (isPlaying) {
      return (
        <div className="fixed bottom-4 right-4 w-[280px] md:bottom-24 md:right-4 bg-[#0E1528]/98 border border-emerald-500/20 backdrop-blur-md rounded-xl shadow-2xl z-50 overflow-hidden cursor-pointer group"
          onClick={() => setIsExpanded(true)}>
          <div className="flex items-center gap-2 px-3 py-2.5">
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
                <Headphones className="w-4 h-4 text-white" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-medium text-white truncate">{trackTitle || ''}</div>
              <div className="text-[8px] text-gray-500 font-mono truncate">{trackAuthor || ''}</div>
            </div>
            <div className="w-1 h-8 rounded-full bg-emerald-400/30 overflow-hidden">
              <div className="w-full bg-emerald-400 transition-all" style={{height: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`}}></div>
            </div>
          </div>
        </div>
      );
    }
    // When not playing: tiny icon
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-[#0E1528]/98 border border-emerald-500/30 flex items-center justify-center shadow-2xl z-50 hover:border-emerald-400 hover:bg-[#1A2035] transition-all cursor-pointer group"
        title={language === 'ru' ? 'Открыть плеер' : 'Open player'}
      >
        <Headphones className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  // ===== EXPANDED MODE: BIG player with playlist =====
  return (
    <div className="fixed bottom-24 right-4 w-[380px] max-h-[60vh] bg-[#0E1528]/98 border border-white/10 backdrop-blur-lg rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-slide-in">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center shrink-0 shadow-lg">
            <Headphones className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">{trackTitle || (language === 'ru' ? 'Seamless Аудио' : 'Seamless Audio')}</div>
            <div className="text-[9px] text-gray-500 truncate font-mono">{trackAuthor || ''}</div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => { setShowPlaylist(!showPlaylist); }} className={`p-1.5 rounded-lg transition-all cursor-pointer ${showPlaylist ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}`} title={language === 'ru' ? 'Список треков' : 'Playlist'}>
            <ListMusic className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setIsExpanded(false)} className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer flex items-center gap-1" title={language === 'ru' ? 'Свернуть' : 'Minimize'}>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* PLAYLIST DROPDOWN */}
      {showPlaylist && (
        <div className="border-b border-white/5 max-h-40 overflow-y-auto bg-black/30">
          {tracks.map((t, i) => {
            const ttl = language === 'ru' ? t.titleRu : t.titleEn;
            const auth = language === 'ru' ? t.authorRu : t.authorEn;
            return (
              <button key={t.id} onClick={() => { setCurrentTrackIndex(i); setShowPlaylist(false); }}
                className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-all cursor-pointer hover:bg-white/5 ${i === currentTrackIndex ? 'bg-emerald-500/10 border-l-2 border-emerald-400' : ''}`}>
                <div className={`w-2 h-2 rounded-full ${i === currentTrackIndex ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'}`}></div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-white truncate">{ttl}</div>
                  <div className="text-[8px] text-gray-500 font-mono">{auth} · {t.duration}s</div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* PROGRESS BAR */}
      <div className="px-4 pt-3 pb-1">
        <div className="h-1.5 bg-white/8 rounded-full cursor-pointer relative overflow-hidden group" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); seek(((e.clientX - r.left) / r.width) * duration); }}>
          <div className={`h-full rounded-full transition-all bg-gradient-to-r ${PROGRESS_COLORS[activeTrack?.domain || ''] || 'from-indigo-500 to-emerald-400'}`} style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity"></div>
        </div>
        <div className="flex justify-between text-[9px] text-gray-600 font-mono mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1.5">
          <button onClick={skipBackward} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"><SkipBack className="w-4 h-4" /></button>
          <button onClick={togglePlay} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all cursor-pointer active:scale-95">
            {isPlaying ? <Pause className="w-5 h-5 fill-current text-yellow-400" /> : <Play className="w-5 h-5 fill-current text-emerald-400" />}
          </button>
          <button onClick={skipForward} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"><SkipForward className="w-4 h-4" /></button>
        </div>

        {/* Track indicators (dots) */}
        <div className="flex items-center gap-1.5">
          {tracks.map((t, i) => (
            <button key={t.id} onClick={() => setCurrentTrackIndex(i)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === currentTrackIndex ? 'bg-emerald-400 scale-125' : 'bg-white/15 hover:bg-white/40'}`}
              title={language === 'ru' ? t.titleRu : t.titleEn} />
          ))}
        </div>

        {/* Volume */}
        <div className="flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-gray-500" />
          <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-14 h-1 accent-emerald-500 cursor-pointer" />
        </div>
      </div>

      {/* ACTIVE NODE CAPTION + RELATIONS */}
      <div className="px-4 pb-3">
        {activeCheckpoint && (
          <div onClick={() => { const f = allNodes.find(n => n.id === activeCheckpoint.nodeId); if (f) onSelectNode(f); }}
            className="bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2 cursor-pointer transition-all border border-white/5">
            <div className="text-[8px] font-mono tracking-wider text-indigo-400/80 uppercase">{language === 'ru' ? 'Сейчас в подкасте' : 'Now Playing'}</div>
            <div className="text-[11px] text-gray-200 mt-0.5 font-medium">
              {language === 'ru' ? activeCheckpoint.captionRu : activeCheckpoint.captionEn}
            </div>
          </div>
        )}

        {/* Relations from this track */}
        {!activeCheckpoint && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {(activeTrack?.timelineNodes || []).slice(0, 4).map((tn, i) => {
              const n = allNodes.find(n => n.id === tn.nodeId);
              if (!n) return null;
              return (
                <button key={i} onClick={() => onSelectNode(n)}
                  className="text-[9px] px-2 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer border border-white/5">
                  {language === 'ru' ? tn.captionRu?.slice(0, 20) : tn.captionEn?.slice(0, 20)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
