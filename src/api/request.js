

export default async function request(URL){
    try {
        const response = await fetch(URL)
        const clientData = await response.json()
        let data = clientData
        return data
    } catch (error) {
        return console.log("Error: ", error)
    }
}
