import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UnwrappedStats } from '../../types';
import { generateAISummary } from '../../utils/aiSummery';

interface AISummaryProps {
  stats: UnwrappedStats | null;
}

export function AISummary({ stats }: AISummaryProps) {
  const [summary, setSummary] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (stats) {
      setLoading(true);
      generateAISummary(stats).then((summary) => {
        if (isMounted) {
          setSummary(summary);
          setLoading(false);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [stats]);

  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-md p-6 filter backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-6 w-6 text-red-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
      </div>
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-red-600 mt-2" />
            <p className="text-gray-700 leading-relaxed">
              <span className="bg-gray-200 rounded-lg px-2 py-1">Loading...</span>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-red-600 mt-2" />
            <p className="text-gray-700 leading-relaxed">
              <span className="bg-gray-200 rounded-lg px-2 py-1">Loading...</span>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-red-600 mt-2" />
            <p className="text-gray-700 leading-relaxed">
              <span className="bg-gray-200 rounded-lg px-2 py-1">Loading...</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {summary.map((insight, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-600 mt-2" />
              <p className="text-gray-700 leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}