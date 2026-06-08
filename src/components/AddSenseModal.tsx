import React, { useState, useRef, useEffect } from 'react';
import { SomaticNode, Domain } from '../types';
import { X, Sparkles, Brain, Link2, Check, ArrowRight, Loader2, MessageSquare, BookOpen, Users } from 'lucide-react';
import { chatWithAI } from '../api/universeApi';

interface AddSenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  allNodes: SomaticNode[];
  language: 'ru' | 'en';
  onAddObservation: (obs: { name: string; text: string; domain: Domain; linkToId?: string; isPrivate?: boolean }) => void;
  onAddConnection: (conn: { sourceId: string; targetId: string; text: string }) => void;
  onAddAgendaQuestion: (q: { text: string; domains: Domain[] }) => void;
  onAddGlobalStory: (story: { nodeId: string; text: string }) => void;
}

const t = (ru: string, en: string, lang: 'ru' | 'en') => lang === 'ru' ? ru : en;

const DOMAINS: { key: Domain; labelRu: string; labelEn: string; color: string }[] = [
  { key: 'body', labelRu: 'Тело', labelEn: 'Body', color: '#E8A95C' },
  { key: 'science', labelRu: 'Наука', labelEn: 'Science', color: '#5C9BE8' },
  { key: 'philosophy', labelRu: 'Философия', labelEn: 'Philosophy', color: '#9B5CE8' },
  { key: 'cognition', labelRu: 'Когниция', labelEn: 'Cognition', color: '#EAEAEA' },
  { key: 'movement', labelRu: 'Движение', labelEn: 'Movement', color: '#5CE87A' },
  { key: 'hybrid', labelRu: 'Гибрид', labelEn: 'Hybrid', color: '#E85C7A' },
];

type TabType = 'observation' | 'connection' | 'story' | 'ai';

export default function AddSenseModal({
  isOpen, onClose, allNodes, language,
  onAddObservation, onAddConnection, onAddAgendaQuestion, onAddGlobalStory
}: AddSenseModalProps) {
  const [tab, setTab] = useState<TabType>('observation');
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ type: string; title: string; description: string; domain?: Domain; sourceId?: string; targetId?: string; nodeId?: string; } | null>(null);
  const [step, setStep] = useState<'input' | 'confirm' | 'done'>('input');
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedDomain, setSelectedDomain] = useState<Domain>('hybrid');
  const [selectedLinkTo, setSelectedLinkTo] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [storyNodeId, setStoryNodeId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setInputText('');
      setResult(null);
      setError(null);
      setStep('input');
      setSelectedDomain('hybrid');
      setSelectedLinkTo('');
      setIsPrivate(false);
      setSourceId('');
      setTargetId('');
      setStoryNodeId('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const tabs: { key: TabType; icon: React.ReactNode; labelRu: string; labelEn: string }[] = [
    { key: 'observation', icon: <MessageSquare className="w-3.5 h-3.5" />, labelRu: 'Заметка', labelEn: 'Note' },
    { key: 'connection', icon: <Link2 className="w-3.5 h-3.5" />, labelRu: 'Связь', labelEn: 'Connect' },
    { key: 'story', icon: <BookOpen className="w-3.5 h-3.5" />, labelRu: 'История', labelEn: 'Story' },
    { key: 'ai', icon: <Sparkles className="w-3.5 h-3.5" />, labelRu: 'AI', labelEn: 'AI' },
  ];

  // ============== AI AUTO-DETECT ==============
  const handleAIAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const res = await chatWithAI(JSON.stringify({
        action: 'analyze_input', text: inputText.trim(), language,
        existingNodeNames: allNodes.slice(0, 50).map(n => n.nameEn || n.nameRu || n.id).join(', ')
      }), 'add sense modal');
      let parsed;
      try {
        const rawText = res.response || res.text || '{}';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      } catch { parsed = null; }
      if (parsed && parsed.type) {
        setResult(parsed);
      } else {
        setResult({ type: 'story', title: inputText.trim().slice(0, 40), description: inputText.trim(), domain: 'hybrid' });
      }
      setStep('confirm');
    } catch {
      setError(t('AI недоступен.', 'AI unavailable.', language));
      setResult({ type: 'observation', title: inputText.trim().slice(0, 40), description: inputText.trim(), domain: 'hybrid' });
      setStep('confirm');
    }
    setIsAnalyzing(false);
  };

  const handleConfirm = () => {
    if (!result) return;
    switch (result.type) {
      case 'observation':
        onAddObservation({ name: result.title || inputText.trim().slice(0, 40), text: result.description || inputText.trim(), domain: result.domain || 'hybrid', linkToId: result.sourceId });
        break;
      case 'connection':
        if (result.sourceId && result.targetId) onAddConnection({ sourceId: result.sourceId, targetId: result.targetId, text: result.description || inputText.trim() });
        break;
      case 'story':
        onAddGlobalStory({ nodeId: result.nodeId || allNodes[0]?.id || 'central-me', text: result.description || inputText.trim() });
        break;
    }
    setStep('done');
    setTimeout(() => { onClose(); setStep('input'); }, 1200);
  };

  const handleSubmitObservation = () => {
    if (!inputText.trim()) return;
    onAddObservation({ name: inputText.trim().slice(0, 40), text: inputText.trim(), domain: selectedDomain, linkToId: selectedLinkTo || undefined, isPrivate });
    setStep('done');
    setTimeout(() => { onClose(); setStep('input'); }, 1000);
  };

  const handleSubmitConnection = () => {
    if (!sourceId || !targetId || !inputText.trim()) return;
    onAddConnection({ sourceId, targetId, text: inputText.trim() });
    setStep('done');
    setTimeout(() => { onClose(); setStep('input'); }, 1000);
  };

  const handleSubmitStory = () => {
    if (!inputText.trim()) return;
    onAddGlobalStory({ nodeId: storyNodeId || allNodes[0]?.id || 'central-me', text: inputText.trim() });
    setStep('done');
    setTimeout(() => { onClose(); setStep('input'); }, 1000);
  };

  const nodeOptions = allNodes.map(n => ({
    id: n.id,
    label: n.nameEn || n.nameRu || n.id,
    domain: n.domain,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full md:w-[460px] max-h-[85vh] bg-[#0E1528]/98 border border-white/10 backdrop-blur-lg rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden animate-slide-in" onClick={e => e.stopPropagation()}>

        {/* ========== HEADER ========== */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
          <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">
            {t('Добавить смысл', 'Add Sense', language)}
          </span>
          <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ========== DONE STATE ========== */}
        {step === 'done' && (
          <div className="p-14 flex flex-col items-center gap-3">
            <Check className="w-10 h-10 text-emerald-400" />
            <span className="text-sm text-gray-300 font-medium">{t('Добавлено!', 'Added!', language)}</span>
          </div>
        )}

        {/* ========== AI CONFIRM STATE ========== */}
        {step === 'confirm' && result && (
          <div className="p-5 space-y-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="text-[9px] font-mono tracking-wider text-indigo-400 uppercase mb-2">
                {t('AI определил', 'AI identified', language)}
              </div>
              <div className="text-xs font-medium text-white mb-1">{result.title || inputText.trim().slice(0, 50)}</div>
              <div className="text-[11px] text-gray-400 leading-relaxed">{result.description || inputText.trim()}</div>
              <div className="flex gap-2 mt-3">
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-gray-400 font-mono">{result.type}</span>
                {result.domain && <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-gray-400 font-mono">{result.domain}</span>}
              </div>
            </div>
            {error && <div className="text-[10px] text-amber-400 bg-amber-400/10 px-3 py-2 rounded-lg">{error}</div>}
            <div className="flex gap-2">
              <button onClick={() => setStep('input')} className="flex-1 px-4 py-2.5 text-xs border border-white/10 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                {t('Изменить', 'Edit', language)}
              </button>
              <button onClick={handleConfirm} className="flex-1 px-4 py-2.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5" /> {t('Добавить', 'Add', language)}
              </button>
            </div>
          </div>
        )}

        {/* ========== INPUT MODE ========== */}
        {step === 'input' && (
          <>
            {/* Tabs */}
            <div className="flex border-b border-white/5 shrink-0">
              {tabs.map(tabItem => (
                <button key={tabItem.key} onClick={() => { setTab(tabItem.key); setInputText(''); setError(null); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[10px] font-mono tracking-wide transition-all cursor-pointer ${tab === tabItem.key ? 'text-white border-b-2 border-emerald-400' : 'text-gray-500 hover:text-gray-300'}`}>
                  {tabItem.icon} {t(tabItem.labelRu, tabItem.labelEn, language)}
                </button>
              ))}
            </div>

            <div className="p-4 space-y-4 overflow-y-auto max-h-[65vh]">

              {/* ===== TAB: OBSERVATION (Заметка) ===== */}
              {tab === 'observation' && (
                <div className="space-y-3">
                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 mb-2">{t('Текст заметки', 'Note text', language)}</div>
                    <textarea
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder={t('О чём твоя заметка?', 'What is your note about?', language)}
                      className="w-full bg-white/5 text-sm text-white px-3 py-3 rounded-xl border border-white/10 focus:border-amber-500/50 focus:outline-none placeholder-gray-600 resize-none h-24"
                    />
                  </div>

                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 mb-2">{t('Домен', 'Domain', language)}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {DOMAINS.map(d => (
                        <button key={d.key} onClick={() => setSelectedDomain(d.key)}
                          className={`text-[10px] px-3 py-1.5 rounded-full border transition-all cursor-pointer ${selectedDomain === d.key ? 'text-white border-current' : 'text-gray-500 border-white/10 hover:border-white/30'}`}
                          style={selectedDomain === d.key ? { borderColor: d.color, color: d.color } : {}}>
                          {t(d.labelRu, d.labelEn, language)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 mb-2">{t('Привязать к ноде (необязательно)', 'Link to a node (optional)', language)}</div>
                    <select value={selectedLinkTo} onChange={e => setSelectedLinkTo(e.target.value)}
                      className="w-full bg-white/5 text-sm text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none cursor-pointer">
                      <option value="">—</option>
                      {nodeOptions.slice(0, 50).map(n => (
                        <option key={n.id} value={n.id} className="bg-[#0E1528]">{n.label}</option>
                      ))}
                    </select>
                  </div>

                  <label className="flex items-center gap-2 text-[11px] text-gray-500 cursor-pointer">
                    <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} className="accent-amber-500" />
                    {t('Личное (только для меня)', 'Private (only for me)', language)}
                  </label>

                  <button onClick={handleSubmitObservation} disabled={!inputText.trim()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-medium disabled:opacity-30 transition-all cursor-pointer flex items-center justify-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {t('Добавить заметку', 'Add Note', language)}
                  </button>
                </div>
              )}

              {/* ===== TAB: CONNECTION (Связь) ===== */}
              {tab === 'connection' && (
                <div className="space-y-3">
                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 mb-2">{t('Откуда', 'From', language)}</div>
                    <select value={sourceId} onChange={e => setSourceId(e.target.value)}
                      className="w-full bg-white/5 text-sm text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none cursor-pointer">
                      <option value="">{t('Выбери ноду', 'Select node', language)}</option>
                      {nodeOptions.slice(0, 80).map(n => (
                        <option key={n.id} value={n.id} className="bg-[#0E1528]">{n.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-center text-gray-600">
                    <ArrowRight className="w-5 h-5" />
                  </div>

                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 mb-2">{t('Куда', 'To', language)}</div>
                    <select value={targetId} onChange={e => setTargetId(e.target.value)}
                      className="w-full bg-white/5 text-sm text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none cursor-pointer">
                      <option value="">{t('Выбери ноду', 'Select node', language)}</option>
                      {nodeOptions.slice(0, 80).map(n => (
                        <option key={n.id} value={n.id} className="bg-[#0E1528]">{n.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 mb-2">{t('Описание связи', 'Connection description', language)}</div>
                    <textarea
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder={t('Как они связаны?', 'How are they connected?', language)}
                      className="w-full bg-white/5 text-sm text-white px-3 py-3 rounded-xl border border-white/10 focus:border-indigo-500/50 focus:outline-none placeholder-gray-600 resize-none h-20"
                    />
                  </div>

                  <button onClick={handleSubmitConnection} disabled={!sourceId || !targetId || !inputText.trim()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-medium disabled:opacity-30 transition-all cursor-pointer flex items-center justify-center gap-2">
                    <Link2 className="w-3.5 h-3.5" />
                    {t('Создать связь', 'Create Connection', language)}
                  </button>
                </div>
              )}

              {/* ===== TAB: STORY (История) ===== */}
              {tab === 'story' && (
                <div className="space-y-3">
                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 mb-2">{t('Привязать к ноде', 'Link to node', language)}</div>
                    <select value={storyNodeId} onChange={e => setStoryNodeId(e.target.value)}
                      className="w-full bg-white/5 text-sm text-white px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none cursor-pointer">
                      <option value="">{t('Общая история (без привязки)', 'Global story (no node)', language)}</option>
                      {nodeOptions.slice(0, 80).map(n => (
                        <option key={n.id} value={n.id} className="bg-[#0E1528]">{n.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 mb-2">{t('Текст истории', 'Story text', language)}</div>
                    <textarea
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder={t('Напиши историю...', 'Write a story...', language)}
                      className="w-full bg-white/5 text-sm text-white px-3 py-3 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none placeholder-gray-600 resize-none h-28"
                    />
                  </div>

                  <button onClick={handleSubmitStory} disabled={!inputText.trim()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-medium disabled:opacity-30 transition-all cursor-pointer flex items-center justify-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    {t('Добавить историю', 'Add Story', language)}
                  </button>
                </div>
              )}

              {/* ===== TAB: AI ===== */}
              {tab === 'ai' && (
                <div className="space-y-3">
                  <div className="bg-indigo-500/5 rounded-2xl p-3 border border-indigo-500/10">
                    <p className="text-[10px] text-indigo-400/70 leading-relaxed">
                      {t('Опиши что хочешь добавить — AI определит формат: заметку, связь между нодами или историю.', 'Describe what you want to add — AI will determine the format: note, connection between nodes, or story.', language)}
                    </p>
                  </div>

                  <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                    <textarea
                      ref={inputRef as any}
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder={t('Связать йогу с нейронаукой...', 'Connect yoga with neuroscience...', language)}
                      className="w-full bg-white/5 text-sm text-white px-3 py-3 rounded-xl border border-white/10 focus:border-emerald-500/50 focus:outline-none placeholder-gray-600 resize-none h-24"
                    />
                  </div>

                  <button onClick={handleAIAnalyze} disabled={isAnalyzing || !inputText.trim()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-medium disabled:opacity-30 transition-all cursor-pointer flex items-center justify-center gap-2">
                    {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    {isAnalyzing ? t('AI анализирует...', 'AI analyzing...', language) : t('AI анализировать', 'AI Analyze', language)}
                  </button>

                  {error && <div className="text-[10px] text-amber-400 bg-amber-400/10 px-3 py-2 rounded-lg">{error}</div>}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
