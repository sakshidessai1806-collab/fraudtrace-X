import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Wallet, FileText, ArrowRight, X, Hash, ShieldAlert } from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { loadDemoInvestigation, showToast } = useInvestigation();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = [
    {
      category: 'Investigations',
      items: [
        {
          title: 'CASE-2026-1042',
          subtitle: 'Investment Fraud • 0x7A91...91F2 (Ethereum)',
          tag: 'CRITICAL 92',
          action: () => {
            loadDemoInvestigation();
            navigate('/investigation');
            setIsOpen(false);
          }
        },
        {
          title: 'CASE-2026-1039',
          subtitle: 'Task Scam • TQ8d...4KpL7 (TRON)',
          tag: 'HIGH 87',
          action: () => {
            navigate('/investigation');
            setIsOpen(false);
            showToast('Loaded Case CASE-2026-1039 record.');
          }
        }
      ]
    },
    {
      category: 'Wallets & Infrastructure',
      items: [
        {
          title: '0x7A91B4C82E9D31F2A8C7E9A12D5B91F2',
          subtitle: 'Primary Suspect Wallet • Rapid Forwarding Flagged',
          tag: 'Suspect',
          action: () => {
            navigate('/graph');
            setIsOpen(false);
          }
        },
        {
          title: '0x33A0F8114C9291bBcA1992019488aF8120',
          subtitle: 'Consolidation Wallet • 3-Hop Convergent Node',
          tag: 'Consolidator',
          action: () => {
            navigate('/graph');
            setIsOpen(false);
          }
        },
        {
          title: 'VASP-X Hot Wallet Cluster (VX-104)',
          subtitle: 'Attributed CEX Terminal Off-Ramp Infrastructure',
          tag: 'VASP Exit',
          action: () => {
            navigate('/vasp');
            setIsOpen(false);
          }
        }
      ]
    },
    {
      category: 'Evidence Items',
      items: [
        {
          title: 'EV-1042-003',
          subtitle: 'Rapid Forwarding Execution Evidence Record (134s delay)',
          tag: 'Verified',
          action: () => {
            navigate('/evidence');
            setIsOpen(false);
          }
        }
      ]
    }
  ];

  const filteredResults = query.trim() === ''
    ? searchResults
    : searchResults.map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.tag.toLowerCase().includes(query.toLowerCase())
        )
      })).filter(section => section.items.length > 0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (filteredResults.length > 0 && filteredResults[0].items.length > 0) {
        filteredResults[0].items[0].action();
      } else {
        navigate('/investigation');
        setIsOpen(false);
      }
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search wallet, tx hash, case ID (e.g. 0x7A91, CASE-2026-1042)..."
          className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 p-0.5 text-slate-400 hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#090e1c] border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl">
          <div className="p-2 border-b border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between items-center bg-slate-950/40">
            <span>INTELLIGENCE SEARCH INDEX</span>
            <span>ESC to dismiss</span>
          </div>
          <div className="max-h-80 overflow-y-auto p-1.5 space-y-2">
            {filteredResults.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No indexed artifacts found matching &quot;{query}&quot;
              </div>
            ) : (
              filteredResults.map((section, idx) => (
                <div key={idx}>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-cyan-400/80 px-2 py-1">
                    {section.category}
                  </div>
                  <div className="space-y-0.5">
                    {section.items.map((item, itemIdx) => (
                      <button
                        key={itemIdx}
                        onClick={item.action}
                        className="w-full text-left p-2 rounded-lg hover:bg-slate-800/60 transition-colors flex items-center justify-between group"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-semibold text-slate-200 truncate group-hover:text-cyan-300 font-mono">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {item.subtitle}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {item.tag}
                          </span>
                          <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
