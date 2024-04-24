

async function isPublicHoliday(date: string ): Promise<Boolean>{
    const year = new Date(date).getFullYear();
    const url = `https://date.nager.at/Api/v2/PublicHoliday/${year}/SE`;
    
    try{
        const response = await fetch(url);
        if (!response.ok){
            throw new Error("Failed to fetch public holidays");
        }
        const holidays = await response.json();
        return holidays.some((holidays: {date:string }) => holidays.date == date)
    } catch (error){
        console.error("Error checking public holidays")
        return false 
    }

}