const QuestionView = ({ index, data, userAnswer, setUserAnswer, showExplanation }) => {
  return (
    <div className="border p-4 rounded mb-6 shadow">
      <div dangerouslySetInnerHTML={{ __html: data.questionText }} />
      <div className="mt-4 space-y-2">
        {data.answerChoiceList.map((choice, i) => (
          <label key={i} className="flex items-center space-x-2">
            <input
              type="radio"
              name={`question-${index}`}
              value={i}
              checked={userAnswer === i}
              onChange={() => setUserAnswer(i)}
              className="accent-blue-500"
            />
            <span className={showExplanation && data.correctAnswer === i ? "font-bold text-green-600" : ""}>
              {choice}
            </span>
          </label>
        ))}
      </div>

      {showExplanation && (
        <div className="mt-6 border-t pt-4 grid grid-cols-2 gap-4">
          <div></div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: data.explanationText }} />
            <div className="mt-4">
              <h4 className="font-semibold">Reference:</h4>
              {data.questionMappingReferencesList.map((ref, i) => (
                <a
                  key={i}
                  href={ref.referenceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {ref.referenceLink}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionView;
