import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { LearningLevel, SupportedLanguage } from '../types/learning';
import {
  Sparkles,
  Languages,
  BookOpen,
  User,
  Check,
  RotateCcw,
  X,
  GraduationCap,
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const {
    profile,
    updateProfile,
    activeLanguage,
    setActiveLanguage,
    activeLevel,
    setActiveLevel,
    loadDemoStudentProfile,
    resetAllProgress,
  } = useLearning();

  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [tempLang, setTempLang] = useState<SupportedLanguage>(activeLanguage);
  const [tempLevel, setTempLevel] = useState<LearningLevel>(activeLevel);
  const [tempSubject, setTempSubject] = useState(profile.primarySubject);

  if (!isOpen) return null;

  const avatars = ['👩‍🎓', '👨‍🎓', '👩‍💻', '👨‍💻', '🚀', '🧠', '📘', '✨'];

  const subjects = [
    'Computer Science & Programming',
    'Mathematics & Statistics',
    'English Language & Writing',
    'General STEM Foundations',
  ];

  const handleSave = () => {
    updateProfile({
      name: name.trim() || 'Learner',
      avatar,
      preferredLanguage: tempLang,
      level: tempLevel,
      primarySubject: tempSubject,
    });
    setActiveLanguage(tempLang);
    setActiveLevel(tempLevel);
    onClose();
  };

  const handleApplyDemo = () => {
    loadDemoStudentProfile();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Personalize Your Learning Bridge</h3>
            <p className="text-xs text-slate-500">
              No account or personal data required. Preferences stored on this browser only.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Avatar & Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Learner Name & Avatar
            </label>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5 overflow-x-auto py-1">
                {avatars.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAvatar(a)}
                    className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center border transition-all cursor-pointer ${
                      avatar === a
                        ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500/20 scale-105'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or nickname"
              className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-indigo-600" />
              <span>Preferred Explanation Language</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTempLang('English')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  tempLang === 'English'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">English</span>
                  {tempLang === 'English' && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Simple, structured explanations</p>
              </button>

              <button
                type="button"
                onClick={() => setTempLang('Tamil')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  tempLang === 'Tamil'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">தமிழ் (Tamil)</span>
                  {tempLang === 'Tamil' && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">எளிமையான தமிழ் விளக்கங்கள்</p>
              </button>
            </div>
          </div>

          {/* Learning Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Current Learning Pace & Depth
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Beginner', 'Intermediate', 'Advanced'] as LearningLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setTempLevel(lvl)}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition-all cursor-pointer ${
                    tempLevel === lvl
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {tempLevel === 'Beginner' && 'Focuses on intuitive everyday metaphors and zero jargon.'}
              {tempLevel === 'Intermediate' && 'Balances core concepts, mechanisms, and practical exercises.'}
              {tempLevel === 'Advanced' && 'Deep architectural precision, edge cases, and optimization.'}
            </p>
          </div>

          {/* Primary Subject */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Primary Subject of Interest
            </label>
            <select
              value={tempSubject}
              onChange={(e) => setTempSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
            >
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Demo profile banner */}
        <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-xs text-slate-600">Want realistic sample data for review?</span>
          </div>
          <button
            type="button"
            onClick={handleApplyDemo}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer underline"
          >
            Load Demo Profile
          </button>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to clear your local progress?')) {
                resetAllProgress();
                onClose();
              }
            }}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Skip
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
