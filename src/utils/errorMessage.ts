export function errorMessage(error: any) {
    let message = []
    const responce = error.response.data
    for (const key in responce) {
        if (Array.isArray(responce[key])) {
            responce[key].forEach(value => {
                message.push(value)
            })
        } else {
            message.push(responce[key])
        }
    }
    return message
}