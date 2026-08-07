import SkillChip from "./SkillChip";
import SkillsCard from "./SkillsCard";
const MatchedSkills = ({ skills = [] }) => <SkillsCard title="Matched Skills" titleClass="text-green-600">{skills.map((skill) => <SkillChip key={skill} skill={skill} />)}</SkillsCard>;
export default MatchedSkills;
