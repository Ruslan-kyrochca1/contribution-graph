const URL = 'https://dpg.gg/test/calendar.json'

export default async function request(){
    try {
        const response = await fetch(URL)
        const clientData = await response.json()
        let data = clientData
        return data
    } catch (error) {
        return console.log("Error: ", error)
    }
}
