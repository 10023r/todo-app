
class MyDateParser {
    static getTodayDateTime() {
        let todayDate = new Date().toLocaleDateString()
        return new Date(todayDate).getTime()
    }

    static getCurrentWeekRange() {
        let today = new Date()
        let leftDays = 7 - today.getDay()
        let endOfTheWeek = new Date()
        endOfTheWeek.setDate(today.getDate() + leftDays)
        return {
            from: today,
            to: endOfTheWeek
        }
    }
}