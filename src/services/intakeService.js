import api from "./api";

const addIntake = async (amount)=>{
    const response = await api.post("/intake",{
        amount,
    })

    return response.data
}

const getTodayIntake = async ()=>{
    const response = await api.get("/intake/today")

    return response.data
}

const getHistory = async ()=>{
    const response = await api.get("/intake/history")

    return response.data
}

const deleteIntake = async (id)=>{
    const response = await api.delete(`/intake/${id}`)

    return response.data
}

const intakeService={
    addIntake,getTodayIntake,getHistory,deleteIntake

}

export default intakeService