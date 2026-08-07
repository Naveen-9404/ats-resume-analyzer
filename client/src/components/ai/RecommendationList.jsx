import SuggestionCard from "./SuggestionCard";
const RecommendationList = ({ suggestions }) => <div className="grid gap-4">{suggestions.map((suggestion, index) => <SuggestionCard key={`${suggestion}-${index}`} suggestion={suggestion} />)}</div>;
export default RecommendationList;
