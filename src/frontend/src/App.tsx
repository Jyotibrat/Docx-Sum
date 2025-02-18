import React, { useState } from 'react';
import { Upload, FileText, Send, Loader2, AlertCircle } from 'lucide-react';

interface Summary {
  key_points: string[];
  text: string; // Final paragraph summary
  explanation: string;
  keywords: string[];
  document_type: string;
}

interface Answer {
  question: string;
  answer: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploadLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload document. Please ensure the backend server is running.');
      }

      const data = await response.json();
      setSummary(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to connect to the backend server. Please ensure it is running on port 5000.');
      setFile(null);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, text: summary?.text }), // Pass the document text along with the question
      });

      if (!response.ok) {
        throw new Error('Failed to get answer. Please try again.');
      }

      const data = await response.json();
      setAnswers([...answers, { question, answer: data.answer }]);
      setQuestion('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to connect to the backend server. Please ensure it is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Document Summarizer
          </h1>
          <p className="text-gray-600 text-lg">Upload your document and get instant summaries and answers</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-red-800 font-medium mb-1">Error</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 border border-purple-100">
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-6 py-8 bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-500 rounded-xl border-2 border-dashed border-purple-200 cursor-pointer hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100 transition-all duration-300">
              <Upload className="w-12 h-12 mb-3 text-indigo-500" />
              <span className="text-lg font-medium text-indigo-600 mb-1">
                {file ? file.name : 'Upload your document'}
              </span>
              <span className="text-sm text-gray-500">
                PDF, DOC, DOCX, or TXT files
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>
          </div>
        </div>

        {/* Loading State */}
        {uploadLoading && (
          <div className="flex justify-center items-center py-6">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <span className="ml-3 text-lg text-indigo-600 font-medium">Processing document...</span>
          </div>
        )}

        {/* Summary Section */}
        {summary && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 border border-purple-100">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Document Summary</h2>

                {/* Document Type */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800">Document Type</h3>
                  <p className="text-gray-700">{summary.document_type}</p>
                </div>

                {/* Keywords */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {summary.keywords.map((keyword, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Points */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800">Key Points</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {summary.key_points.map((point, index) => (
                      <li key={index} className="mb-2">{point}</li>
                    ))}
                  </ul>
                </div>

                {/* Final Paragraph Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800">Summary</h3>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{summary.text}</p>
                </div>

                {/* Explanation */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Explanation</h3>
                  <p className="text-gray-700">{summary.explanation}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Q&A Section */}
        {summary && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ask Questions</h2>

            <form onSubmit={handleQuestionSubmit} className="mb-8">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question about the document..."
                  className="flex-1 px-5 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg shadow-indigo-200 transition-all duration-300"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  Ask
                </button>
              </div>
            </form>

            {/* Answers List */}
            <div className="space-y-6">
              {answers.map((qa, index) => (
                <div key={index} className="border-b border-purple-100 pb-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-purple-100 p-2 rounded-lg mt-1">
                      <span className="font-semibold text-purple-600">Q</span>
                    </div>
                    <p className="font-medium text-gray-900 flex-1">{qa.question}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg mt-1">
                      <span className="font-semibold text-indigo-600">A</span>
                    </div>
                    <p className="text-gray-700 flex-1 leading-relaxed">{qa.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;