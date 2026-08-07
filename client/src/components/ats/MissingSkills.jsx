import SkillChip from "./SkillChip";
import SkillsCard from "./SkillsCard";
const MissingSkills = ({ skills = [] }) => <SkillsCard title="Missing Skills" titleClass="text-red-500">{skills.map((skill) => <SkillChip key={skill} skill={skill} variant="missing" />)}</SkillsCard>;
export default MissingSkills;
