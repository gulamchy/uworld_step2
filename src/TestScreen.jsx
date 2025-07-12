import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import QuestionView from './components/QuestionView';

const fileModules = import.meta.glob('./data/*.json', { eager: true });

export default function TestScreen() {
  const { fileKey } = useParams();
  const [answers, setAnswers] = useState([]);

  const filePath = decodeURIComponent(fileKey);
  const data = fileModules[filePath];

  const sequence = data?.[0];

  if (!sequence) return <div className="p-4 text-red-600">Test file not found.</div>;

  const allAnswered = answers.every((a) => a !== null);

  useMemo(() => {
    if (sequence) {
      setAnswers(Array(sequence.questionList.length).fill(null));
    }
  }, [sequence]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">{sequence.sequenceId}</h1>
        </header>
        {sequence.questionList.map((q, index) => (
          <QuestionView
            key={index}
            index={index}
            data={q}
            userAnswer={answers[index]}
            setUserAnswer={(ans) => {
              const newAnswers = [...answers];
              newAnswers[index] = ans;
              setAnswers(newAnswers);
            }}
            showExplanation={allAnswered}
          />
        ))}
      </div>
    </div>
  );
}
