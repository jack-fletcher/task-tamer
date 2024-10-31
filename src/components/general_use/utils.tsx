export function GetLevelFromExperience(experience:number)
{
    let level = experience / GetMaxExperiencePerLevel();
    const experience_remaining = experience % GetMaxExperiencePerLevel();
    level = Math.floor(level)+1;
    return([level, experience_remaining]);
}

export function GetMaxExperiencePerLevel()
{
    return(200);
}